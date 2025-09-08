import { EFormStep, type StepConfig} from "../types";

export const STEP_CONFIGS: Record<EFormStep, StepConfig> = {
  [EFormStep.PERSONAL_INFO]: {
    title: "Personal Information",
    subtitle: "Let's start with some basic information about you",
    fields: ["firstName", "lastName", "middleName", "dateOfBirth", "gender", "title"],
  },
  [EFormStep.CONTACT_DETAILS]: {
    title: "Contact Details",
    subtitle: "How can we reach you?",
    fields: ["email", "phone", "address", "timeZone", "contactPreferences"],
  },
  [EFormStep.COMPANY_INFO]: {
    title: "Company Information",
    subtitle: "Tell us about your organization (optional)",
    fields: ["companyName", "jobTitle", "department", "industry", "companySize"],
    isOptional: true,
  },
  [EFormStep.PROJECT_DETAILS]: {
    title: "Project Details",
    subtitle: "What can we help you with?",
    fields: ["inquiryType", "subject", "message", "timeline", "budget"],
  },
  [EFormStep.PREFERENCES]: {
    title: "Communication Preferences",
    subtitle: "How would you like us to communicate with you?",
    fields: ["newsletter", "frequency", "language", "accessibility"],
  },
  [EFormStep.REVIEW]: {
    title: "Review & Submit",
    subtitle: "Please review your information before submitting",
    fields: [],
  },
};

// Time zones (abbreviated list for demo)
export const TIME_ZONES = [
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "Central Time (CT)", value: "America/Chicago" },
  { label: "Mountain Time (MT)", value: "America/Denver" },
  { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
  { label: "Greenwich Mean Time (GMT)", value: "Europe/London" },
  { label: "Central European Time (CET)", value: "Europe/Paris" },
  { label: "Japan Standard Time (JST)", value: "Asia/Tokyo" },
  { label: "Australian Eastern Time (AET)", value: "Australia/Sydney" },
];

export const COUNTRIES = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Australia", value: "AU" },
  { label: "Japan", value: "JP" },
  { label: "Other", value: "OTHER" },
];

export const INDUSTRIES = [
  { label: "Technology", value: "technology" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Retail", value: "retail" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Consulting", value: "consulting" },
  { label: "Non-profit", value: "non-profit" },
  { label: "Government", value: "government" },
  { label: "Other", value: "other" },
];

export const PROJECT_TYPES = [
  { label: "Web Development", value: "web-development" },
  { label: "Mobile App Development", value: "mobile-app" },
  { label: "UI/UX Design", value: "design" },
  { label: "Digital Marketing", value: "marketing" },
  { label: "Consulting Services", value: "consulting" },
  { label: "Data Analytics", value: "analytics" },
  { label: "Cloud Services", value: "cloud" },
  { label: "Other", value: "other" },
];

export const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Portuguese", value: "pt" },
  { label: "Other", value: "other" },
];

export function getStepProgress(currentStep: EFormStep): number {
  return Math.round(((currentStep + 1) / Object.keys(EFormStep).length * 2) * 100);
}

// export function getNextStep(currentStep: EFormStep): EFormStep | null {
//   const steps = Object.values(EFormStep).filter(step => typeof step === 'number') as EFormStep[];
//   const currentIndex = steps.indexOf(currentStep);
//   return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
// }

export function getNextStep(currentStep: EFormStep): EFormStep | null {
  const steps = Object.keys(STEP_CONFIGS).map(Number) as EFormStep[];
  const currentIndex = steps.indexOf(currentStep);
  return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
}

export function getPreviousStep(currentStep: EFormStep): EFormStep | null {
  const steps = Object.values(EFormStep).filter(step => typeof step === 'number') as EFormStep[];
  const currentIndex = steps.indexOf(currentStep);
  return currentIndex > 0 ? steps[currentIndex - 1] : null;
}
