import {
  EFormStep,
  type TCompanyInfo,
  type TCompleteFormData,
  type TContactDetails,
  type TPersonalInfo,
  type TPreferences,
  type TProjectDetails,
  type ValidationErrors
} from "../types";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[1-9][\d\s\-\(\)\.]{8,19}$/;
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;
const ZIP_REGEX = /^[A-Za-z0-9\s\-]{3,10}$/;

export function validatePersonalInfo(data: Partial<TPersonalInfo>): Record<keyof TPersonalInfo, string> | null {
  const errors: Partial<Record<keyof TPersonalInfo, string>> = {};

  if (!data.firstName?.trim()) {
    errors.firstName = "First name is required";
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  } else if (data.firstName.trim().length > 50) {
    errors.firstName = "First name must be less than 50 characters";
  } else if (!NAME_REGEX.test(data.firstName.trim())) {
    errors.firstName = "First name can only contain letters, spaces, hyphens, and apostrophes";
  }

  if (!data.lastName?.trim()) {
    errors.lastName = "Last name is required";
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  } else if (data.lastName.trim().length > 50) {
    errors.lastName = "Last name must be less than 50 characters";
  } else if (!NAME_REGEX.test(data.lastName.trim())) {
    errors.lastName = "Last name can only contain letters, spaces, hyphens, and apostrophes";
  }

  if (data.middleName && data.middleName.trim()) {
    if (data.middleName.trim().length > 50) {
      errors.middleName = "Middle name must be less than 50 characters";
    } else if (!NAME_REGEX.test(data.middleName.trim())) {
      errors.middleName = "Middle name can only contain letters, spaces, hyphens, and apostrophes";
    }
  }

  if (data.dateOfBirth) {
    const birthDate = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (isNaN(birthDate.getTime())) {
      errors.dateOfBirth = "Please enter a valid date";
    } else if (age < 13) {
      errors.dateOfBirth = "You must be at least 13 years old";
    } else if (age > 120) {
      errors.dateOfBirth = "Please enter a valid date of birth";
    }
  }

  if (data.title && data.title.trim().length > 20) errors.title = "Title must be less than 20 characters";

  return Object.keys(errors).length > 0 ? errors as Record<keyof TPersonalInfo, string> : null;
}

export function validateContactDetails(data: Partial<TContactDetails>): any {
  const errors: any = {};

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  } else if (data.email.trim().length > 100) {
    errors.email = "Email must be less than 100 characters";
  }

  if (!data.confirmEmail?.trim()) {
    errors.confirmEmail = "Please confirm your email";
  } else if (data.email !== data.confirmEmail) {
    errors.confirmEmail = "Emails don't match";
  }

  if (!data.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number";
  }

  if (data.alternatePhone && data.alternatePhone.trim()) {
    if (!PHONE_REGEX.test(data.alternatePhone.trim())) {
      errors.alternatePhone = "Please enter a valid alternate phone number";
    }
  }

  if (!data.preferredContactMethod) {
    errors.preferredContactMethod = "Please select a preferred contact method";
  }

  if (!data.timeZone?.trim()) {
    errors.timeZone = "Please select a time zone";
  }

  if (!data.bestTimeToContact || data.bestTimeToContact.length === 0) {
    errors.bestTimeToContact = "Please select at least one preferred time";
  }

  const addressErrors: Record<string, string> = {};

  if (!data.address?.street?.trim()) {
    addressErrors.street = "Street address is required";
  } else if (data.address.street.trim().length < 5) {
    addressErrors.street = "Street address must be at least 5 characters";
  }

  if (!data.address?.city?.trim()) {
    addressErrors.city = "City is required";
  } else if (data.address.city.trim().length < 2) {
    addressErrors.city = "City must be at least 2 characters";
  }

  if (!data.address?.state?.trim()) {
    addressErrors.state = "State/Province is required";
  }

  if (!data.address?.zipCode?.trim()) {
    addressErrors.zipCode = "ZIP/Postal code is required";
  } else if (!ZIP_REGEX.test(data.address.zipCode.trim())) {
    addressErrors.zipCode = "Please enter a valid ZIP/Postal code";
  }

  if (!data.address?.country?.trim()) {
    addressErrors.country = "Country is required";
  }

  if (Object.keys(addressErrors).length > 0) {
    errors.address = addressErrors;
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateCompanyInfo(data: Partial<TCompanyInfo>): Record<keyof TCompanyInfo, string> | null {
  const errors: Partial<Record<keyof TCompanyInfo, string>> = {};

  if (data.companyName && data.companyName.trim()) {
    if (data.companyName.trim().length < 2) {
      errors.companyName = "Company name must be at least 2 characters";
    } else if (data.companyName.trim().length > 100) {
      errors.companyName = "Company name must be less than 100 characters";
    }
  }

  if (data.jobTitle && data.jobTitle.trim().length > 100) errors.jobTitle = "Job title must be less than 100 characters";
  if (data.department && data.department.trim().length > 50) errors.department = "Department must be less than 50 characters";

  if (data.website && data.website.trim()) {
    if (!URL_REGEX.test(data.website.trim())) errors.website = "Please enter a valid website URL";
  }

  if (data.linkedinProfile && data.linkedinProfile.trim()) {
    if (!URL_REGEX.test(data.linkedinProfile.trim())) {
      errors.linkedinProfile = "Please enter a valid LinkedIn URL";
    } else if (!data.linkedinProfile.includes('linkedin.com')) {
      errors.linkedinProfile = "Please enter a valid LinkedIn URL";
    }
  }

  return Object.keys(errors).length > 0 ? errors as Record<keyof TCompanyInfo, string> : null;
}

export function validateProjectDetails(data: Partial<TProjectDetails
>): Record<keyof TProjectDetails, string> | null {
  const errors: Partial<Record<keyof TProjectDetails, string>> = {};

  if (!data.inquiryType) errors.inquiryType = "Please select an inquiry type";

  if (!data.subject?.trim()) {
    errors.subject = "Subject is required";
  } else if (data.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters";
  } else if (data.subject.trim().length > 100) {
    errors.subject = "Subject must be less than 100 characters";
  }

  if (!data.priority) errors.priority = "Please select a priority level";
  if (!data.timeline) errors.timeline = "Please select a timeline";

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Message must be less than 2000 characters";
  }
  if (!data.projectType || data.projectType.length === 0) {
    errors.projectType = "Please select at least one project type";
  }
  if (data.technicalRequirements && data.technicalRequirements.trim().length > 1000) {
    errors.technicalRequirements = "Technical requirements must be less than 1000 characters";
  }
  if (data.currentSolution && data.currentSolution.trim().length > 500) {
    errors.currentSolution = "Current solution description must be less than 500 characters";
  }
  if (data.expectedOutcome && data.expectedOutcome.trim().length > 500) {
    errors.expectedOutcome = "Expected outcome must be less than 500 characters";
  }
  if (data.successMetrics && data.successMetrics.trim().length > 500) {
    errors.successMetrics = "Success metrics must be less than 500 characters";
  }

  return Object.keys(errors).length > 0 ? errors as Record<keyof TProjectDetails, string> : null;
}

