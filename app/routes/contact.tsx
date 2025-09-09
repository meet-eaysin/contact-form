import type {ActionFunctionArgs, LoaderFunctionArgs} from "@remix-run/node";
import {json, redirect} from "@remix-run/node";
import {Form, useActionData, useLoaderData, useNavigation, useSubmit} from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Banner,
  ProgressBar,
  Text,
  Divider,
  Badge,
  BlockStack,
  InlineStack
} from "@shopify/polaris";
import {useState} from "react";
import {type ActionData, EFormStep, type TCompleteFormData} from "../types";
import {validateStep} from "../utils/validation";
import {getNextStep, getPreviousStep, getStepProgress, STEP_CONFIGS} from "../utils/step-config";
import {
  CompanyInfo,
  ContactDetails,
  PersonalInfo,
  Preferences,
  ProjectDetails,
  Review
} from "../components/contact/steps";
import {SubmitFeedback} from "../components/contact/submit-feedback";
import ActionButtons from "../components/contact/action-buttons";

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

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const step = parseInt(url.searchParams.get("step") || "0");
  const currentStep = Math.max(0, Math.min(step, 5)) as EFormStep;
  return json({currentStep});
};

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("_action") as string;
  const contactFormData = formData.get("formData");
  const currentStepStr = formData.get("currentStep") as string;
  const currentStep = parseInt(currentStepStr) as EFormStep;
  const contactFormDataObject = JSON.parse(contactFormData as string);

  if (action === "previous") {
    const previousStep = getPreviousStep(currentStep);
    if (previousStep !== null) return redirect(`/contact?step=${previousStep}`);

    return json<ActionData>({currentStep});
  }

  if (action === "next" || action === "submit") {
    const errors = validateStep(currentStep, contactFormDataObject);

    if (errors) {
      return json<ActionData>({
        errors,
        currentStep
      }, {status: 400});
    }

    if (action === "submit") {
      console.log("Data:", JSON.stringify(contactFormDataObject, null, 2));

      return json<ActionData>({
        success: true,
        message: "Thank you! Your inquiry has been submitted successfully.",
      });
    }

    const nextStep = getNextStep(currentStep);
    if (nextStep !== null) return redirect(`/contact?step=${nextStep}`);
  }

  return json<ActionData>({currentStep});
};

