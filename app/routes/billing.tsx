import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {authenticate, PLANS} from "../shopify.server";
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

// Types
interface PlanDetails {
  title: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

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

type PlanKey = 'basic' | 'pro' | 'enterprise';

const PLAN_DETAILS: Record<PlanKey, PlanDetails> = {
  basic: {
    title: "Basic Plan",
    price: "$5",
    period: "month",
    features: [
      "7-day free trial",
      "Basic contact form features",
      "Email notifications",
      "Basic analytics",
      "Standard support"
    ],
    popular: false,
  },
  pro: {
    title: "Pro Plan",
    price: "$15",
    period: "month",
    features: [
      "7-day free trial",
      "Advanced form builder",
      "Custom email templates",
      "Advanced analytics & reporting",
      "Priority support",
      "Custom integrations"
    ],
    popular: true,
  },
  enterprise: {
    title: "Enterprise Plan",
    price: "$50",
    period: "month",
    features: [
      "14-day free trial",
      "All Pro features included",
      "White-label solution",
      "Dedicated account manager",
      "Custom development",
      "SLA guarantee"
    ],
    popular: false,
  },
};

const VALID_PLANS: PlanKey[] = ['basic', 'pro', 'enterprise'];

function isValidPlan(plan: string): plan is PlanKey {
  return VALID_PLANS.includes(plan as PlanKey);
}

/**
 * Loader → Check subscription status
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing } = await authenticate.admin(request);

  try {
    const billingCheck = await billing.check({
      plans: Object.values(PLANS), // ✅ pass plan objects
      isTest: true, // ⚠️ remove in production
    });

    return json<LoaderData>({
      hasActivePayment: billingCheck.hasActivePayment,
      subscription: billingCheck.appSubscriptions[0] || null,
    });
  } catch (error) {
    console.error("Billing check error:", error);
    return json<LoaderData>({
      hasActivePayment: false,
      subscription: null,
    });
  }
};


/**
 * Action → Subscribe / Cancel
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const { billing } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const selectedPlan = formData.get("plan");

  if (intent === "subscribe") {
    if (!selectedPlan || typeof selectedPlan !== "string" || !isValidPlan(selectedPlan)) {
      return json<ActionData>(
        { status: "error", error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    try {
      // ✅ pass plan object here
      const billingResult = await billing.require({
        plans: [PLANS[selectedPlan]],
        onFailure: async () => {
          const billingUrl = await billing.request({
            plan: PLANS[selectedPlan],
            isTest: true, // ⚠️ remove in production
            returnUrl: `${process.env.SHOPIFY_APP_URL}/billing`,
          });
          throw redirect(billingUrl);
        },
      });

      return json<ActionData>({
        status: "success",
        message: `Subscription activated: ${billingResult.appSubscription.name}`,
      });
    } catch (error) {
      if (error instanceof Response) {
        throw error; // redirect case
      }
      console.error("Subscription error:", error);
      return json<ActionData>(
        { status: "error", error: "Failed to process subscription" },
        { status: 500 }
      );
    }
  }

  if (intent === "cancel") {
    try {
      const billingCheck = await billing.check({
        plans: Object.values(PLANS),
        isTest: true,
      });

      if (!billingCheck.hasActivePayment || !billingCheck.appSubscriptions[0]) {
        return json<ActionData>(
          { status: "error", error: "No active subscription found" },
          { status: 400 }
        );
      }

      const subscription = billingCheck.appSubscriptions[0];
      await billing.cancel({
        subscriptionId: subscription.id,
        isTest: true,
        prorate: true,
      });

      return json<ActionData>({
        status: "cancelled",
        message: "Subscription cancelled successfully",
      });
    } catch (error) {
      console.error("Cancellation error:", error);
      return json<ActionData>(
        { status: "error", error: "Failed to cancel subscription" },
        { status: 500 }
      );
    }
  }

  return json<ActionData>(
    { status: "error", error: "Invalid action" },
    { status: 400 }
  );
};
/**
 * UI Component
 */
export default function BillingPage() {
  const { hasActivePayment, subscription } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Page
      title="Billing & Plans"
      subtitle="Choose the perfect plan for your contact form needs"
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {/* Action feedback */}
            {actionData?.message && (
              <Banner
                title={actionData.status === "cancelled" ? "Subscription Cancelled" : "Success!"}
                tone={actionData.status === "cancelled" ? "warning" : "success"}
              >
                <p>{actionData.message}</p>
              </Banner>
            )}

            {actionData?.error && (
              <Banner title="Error" tone="critical">
                <p>{actionData.error}</p>
              </Banner>
            )}

            {/* Active Subscription */}
            {hasActivePayment && subscription ? (
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="200">
                      <Text variant="headingMd" as="h2">
                        Current Subscription
                      </Text>
                      <InlineStack gap="200" blockAlign="center">
                        <Text variant="headingLg" as="h3">
                          {subscription.name}
                        </Text>
                        <Badge tone="success">Active</Badge>
                      </InlineStack>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Status: {subscription.status} | Next billing: {
                        subscription.currentPeriodEnd
                          ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                          : 'N/A'
                      }
                      </Text>
                    </BlockStack>
                    <Form method="post">
                      <input type="hidden" name="intent" value="cancel" />
                      <Button
                        variant="primary"
                        tone="critical"
                        submit
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Cancelling..." : "Cancel Subscription"}
                      </Button>
                    </Form>
                  </InlineStack>
                </BlockStack>
              </Card>
            ) : (
              /* Plan Selection */
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2" alignment="center">
                  Choose Your Plan
                </Text>

                <Layout>
                  {(Object.entries(PLAN_DETAILS) as [PlanKey, PlanDetails][]).map(([key, plan]) => (
                    <Layout.Section key={key} variant="oneThird">
                      <Card>
                        <BlockStack gap="400">
                          {/* Plan Header */}
                          <BlockStack gap="200">
                            <InlineStack align="space-between" blockAlign="start">
                              <Text variant="headingMd" as="h3">
                                {plan.title}
                              </Text>
                              {plan.popular && (
                                <Badge tone="info">Most Popular</Badge>
                              )}
                            </InlineStack>

                            <InlineStack gap="100" blockAlign="baseline">
                              <Text variant="heading2xl" as="h4">
                                {plan.price}
                              </Text>
                              <Text as="span" variant="bodyMd" tone="subdued">
                                / {plan.period}
                              </Text>
                            </InlineStack>
                          </BlockStack>

                          <Divider />

                          {/* Features */}
                          <BlockStack gap="200">
                            <Text variant="headingSm" as="h4">
                              Features included:
                            </Text>
                            <List type="bullet">
                              {plan.features.map((feature, index) => (
                                <List.Item key={index}>{feature}</List.Item>
                              ))}
                            </List>
                          </BlockStack>

                          {/* Subscribe Button */}
                          <Form method="post">
                            <input type="hidden" name="intent" value="subscribe" />
                            <input type="hidden" name="plan" value={key} />
                            <Button
                              variant={plan.popular ? "primary" : "secondary"}
                              size="large"
                              fullWidth
                              submit
                              loading={isSubmitting}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Processing..." : `Start ${plan.title}`}
                            </Button>
                          </Form>
                        </BlockStack>
                      </Card>
                    </Layout.Section>
                  ))}
                </Layout>
              </BlockStack>
            )}

            {/* Additional Info */}
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">
                  Billing Information
                </Text>
                <List>
                  <List.Item>Monthly recurring subscription</List.Item>
                  <List.Item>Free trial included with all plans</List.Item>
                  <List.Item>Secure payment processing through Shopify</List.Item>
                  <List.Item>Upgrade or downgrade at any time</List.Item>
                  <List.Item>24/7 customer support available</List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
