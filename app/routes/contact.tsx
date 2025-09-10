import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Banner,
  Text,
  TextField,
  Select,
  Checkbox,
  Button,
  BlockStack,
  InlineStack,
  Divider
} from "@shopify/polaris";
import { useState } from "react";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  newsletter: boolean;
};

type FieldErrors = {
  [K in keyof ContactFormData]?: string;
};

type ActionData = {
  success?: boolean;
  message?: string;
  errors?: FieldErrors;
  submittedData?: ContactFormData;
};

// Move inquiry options outside component for access in success section
const inquiryOptions = [
  { label: "General Inquiry", value: "general" },
  { label: "Product Support", value: "support" },
  { label: "Sales Question", value: "sales" },
  { label: "Partnership", value: "partnership" },
  { label: "Technical Issue", value: "technical" },
  { label: "Billing", value: "billing" },
];

const validateForm = (data: ContactFormData): FieldErrors | null => {
  const errors: FieldErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(data.phone)) errors.phone = "Please enter a valid phone number";
  if (!data.subject.trim()) errors.subject = "Subject is required";

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.length < 10) {
    errors.message = "Message must be at least 10 characters long";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const contactData: ContactFormData = {
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
    inquiryType: String(formData.get("inquiryType") || "general"),
    newsletter: formData.get("newsletter") === "on",
  };

  const errors = validateForm(contactData);
  if (errors) return json<ActionData>({ errors }, { status: 400 });

  console.log("Contact form submission:", contactData);

  await new Promise(resolve => setTimeout(resolve, 1000));

  return json<ActionData>({
    success: true,
    message: "Thank you for contacting us! We'll get back to you within 24 hours.",
    submittedData: contactData,
  });
};

const ContactPage = () => {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
    newsletter: false,
  });

  const updateField = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (actionData?.success) {
    return (
      <Page title="Contact Us">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Banner title="Message Sent!" tone="success">
                  <p>{actionData.message}</p>
                </Banner>

                <Text variant="headingMd" as="h2">
                  Submitted Information
                </Text>

                <Card >
                  <BlockStack gap="300">
                    <InlineStack gap="400">
                      <div style={{ flex: 1 }}>
                        <Text variant="bodyMd" as="p">
                          <strong>First Name:</strong> {actionData.submittedData?.firstName || 'N/A'}
                        </Text>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text variant="bodyMd" as="p">
                          <strong>Last Name:</strong> {actionData.submittedData?.lastName || 'N/A'}
                        </Text>
                      </div>
                    </InlineStack>

                    <InlineStack gap="400">
                      <div style={{ flex: 1 }}>
                        <Text variant="bodyMd" as="p">
                          <strong>Email:</strong> {actionData.submittedData?.email || 'N/A'}
                        </Text>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text variant="bodyMd" as="p">
                          <strong>Phone:</strong> {actionData.submittedData?.phone || 'Not provided'}
                        </Text>
                      </div>
                    </InlineStack>

                    <Text variant="bodyMd" as="p">
                      <strong>Inquiry Type:</strong> {
                      inquiryOptions.find(option => option.value === actionData.submittedData?.inquiryType)?.label || 'General Inquiry'
                    }
                    </Text>

                    <Text variant="bodyMd" as="p">
                      <strong>Subject:</strong> {actionData.submittedData?.subject || 'N/A'}
                    </Text>

                    <Text variant="bodyMd" as="p">
                      <strong>Message:</strong>
                    </Text>
                    <Text variant="bodyMd" as="p" tone="subdued">
                      {actionData.submittedData?.message || 'N/A'}
                    </Text>

                    <Text variant="bodyMd" as="p">
                      <strong>Newsletter Subscription:</strong> {actionData.submittedData?.newsletter ? 'Yes' : 'No'}
                    </Text>
                  </BlockStack>
                </Card>

                <InlineStack gap="300">
                  <Button
                    url="/contact"
                    variant="primary"
                  >
                    Send Another Message
                  </Button>
                  <Button
                    url="/"
                    variant="secondary"
                  >
                    Back to Home
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="Contact Us"
      subtitle="Have a question or need help? We'd love to hear from you."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Form method="post">
              <BlockStack gap="400">
                {actionData?.errors && (
                  <Banner title="Please fix the following errors:" tone="critical">
                    <p>Check the form fields below for validation errors.</p>
                  </Banner>
                )}

                <Text variant="headingMd" as="h2">
                  Personal Information
                </Text>

                <InlineStack gap="400">
                  <div style={{ flex: 1 }}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(value) => updateField("firstName", value)}
                      error={actionData?.errors?.firstName}
                      autoComplete="given-name"
                      requiredIndicator
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(value) => updateField("lastName", value)}
                      error={actionData?.errors?.lastName}
                      autoComplete="family-name"
                      requiredIndicator
                    />
                  </div>
                </InlineStack>

                <InlineStack gap="400">
                  <div style={{ flex: 1 }}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(value) => updateField("email", value)}
                      error={actionData?.errors?.email}
                      autoComplete="email"
                      requiredIndicator
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <TextField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(value) => updateField("phone", value)}
                      error={actionData?.errors?.phone}
                      autoComplete="tel"
                    />
                  </div>
                </InlineStack>

                <Divider />

                <Text variant="headingMd" as="h2">
                  Your Message
                </Text>

                <Select
                  label="Inquiry Type"
                  name="inquiryType"
                  options={inquiryOptions}
                  value={formData.inquiryType}
                  onChange={(value) => updateField("inquiryType", value)}
                />

                <TextField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(value) => updateField("subject", value)}
                  error={actionData?.errors?.subject}
                  placeholder="Brief description of your inquiry"
                  requiredIndicator
                  autoComplete={'off'}
                />

                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={(value) => updateField("message", value)}
                  error={actionData?.errors?.message}
                  multiline={4}
                  placeholder="Please provide details about your inquiry..."
                  helpText={`${formData.message.length} characters (minimum 10 required)`}
                  requiredIndicator
                  autoComplete={'off'}
                />

                <Divider />

                <Checkbox
                  label="Subscribe to our newsletter for updates and special offers"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={(checked) => updateField("newsletter", checked)}
                />

                <InlineStack align="end">
                  <Button
                    variant="primary"
                    submit
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </InlineStack>
              </BlockStack>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ContactPage;
