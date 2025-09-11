import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN, USAGE_PLAN } from "../shopify.server";
import {
  Page,
  Layout,
  Card,
  Button,
  Text,
  Badge,
  BlockStack,
  InlineStack,
  Banner,
  List,
  Divider
} from "@shopify/polaris";

interface AppSubscription {
  id: string;
  name: string;
  status: string;
  currentPeriodEnd?: string;
}

interface LoaderData {
  hasActivePayment: boolean;
  subscription: AppSubscription | null;
}

interface ActionData {
  status?: 'success' | 'cancelled' | 'error' | 'redirected';
  message?: string;
  error?: string;
}

const PLANS = {
  monthly: MONTHLY_PLAN,
  annual: ANNUAL_PLAN,
  usage: USAGE_PLAN,
} as const;

type PlanKey = keyof typeof PLANS;

const PLAN_DETAILS: Record<PlanKey, { title: string; price: string; period: string; features: string[]; popular: boolean }> = {
  monthly: {
    title: "Monthly Plan",
    price: "$5",
    period: "month",
    features: ["Basic features", "7-day trial", "Standard support"],
    popular: true,
  },
  annual: {
    title: "Annual Plan",
    price: "$50",
    period: "year",
    features: ["All monthly features", "Priority support", "Discounted yearly pricing"],
    popular: false,
  },
  usage: {
    title: "Usage-Based Plan",
    price: "$5 / usage",
    period: "usage",
    features: ["Pay per usage", "No recurring fees", "Flexible scaling"],
    popular: false,
  },
};