export function validatePreferences(data: Partial<TPreferences
>): any {
  const errors: any = {};

  if (!data.dataProcessingConsent) errors.dataProcessingConsent = "You must consent to data processing to continue";
  if (!data.communicationFrequency) errors.communicationFrequency = "Please select a communication frequency";
  if (!data.followUpMethod) errors.followUpMethod = "Please select a follow-up method";
  if (!data.language) errors.language = "Please select a preferred language";

  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateStep(step: EFormStep, data: Partial<TCompleteFormData>): ValidationErrors | null {
  console.log("PERSONASL INFO", data.personalInfo);
  const errors: ValidationErrors = {};

  switch (step) {
    case EFormStep.PERSONAL_INFO:
      const personalErrors = validatePersonalInfo(data.personalInfo || {});
      if (personalErrors) errors.personalInfo = personalErrors;
      break;

    case EFormStep.CONTACT_DETAILS:
      const contactErrors = validateContactDetails(data.contactDetails || {});
      if (contactErrors) errors.contactDetails = contactErrors;
      break;

    case EFormStep.COMPANY_INFO:
      const companyErrors = validateCompanyInfo(data.companyInfo || {});
      if (companyErrors) errors.companyInfo = companyErrors;
      break;

    case EFormStep.PROJECT_DETAILS:
      const projectErrors = validateProjectDetails(data.projectDetails || {});
      if (projectErrors) errors.projectDetails = projectErrors;
      break;

    case EFormStep.PREFERENCES:
      const preferenceErrors = validatePreferences(data.preferences || {});
      if (preferenceErrors) errors.preferences = preferenceErrors;
      break;

    case EFormStep.REVIEW:
      const allErrors: ValidationErrors = {};

      const personalReviewErrors = validatePersonalInfo(data.personalInfo || {});
      if (personalReviewErrors) allErrors.personalInfo = personalReviewErrors;

      const contactReviewErrors = validateContactDetails(data.contactDetails || {});
      if (contactReviewErrors) allErrors.contactDetails = contactReviewErrors;

      const projectReviewErrors = validateProjectDetails(data.projectDetails || {});
      if (projectReviewErrors) allErrors.projectDetails = projectReviewErrors;

      const preferenceReviewErrors = validatePreferences(data.preferences || {});
      if (preferenceReviewErrors) allErrors.preferences = preferenceReviewErrors;

      if (Object.keys(allErrors).length > 0) {
        return allErrors;
      }
      break;
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function isStepComplete(step: EFormStep, data: Partial<TCompleteFormData>): boolean {
  return validateStep(step, data) === null;
}