const ContactPage = () => {
  const {currentStep} = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const submit = useSubmit()

  const isSubmitting = navigation.state === "submitting";
  const [formData, setFormData] = useState<TCompleteFormData>(getInitialFormData);

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
  };

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
  };

  const steps = [
    {
      id: EFormStep.COMPANY_INFO,
      component: <PersonalInfo
        data={formData.personalInfo}
        errors={actionData?.errors?.personalInfo}
        onChange={(field, value) => updateFormData('personalInfo', field, value)}
      />,
    },
    {
      id: EFormStep.CONTACT_DETAILS,
      component:
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
        />,
    },
    {
      id: EFormStep.COMPANY_INFO,
      component:
        <CompanyInfo
          data={formData.companyInfo}
          errors={actionData?.errors?.companyInfo}
          onChange={(field, value) => updateFormData('companyInfo', field, value)}
        />,
    },
    {
      id: EFormStep.PROJECT_DETAILS,
      component:
        <ProjectDetails
          data={formData.projectDetails}
          errors={actionData?.errors?.projectDetails}
          onChange={(field, value) => updateFormData('projectDetails', field, value)}
          onArrayChange={(field, value, checked) =>
            updateArrayFormData('projectDetails', field, value, checked)
          }
        />,
    },
    {
      id: EFormStep.PREFERENCES,
      component:
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
        />,
    },
    {
      id: EFormStep.REVIEW,
      component: <Review data={formData}/>
    }
  ]

  const stepConfig = STEP_CONFIGS[currentStep];
  const progress = getStepProgress(currentStep);
  const isLastStep = currentStep === EFormStep.REVIEW;

  if (actionData?.success) return <SubmitFeedback message={actionData.message || ''} />;

  return (
    <Page title={stepConfig.title} subtitle={stepConfig.subtitle}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack>
              <InlineStack align="space-between">
                <Text variant="bodySm" as="p">
                  Step {currentStep + 1} of {Object.keys(EFormStep).length / 2}
                </Text>
                <Text variant="bodySm" as="p"> {progress}% Complete </Text>
              </InlineStack>

              <div style={{margin: '16px 0'}}>
                <ProgressBar progress={progress} size="small"/>
              </div>

              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0'}}>
                {Object.entries(STEP_CONFIGS).map(([stepNum, config]) => {
                  const step = parseInt(stepNum) as EFormStep;
                  const isCompleted = step < currentStep;
                  const isCurrent = step === currentStep;
                  const tone = isCompleted ? 'success' : isCurrent ? 'attention' : undefined

                  return <Badge key={step} tone={tone}>{config.title}</Badge>
                })}
              </div>

              <div style={{ marginBottom: ".8rem"}}><Divider/></div>

              {actionData?.errors && (
                <div style={{margin: '16px 0'}}>
                  <Banner title="Please fix the following errors:" tone="critical">
                    <p>Check the form fields below for validation errors.</p>
                  </Banner>
                </div>
              )}

              <Form method="post" id="main-form" key={`${currentStep}-${JSON.stringify(actionData?.errors || {})}`}>
                <input type="hidden" name="currentStep" value={currentStep}/>
                <input type="hidden" name="_action" value={isLastStep ? "submit" : "next"}/>

                <input type="hidden" name="firstName" value={formData.personalInfo.firstName}/>
                <input type="hidden" name="lastName" value={formData.personalInfo.lastName}/>
                <input type="hidden" name="middleName" value={formData.personalInfo.middleName || ""}/>
                <input type="hidden" name="dateOfBirth" value={formData.personalInfo.dateOfBirth || ""}/>
                <input type="hidden" name="gender" value={formData.personalInfo.gender || ""}/>
                <input type="hidden" name="title" value={formData.personalInfo.title || ""}/>

                <input type="hidden" name="email" value={formData.contactDetails.email}/>
                <input type="hidden" name="confirmEmail" value={formData.contactDetails.confirmEmail}/>
                <input type="hidden" name="phone" value={formData.contactDetails.phone}/>
                <input type="hidden" name="alternatePhone" value={formData.contactDetails.alternatePhone || ""}/>
                <input type="hidden" name="preferredContactMethod"
                       value={formData.contactDetails.preferredContactMethod}/>
                <input type="hidden" name="timeZone" value={formData.contactDetails.timeZone}/>
                {formData.contactDetails.bestTimeToContact.map((time, i) => (
                  <input key={i} type="hidden" name="bestTimeToContact" value={time}/>
                ))}
                <input type="hidden" name="street" value={formData.contactDetails.address.street}/>
                <input type="hidden" name="apartment" value={formData.contactDetails.address.apartment || ""}/>
                <input type="hidden" name="city" value={formData.contactDetails.address.city}/>
                <input type="hidden" name="state" value={formData.contactDetails.address.state}/>
                <input type="hidden" name="zipCode" value={formData.contactDetails.address.zipCode}/>
                <input type="hidden" name="country" value={formData.contactDetails.address.country}/>

                <input type="hidden" name="companyName" value={formData.companyInfo.companyName || ""}/>
                <input type="hidden" name="jobTitle" value={formData.companyInfo.jobTitle || ""}/>
                <input type="hidden" name="department" value={formData.companyInfo.department || ""}/>
                <input type="hidden" name="industry" value={formData.companyInfo.industry || ""}/>
                <input type="hidden" name="companySize" value={formData.companyInfo.companySize || ""}/>
                <input type="hidden" name="annualRevenue" value={formData.companyInfo.annualRevenue || ""}/>
                <input type="hidden" name="website" value={formData.companyInfo.website || ""}/>
                <input type="hidden" name="linkedinProfile" value={formData.companyInfo.linkedinProfile || ""}/>
                <input type="hidden" name="businessType" value={formData.companyInfo.businessType || ""}/>

                <input type="hidden" name="inquiryType" value={formData.projectDetails.inquiryType}/>
                <input type="hidden" name="subject" value={formData.projectDetails.subject}/>
                <input type="hidden" name="priority" value={formData.projectDetails.priority}/>
                <input type="hidden" name="budget" value={formData.projectDetails.budget || ""}/>
                <input type="hidden" name="timeline" value={formData.projectDetails.timeline}/>
                <input type="hidden" name="message" value={formData.projectDetails.message}/>
                {formData.projectDetails.projectType.map((type, i) => (
                  <input key={i} type="hidden" name="projectType" value={type}/>
                ))}
                <input type="hidden" name="technicalRequirements"
                       value={formData.projectDetails.technicalRequirements || ""}/>
                <input type="hidden" name="currentSolution" value={formData.projectDetails.currentSolution || ""}/>
                <input type="hidden" name="expectedOutcome" value={formData.projectDetails.expectedOutcome || ""}/>
                <input type="hidden" name="successMetrics" value={formData.projectDetails.successMetrics || ""}/>

                {formData.preferences.newsletter && <input type="hidden" name="newsletter" value="on"/>}
                <input type="hidden" name="communicationFrequency" value={formData.preferences.communicationFrequency}/>
                {formData.preferences.marketingConsent && <input type="hidden" name="marketingConsent" value="on"/>}
                {formData.preferences.dataProcessingConsent &&
                  <input type="hidden" name="dataProcessingConsent" value="on"/>}
                <input type="hidden" name="followUpMethod" value={formData.preferences.followUpMethod}/>
                {formData.preferences.interests.map((interest, i) => (
                  <input key={i} type="hidden" name="interests" value={interest}/>
                ))}
                <input type="hidden" name="referralSource" value={formData.preferences.referralSource || ""}/>
                <input type="hidden" name="language" value={formData.preferences.language}/>
                {formData.preferences.accessibility.screenReader &&
                  <input type="hidden" name="screenReader" value="on"/>}
                {formData.preferences.accessibility.largeFonts && <input type="hidden" name="largeFonts" value="on"/>}
                {formData.preferences.accessibility.highContrast &&
                  <input type="hidden" name="highContrast" value="on"/>}
                {formData.preferences.accessibility.keyboardNavigation &&
                  <input type="hidden" name="keyboardNavigation" value="on"/>}

                {steps[currentStep].component}

                <div style={{ margin: "1rem 0"}}> <Divider/> </div>

                <ActionButtons
                  isSubmitting={isSubmitting}
                  submit={submit}
                  isFirstStep={currentStep === 0}
                  isLastStep={currentStep === steps.length - 1}
                  currentStep={currentStep}
                  formData={formData}
                />
              </Form>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ContactPage;
