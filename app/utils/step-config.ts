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

export const COMPANY_SIZES = [
  { label: 'Select size...', value: '' },
  { label: '1-10 employees', value: '1-10' },
  { label: '11-50 employees', value: '11-50' },
  { label: '51-200 employees', value: '51-200' },
  { label: '201-500 employees', value: '201-500' },
  { label: '501-1000 employees', value: '501-1000' },
  { label: '1000+ employees', value: '1000+' },
]

export const ANNUAL_REVENUE = [
  { label: 'Select revenue...', value: '' },
  { label: 'Less than $1M', value: 'less-than-1m' },
  { label: '$1M - $10M', value: '1m-10m' },
  { label: '$10M - $50M', value: '10m-50m' },
  { label: '$50M - $100M', value: '50m-100m' },
  { label: '$100M - $500M', value: '100m-500m' },
  { label: '$500M+', value: '500m+' },
]

export const BUSINESS_TYPES = [
  { label: 'Select type...', value: '' },
  { label: 'Business to Business (B2B)', value: 'b2b' },
  { label: 'Business to Consumer (B2C)', value: 'b2c' },
  { label: 'Both B2B and B2C', value: 'both' },
  { label: 'Non-Profit', value: 'non-profit' },
  { label: 'Government', value: 'government' },
]

export const BEST_TIME_TO_CONTACT = [
  { label: 'Morning (9 AM - 12 PM)', value: 'morning' },
  { label: 'Afternoon (12 PM - 5 PM)', value: 'afternoon' },
  { label: 'Evening (5 PM - 9 PM)', value: 'evening' },
  { label: 'Weekends', value: 'weekends' },
]

export const GENDER = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
  { label: 'Prefer not to say', value: 'prefer-not-to-say' },
]

export const COMMUNICATION_FREQUENCY = [
  { label: 'Immediately', value: 'immediately' },
  { label: 'Daily digest', value: 'daily' },
  { label: 'Weekly summary', value: 'weekly' },
  { label: 'Monthly update', value: 'monthly' },
]

export const FOLLOW_UP_METHOD = [
  { label: 'Email only', value: 'email' },
  { label: 'Phone only', value: 'phone' },
  { label: 'Both email and phone', value: 'both' },
  { label: 'No follow-up needed', value: 'none' },
]

export const INTERESTS = [
  { label: 'Web Development', value: 'web-development' },
  { label: 'Mobile App Development', value: 'mobile-app' },
  { label: 'UI/UX Design', value: 'design' },
  { label: 'Digital Marketing', value: 'marketing' },
  { label: 'Consulting Services', value: 'consulting' },
  { label: 'Data Analytics', value: 'analytics' },
  { label: 'Cloud Services', value: 'cloud' },
  { label: 'Other', value: 'other' },
]

export const REFERRAL_SOURCE = [
  { label: 'Please select...', value: '' },
  { label: 'Search Engine', value: 'search-engine' },
  { label: 'Social Media', value: 'social-media' },
  { label: 'Referral from friend/colleague', value: 'referral' },
  { label: 'Online Advertisement', value: 'advertisement' },
  { label: 'Conference/Event', value: 'event' },
  { label: 'Other', value: 'other' },
]

export const INDUSTRY_TYPE = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Technical Support', value: 'support' },
  { label: 'Sales Question', value: 'sales' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Technical Discussion', value: 'technical' },
  { label: 'Billing Question', value: 'billing' },
  { label: 'Other', value: 'other' },
]

export const PRIORITY = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
]

export const BUDGET = [
  { label: 'Select budget...', value: '' },
  { label: 'Less than $5,000', value: 'less-than-5k' },
  { label: '$5,000 - $25,000', value: '5k-25k' },
  { label: '$25,000 - $100,000', value: '25k-100k' },
  { label: '$100,000 - $500,000', value: '100k-500k' },
  { label: '$500,000+', value: '500k+' },
]

export const TIMELINE = [
  { label: 'ASAP', value: 'asap' },
  { label: 'Within 1 month', value: 'within-1-month' },
  { label: '1-3 months', value: '1-3-months' },
  { label: '3-6 months', value: '3-6-months' },
  { label: '6 months+', value: '6-months+' },
]

export function getStepProgress(currentStep: EFormStep): number {
  return Math.round(((currentStep + 1) / Object.keys(EFormStep).length * 2) * 100);
}

export function getNextStep(currentStep: EFormStep): EFormStep | null {
  const steps = Object.keys(STEP_CONFIGS).map(Number) as EFormStep[];
  const currentIndex = steps.indexOf(currentStep);
  return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
}

export function getPreviousStep(currentStep: EFormStep): EFormStep | null {
  const steps = Object.values(EFormStep).filter(step => typeof step === "number")
  const currentIndex = steps.indexOf(currentStep);

  if (currentIndex === 0) return steps[0];

  return steps[currentIndex - 1];
}
