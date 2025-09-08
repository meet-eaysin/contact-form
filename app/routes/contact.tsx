import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  Banner,
  ButtonGroup,
  ProgressBar,
  Text,
  Divider,
  Badge, BlockStack, InlineStack,
} from "@shopify/polaris";
import { useState } from "react";
import {type ActionData, EFormStep, type TCompleteFormData} from "../types";
import {isStepComplete, validateStep} from "../utils/validation";
import {getNextStep, getPreviousStep, getStepProgress, STEP_CONFIGS} from "../utils/step-config";
import PersonalInfo from "../components/contact/steps/personal-info";
import ContactDetails from "../components/contact/steps/contact-details";
import CompanyInfo from "../components/contact/steps/company-info";
import ProjectDetails from "../components/contact/steps/project-details-step";
import Preferences from "../components/contact/steps/preferences";
import Review from "../components/contact/steps/review";

const getInitialFormData = (): TCompleteFormData => ({
  personalInfo: {
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: undefined,
    title: "",
  },
  contactDetails: {
    email: "",
    confirmEmail: "",
    phone: "",
    alternatePhone: "",
    preferredContactMethod: "email",
    timeZone: "",
    bestTimeToContact: [],
    address: {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  },
  companyInfo: {
    companyName: "",
    jobTitle: "",
    department: "",
    industry: "",
    companySize: undefined,
    annualRevenue: undefined,
    website: "",
    linkedinProfile: "",
    businessType: undefined,
  },
  projectDetails: {
    inquiryType: "general",
    subject: "",
    priority: "medium",
    budget: undefined,
    timeline: "1-3-months",
    message: "",
    projectType: [],
    technicalRequirements: "",
    currentSolution: "",
    expectedOutcome: "",
    successMetrics: "",
  },
  preferences: {
    newsletter: false,
    communicationFrequency: "weekly",
    marketingConsent: false,
    dataProcessingConsent: false,
    followUpMethod: "email",
    interests: [],
    referralSource: undefined,
    language: "en",
    accessibility: {
      screenReader: false,
      largeFonts: false,
      highContrast: false,
      keyboardNavigation: false,
    },
  },
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const step = parseInt(url.searchParams.get("step") || "0");
  const currentStep = Math.max(0, Math.min(step, 5)) as EFormStep;

  return json({ currentStep });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  const currentStepStr = formData.get("currentStep") as string;
  const currentStep = parseInt(currentStepStr) as EFormStep;

  const completeData: TCompleteFormData = {
    personalInfo: {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      middleName: (formData.get("middleName") as string) || "",
      dateOfBirth: (formData.get("dateOfBirth") as string) || "",
      gender: (formData.get("gender") as any) || undefined,
      title: (formData.get("title") as string) || "",
    },
    contactDetails: {
      email: (formData.get("email") as string) || "",
      confirmEmail: (formData.get("confirmEmail") as string) || "",
      phone: (formData.get("phone") as string) || "",
      alternatePhone: (formData.get("alternatePhone") as string) || "",
      preferredContactMethod: (formData.get("preferredContactMethod") as any) || "email",
      timeZone: (formData.get("timeZone") as string) || "",
      bestTimeToContact: formData.getAll("bestTimeToContact") as string[],
      address: {
        street: (formData.get("street") as string) || "",
        apartment: (formData.get("apartment") as string) || "",
        city: (formData.get("city") as string) || "",
        state: (formData.get("state") as string) || "",
        zipCode: (formData.get("zipCode") as string) || "",
        country: (formData.get("country") as string) || "",
      },
    },
    companyInfo: {
      companyName: (formData.get("companyName") as string) || "",
      jobTitle: (formData.get("jobTitle") as string) || "",
      department: (formData.get("department") as string) || "",
      industry: (formData.get("industry") as string) || "",
      companySize: (formData.get("companySize") as any) || undefined,
      annualRevenue: (formData.get("annualRevenue") as any) || undefined,
      website: (formData.get("website") as string) || "",
      linkedinProfile: (formData.get("linkedinProfile") as string) || "",
      businessType: (formData.get("businessType") as any) || undefined,
    },
    projectDetails: {
      inquiryType: (formData.get("inquiryType") as any) || "general",
      subject: (formData.get("subject") as string) || "",
      priority: (formData.get("priority") as any) || "medium",
      budget: (formData.get("budget") as any) || undefined,
      timeline: (formData.get("timeline") as any) || "1-3-months",
      message: (formData.get("message") as string) || "",
      projectType: formData.getAll("projectType") as string[],
      technicalRequirements: (formData.get("technicalRequirements") as string) || "",
      currentSolution: (formData.get("currentSolution") as string) || "",
      expectedOutcome: (formData.get("expectedOutcome") as string) || "",
      successMetrics: (formData.get("successMetrics") as string) || "",
    },
    preferences: {
      newsletter: formData.get("newsletter") === "on",
      communicationFrequency: (formData.get("communicationFrequency") as any) || "weekly",
      marketingConsent: formData.get("marketingConsent") === "on",
      dataProcessingConsent: formData.get("dataProcessingConsent") === "on",
      followUpMethod: (formData.get("followUpMethod") as any) || "email",
      interests: formData.getAll("interests") as string[],
      referralSource: (formData.get("referralSource") as any) || undefined,
      language: (formData.get("language") as string) || "en",
      accessibility: {
        screenReader: formData.get("screenReader") === "on",
        largeFonts: formData.get("largeFonts") === "on",
        highContrast: formData.get("highContrast") === "on",
        keyboardNavigation: formData.get("keyboardNavigation") === "on",
      },
    },
  };

  if (action === "next" || action === "submit") {
    const errors = validateStep(currentStep, completeData);

    console.log("ERRORS:", errors);
    if (errors) {
      return json<ActionData>({
        errors,
        currentStep
      }, { status: 400 });
    }

    if (action === "submit") {
      console.log("=== MULTI-STEP CONTACT FORM SUBMISSION ===");
      console.log("Personal Information:", JSON.stringify(completeData.personalInfo, null, 2));
      console.log("Contact Details:", JSON.stringify(completeData.contactDetails, null, 2));
      console.log("Company Information:", JSON.stringify(completeData.companyInfo, null, 2));
      console.log("Project Details:", JSON.stringify(completeData.projectDetails, null, 2));
      console.log("Preferences:", JSON.stringify(completeData.preferences, null, 2));
      console.log("==========================================");

      return json<ActionData>({
        success: true,
        message: "Thank you! Your detailed inquiry has been submitted successfully. We'll review your information and get back to you soon.",
      });
    }

    const nextStep = getNextStep(currentStep);
    if (nextStep !== null) {
      return redirect(`/contact?step=${nextStep}`);
    }
  }

  if (action === "previous") {
    const previousStep = getPreviousStep(currentStep);
    if (previousStep !== null) {
      return redirect(`/contact?step=${previousStep}`);
    }
  }

  return json<ActionData>({ currentStep });
};

const ContactPage = () => {
  const { currentStep } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formData, setFormData] = useState<TCompleteFormData>(getInitialFormData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateFormData = <T extends keyof TCompleteFormData>(
    section: T,
    field: keyof TCompleteFormData[T],
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const updateNestedFormData = <T extends keyof TCompleteFormData>(
    section: T,
    parentField: keyof TCompleteFormData[T],
    childField: string,
    value: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...(prev[section][parentField] as any),
          [childField]: value,
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  // Handle array form data changes
  const updateArrayFormData = <T extends keyof TCompleteFormData>(
    section: T,
    field: keyof TCompleteFormData[T],
    value: string,
    checked: boolean
  ) => {
    setFormData(prev => {
      const currentArray = (prev[section][field] as string[]) || [];
      const newArray = checked
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value);

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray,
        },
      };
    });
    setHasUnsavedChanges(true);
  };

  const stepConfig = STEP_CONFIGS[currentStep];
  const progress = getStepProgress(currentStep);
  const isLastStep = currentStep === EFormStep?.REVIEW;
  const isFirstStep = currentStep === EFormStep?.PERSONAL_INFO;

  if (actionData?.success) {
    return (
      <Page title="Thank You!">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack>
                <Banner
                  title="Form submitted successfully!"
                  tone="success"
                >
                  <p>{actionData.message}</p>
                </Banner>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant={'primary'}
                >
                  Submit Another Form
                </Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title={stepConfig.title}
      subtitle={stepConfig.subtitle}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack>
              {/* Progress Bar */}
              <div>
                <InlineStack>
                  <Text variant="bodySm" as="p">
                    Step {currentStep + 1} of {Object.keys(EFormStep).length / 2}
                  </Text>
                  <Text variant="bodySm" as="p">
                    {progress}% Complete
                  </Text>
                </InlineStack>
                <div style={{ marginTop: '8px' }}>
                  <ProgressBar progress={progress} size="small" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(STEP_CONFIGS).map(([stepNum, config]) => {
                  const step = parseInt(stepNum) as EFormStep;
                  const isCompleted = step < currentStep || (step === currentStep && isStepComplete(step, formData));
                  const isCurrent = step === currentStep;

                  return (
                    <Badge
                      key={step}
                      tone={isCompleted ? 'success' : isCurrent ? 'attention' : undefined}
                    >
                      {config.title}
                    </Badge>
                  );
                })}
              </div>

              <Divider />

              <Form method="post" key={currentStep}>
                <input type="hidden" name="currentStep" value={currentStep} />

                {Object.entries(formData).map(([sectionKey, sectionData]) => (
                  <div key={sectionKey}>
                    {Object.entries(sectionData as any).map(([fieldKey, fieldValue]) => {
                      if (typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue)) {
                        return Object.entries(fieldValue).map(([nestedKey, nestedValue]) => (
                          <input
                            key={`${sectionKey}-${fieldKey}-${nestedKey}`}
                            type="hidden"
                            name={nestedKey}
                            value={nestedValue as string}
                          />
                        ));
                      } else if (Array.isArray(fieldValue)) {
                        return (fieldValue as string[]).map((value, index) => (
                          <input
                            key={`${sectionKey}-${fieldKey}-${index}`}
                            type="hidden"
                            name={fieldKey}
                            value={value}
                          />
                        ));
                      } else if (typeof fieldValue === 'boolean') {
                        return fieldValue ? (
                          <input
                            key={`${sectionKey}-${fieldKey}`}
                            type="hidden"
                            name={fieldKey}
                            value="on"
                          />
                        ) : null;
                      } else {
                        return (
                          <input
                            key={`${sectionKey}-${fieldKey}`}
                            type="hidden"
                            name={fieldKey}
                            value={fieldValue as string}
                          />
                        );
                      }
                    })}
                  </div>
                ))}

                {currentStep === EFormStep.PERSONAL_INFO && (
                  <PersonalInfo
                    data={formData.personalInfo}
                    errors={actionData?.errors?.personalInfo}
                    onChange={(field, value) => updateFormData('personalInfo', field, value)}
                  />
                )}

                {currentStep === EFormStep.CONTACT_DETAILS && (
                  <ContactDetails
                    data={formData.contactDetails}
                    errors={actionData?.errors?.contactDetails}
                    onChange={(field, value) => updateFormData('contactDetails', field, value)}
                    onNestedChange={(parentField, childField, value) =>
                      updateNestedFormData('contactDetails', parentField, childField, value)
                    }
                    onArrayChange={(field, value, checked) =>
                      updateArrayFormData('contactDetails', field, value, checked)
                    }
                  />
                )}

                {currentStep === EFormStep.COMPANY_INFO && (
                  <CompanyInfo
                    data={formData.companyInfo}
                    errors={actionData?.errors?.companyInfo}
                    onChange={(field, value) => updateFormData('companyInfo', field, value)}
                  />
                )}

                {currentStep === EFormStep.PROJECT_DETAILS && (
                  <ProjectDetails
                    data={formData.projectDetails}
                    errors={actionData?.errors?.projectDetails}
                    onChange={(field, value) => updateFormData('projectDetails', field, value)}
                    onArrayChange={(field, value, checked) =>
                      updateArrayFormData('projectDetails', field, value, checked)
                    }
                  />
                )}

                {currentStep === EFormStep.PREFERENCES && (
                  <Preferences
                    data={formData.preferences}
                    errors={actionData?.errors?.preferences}
                    onChange={(field, value) => updateFormData('preferences', field, value)}
                    onNestedChange={(parentField, childField, value) =>
                      updateNestedFormData('preferences', parentField, childField, value)
                    }
                    onArrayChange={(field, value, checked) =>
                      updateArrayFormData('preferences', field, value, checked)
                    }
                  />
                )}

                {currentStep === EFormStep.REVIEW && (
                  <Review data={formData} />
                )}

                <Divider />

                <ButtonGroup>
                  {!isFirstStep && (
                    <>
                      <input type="hidden" name="_action" value="previous" />
                      <Button
                        submit
                        disabled={isSubmitting}
                      >
                        Previous
                      </Button>
                    </>
                  )}

                  <div style={{ flex: 1 }} />

                  {isLastStep ? (
                    <>
                      <input type="hidden" name="_action" value="submit" />
                      <Button
                        submit
                        variant={'primary'}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Form"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <input type="hidden" name="_action" value="next" />
                      <Button
                        submit
                        variant={'primary'}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Validating..." : "Continue"}
                      </Button> </>
                  )}
                </ButtonGroup>

                {hasUnsavedChanges && (
                  <Banner tone="info">
                    <p>You have unsaved changes. Click Continue to proceed to the next step.</p>
                  </Banner>
                )}
              </Form>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ContactPage
