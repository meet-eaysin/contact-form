export enum EFormStep {
  PERSONAL_INFO = 0,
  CONTACT_DETAILS = 1,
  COMPANY_INFO = 2,
  PROJECT_DETAILS = 3,
  PREFERENCES = 4,
  REVIEW = 5,
}

export interface TPersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  title?: string;
}

export interface TContactDetails {
  email: string;
  confirmEmail: string;
  phone: string;
  alternatePhone?: string;
  preferredContactMethod: 'email' | 'phone' | 'both';
  timeZone: string;
  bestTimeToContact: string[];
  address: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface TCompanyInfo {
  companyName?: string;
  jobTitle?: string;
  department?: string;
  industry?: string;
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
  annualRevenue?: 'less-than-1m' | '1m-10m' | '10m-50m' | '50m-100m' | '100m-500m' | '500m+';
  website?: string;
  linkedinProfile?: string;
  businessType?: 'b2b' | 'b2c' | 'both' | 'non-profit' | 'government';
}

export interface TProjectDetails {
  inquiryType: 'general' | 'support' | 'sales' | 'partnership' | 'technical' | 'billing' | 'other';
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget?: 'less-than-5k' | '5k-25k' | '25k-100k' | '100k-500k' | '500k+';
  timeline: 'asap' | 'within-1-month' | '1-3-months' | '3-6-months' | '6-months+';
  message: string;
  projectType: string[];
  technicalRequirements?: string;
  currentSolution?: string;
  expectedOutcome?: string;
  successMetrics?: string;
}

export interface TPreferences {
  newsletter: boolean;
  communicationFrequency: 'immediately' | 'daily' | 'weekly' | 'monthly';
  marketingConsent: boolean;
  dataProcessingConsent: boolean;
  followUpMethod: 'email' | 'phone' | 'both' | 'none';
  interests: string[];
  referralSource?: 'search-engine' | 'social-media' | 'referral' | 'advertisement' | 'event' | 'other';
  language: string;
  accessibility: {
    screenReader: boolean;
    largeFonts: boolean;
    highContrast: boolean;
    keyboardNavigation: boolean;
  };
}

export interface TCompleteFormData {
  personalInfo: TPersonalInfo;
  contactDetails: TContactDetails;
  companyInfo: TCompanyInfo;
  projectDetails: TProjectDetails;
  preferences: TPreferences;
}

export interface ValidationErrors {
  personalInfo?: Partial<Record<keyof TPersonalInfo, string>>;
  contactDetails?: Partial<Record<keyof TContactDetails | 'address', string | Record<string, string>>>;
  companyInfo?: Partial<Record<keyof TCompanyInfo, string>>;
  projectDetails?: Partial<Record<keyof TProjectDetails, string>>;
  preferences?: Partial<Record<keyof TPreferences | 'accessibility', string | Record<string, string>>>;
}

export interface ActionData {
  errors?: ValidationErrors;
  success?: boolean;
  message?: string;
  currentStep?: EFormStep;
}

export interface StepConfig {
  title: string;
  subtitle: string;
  fields: string[];
  isOptional?: boolean;
}
