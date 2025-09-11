import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { login } from "../../shopify.server";
import { BlockStack, Button, Card, List, Page, Text, InlineStack } from "@shopify/polaris";
import { Link } from "@remix-run/react";

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

            <InlineStack gap="400">
              <Link to="/contact">
                <Button variant="primary" size="large">
                  Start Contact Form
                </Button>
              </Link>
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
