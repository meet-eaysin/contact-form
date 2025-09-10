import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { login } from "../../shopify.server";
import { BlockStack, Button, Card, List, Page, Text, InlineStack, Icon } from "@shopify/polaris";
import { Link } from "@remix-run/react";
import { EmailIcon, PhoneIcon, ChatIcon } from "@shopify/polaris-icons";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  return (
    <Page title="Contact Us">
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingLg" as="h2">
              Get in Touch
            </Text>
            <Text variant="bodyMd" as="p">
              Have a question or need help? We'd love to hear from you. Our comprehensive contact form makes it easy to reach out with any inquiry.
            </Text>

            <Text variant="headingMd" as="h3">
              What You Can Expect:
            </Text>

            <List type="bullet">
              <List.Item>Quick and easy form submission</List.Item>
              <List.Item>Personal information collection (name, email, phone)</List.Item>
              <List.Item>Multiple inquiry types (support, sales, technical, billing, partnerships)</List.Item>
              <List.Item>Detailed message with subject line</List.Item>
              <List.Item>Optional newsletter subscription</List.Item>
              <List.Item>Response within 24 hours during business days</List.Item>
            </List>

            <InlineStack gap="400">
              <Link to="/contact">
                <Button variant="primary" size="large">
                  Start Contact Form
                </Button>
              </Link>
              <Link to="/billing">
                <Button variant="secondary" size="large">
                  View Plans & Billing
                </Button>
              </Link>
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
