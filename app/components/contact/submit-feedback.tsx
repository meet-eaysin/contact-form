import {
  Banner,
  BlockStack,
  Button,
  Card,
  Layout,
  Page,
} from "@shopify/polaris";

export const SubmitFeedback = ({ message }: { message: string }) => {
  return (
    <Page title="Thank You!">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack>
              <div style={{ marginBottom: ".5rem" }}>
                <Banner title="Form submitted successfully!" tone="success">
                  <p>{message}</p>
                </Banner>
              </div>
              <Button
                onClick={() => (window.location.href = "/contact")}
                variant="primary"
              >
                Submit Another Form
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