function isValidPlan(plan: string): plan is PlanKey {
  return Object.keys(PLANS).includes(plan);
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log(">>> Loader triggered");
  try {
    const { billing } = await authenticate.admin(request);
    console.log("Authenticated admin session");

    const billingCheck = await billing.check({
      plans: Object.values(PLANS),
      isTest: true,
    });

    console.log("Billing check result:", billingCheck);

    return json<LoaderData>({
      hasActivePayment: billingCheck.hasActivePayment,
      subscription: billingCheck.appSubscriptions[0] || null,
    });
  } catch (error) {
    return json<LoaderData>({
      hasActivePayment: false,
      subscription: null,
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(">>> Action triggered");
  const formData = await request.formData();
  const intent = formData.get("intent");
  const selectedPlan = formData.get("plan");

  console.log("Form data:", { intent, selectedPlan });

  try {
    const { billing, session } = await authenticate.admin(request);
    const { shop } = session
    const myShop = shop.replace('.myshopify.com', '')

    console.log("Authenticated admin for action");

    if (intent === "subscribe") {
      if (!selectedPlan || typeof selectedPlan !== "string" || !isValidPlan(selectedPlan)) {
        console.warn("Invalid plan selected");
        return json<ActionData>({ status: "error", error: "Invalid plan selected" }, { status: 400 });
      }

      console.log("Attempting subscription for plan:", selectedPlan);

      try {
        const { appSubscriptions } = await billing.require({
          plans: [PLANS[selectedPlan]],
          onFailure: async () => {
            const billingUrl = await billing.request({
              plan: PLANS[selectedPlan],
              isTest: true,
              returnUrl: `https://admin.shopify.com/store/${myShop}/apps/${process.env.SHOPIFY_APP_NAME}/app/pricing`,
            });
            console.log("Redirecting to billing confirmation:", billingUrl);
            throw redirect(billingUrl);
          },
        });

        console.log("Subscription success:", appSubscriptions[0]);

        return json<ActionData>({
          status: "success",
          message: `Subscription activated: ${appSubscriptions[0].name}`,
        });
      } catch (err) {
        if (err instanceof Response) throw err; // redirect
        console.error("Subscription error:", err);
        return json<ActionData>({ status: "error", error: "Failed to process subscription" }, { status: 500 });
      }
    }

    if (intent === "cancel") {
      console.log("Attempting to cancel subscription");

      const { hasActivePayment, appSubscriptions } = await billing.check({
        plans: Object.values(PLANS),
        isTest: true,
      });

      console.log("Billing check for cancel:", { hasActivePayment, appSubscriptions });

      if (!hasActivePayment || !appSubscriptions[0]) {
        console.warn("No active subscription to cancel");
        return json<ActionData>({ status: "error", error: "No active subscription found" }, { status: 400 });
      }

      const subscription = appSubscriptions[0];
      await billing.cancel({
        subscriptionId: subscription.id,
        isTest: true,
        prorate: true,
      });

      console.log("Subscription cancelled:", subscription.id);

      return json<ActionData>({
        status: "cancelled",
        message: "Subscription cancelled successfully",
      });
    }

    console.warn("Invalid action intent:", intent);
    return json<ActionData>({ status: "error", error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Action error:", error);
    return json<ActionData>({ status: "error", error: "Action failed" }, { status: 500 });
  }
};

export default function BillingPage() {
  const { hasActivePayment, subscription } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const formIntent = navigation.formData?.get("intent");
  const formPlan = navigation.formData?.get("plan");
  const isSubmitting = navigation.state === "submitting";

  console.log("UI render:", { hasActivePayment, subscription, actionData, isSubmitting, formIntent, formPlan });

  return (
    <Page title="Billing & Plans" subtitle="Choose your subscription plan">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {actionData?.message && (
              <Banner title={actionData.status === "cancelled" ? "Subscription Cancelled" : "Success!"} tone={actionData.status === "cancelled" ? "warning" : "success"}>
                <p>{actionData.message}</p>
              </Banner>
            )}
            {actionData?.error && (
              <Banner title="Error" tone="critical">
                <p>{actionData.error}</p>
              </Banner>
            )}

            {hasActivePayment && subscription ? (
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="200">
                      <Text variant="headingMd" as="h2">Current Subscription</Text>
                      <InlineStack gap="200" blockAlign="center">
                        <Text variant="headingLg" as="h3">{subscription.name}</Text>
                        <Badge tone="success">Active</Badge>
                      </InlineStack>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Status: {subscription.status} | Next billing: {subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}
                      </Text>
                    </BlockStack>
                    <Form method="post">
                      <input type="hidden" name="intent" value="cancel" />
                      <Button
                        variant="primary"
                        tone="critical"
                        submit
                        loading={formIntent === "cancel" && isSubmitting}
                        disabled={formIntent === "cancel" && isSubmitting}
                      >
                        {formIntent === "cancel" && isSubmitting ? "Cancelling..." : "Cancel Subscription"}
                      </Button>
                    </Form>
                  </InlineStack>
                </BlockStack>
              </Card>
            ) : (
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2" alignment="center">Choose Your Plan</Text>
                <Layout>
                  {(Object.entries(PLAN_DETAILS) as [PlanKey, typeof PLAN_DETAILS[keyof typeof PLAN_DETAILS]][]).map(([key, plan]) => (
                    <Layout.Section key={key} variant="oneThird">
                      <Card>
                        <BlockStack gap="400">
                          <BlockStack gap="200">
                            <InlineStack align="space-between" blockAlign="start">
                              <Text variant="headingMd" as="h3">{plan.title}</Text>
                              {plan.popular && <Badge tone="info">Most Popular</Badge>}
                            </InlineStack>
                            <InlineStack gap="100" blockAlign="baseline">
                              <Text variant="heading2xl" as="h4">{plan.price}</Text>
                              <Text as="span" variant="bodyMd" tone="subdued">/ {plan.period}</Text>
                            </InlineStack>
                          </BlockStack>

                          <Divider />

                          <BlockStack gap="200">
                            <Text variant="headingSm" as="h4">Features included:</Text>
                            <List type="bullet">
                              {plan.features.map((f, idx) => <List.Item key={idx}>{f}</List.Item>)}
                            </List>
                          </BlockStack>

                          <Form method="post">
                            <input type="hidden" name="intent" value="subscribe" />
                            <input type="hidden" name="plan" value={key} />
                            <Button
                              variant={plan.popular ? "primary" : "secondary"}
                              size="large"
                              fullWidth
                              submit
                              loading={formIntent === "subscribe" && formPlan === key && isSubmitting}
                              disabled={formIntent === "subscribe" && formPlan === key && isSubmitting}
                            >
                              {formIntent === "subscribe" && formPlan === key && isSubmitting ? "Processing..." : `Start ${plan.title}`}
                            </Button>
                          </Form>
                        </BlockStack>
                      </Card>
                    </Layout.Section>
                  ))}
                </Layout>
              </BlockStack>
            )}
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
