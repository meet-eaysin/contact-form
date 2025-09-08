import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { login } from "../../shopify.server";
import {BlockStack, Button, Card, List, Page, Text} from "@shopify/polaris";
import {Link} from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  return (
    <Page title="Advanced Contact Form">
      <Card>
        <BlockStack>
          <Text variant="headingLg" as="h2">
            Multi-Step Contact Form
          </Text>
          <Text variant="bodyMd" as="p">
            Experience our comprehensive contact form with the following features:
          </Text>
          <List type="bullet">
            <List.Item>6-step progressive form with validation</List.Item>
            <List.Item>Personal information collection</List.Item>
            <List.Item>Detailed contact and address information</List.Item>
            <List.Item>Optional company information</List.Item>
            <List.Item>Comprehensive project details</List.Item>
            <List.Item>Communication preferences and accessibility options</List.Item>
            <List.Item>Review and confirmation step</List.Item>
          </List>
          <div>
            <Link to="/contact">
              <Button variant={'primary'} size="large">
                Start Contact Form
              </Button>
            </Link>
          </div>
        </BlockStack>
      </Card>
    </Page>
  );
}
