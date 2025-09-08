import {type TCompleteFormData} from "../../../../../remix-app/app/types";
import {
  Banner,
  BlockStack,
  Card,
  List,
  Text,
  TextContainer,
} from "@shopify/polaris";
import {
  COUNTRIES,
  INDUSTRIES,
  LANGUAGES,
  TIME_ZONES,
  PROJECT_TYPES,
} from "../../../../../remix-app/app/utils/step-config";

interface TReviewProps {
  data: TCompleteFormData;
}

function Review({data}: TReviewProps) {
  return (
    <BlockStack>
      <Banner tone="info">
        <p>
          Please review your information carefully before submitting. You can go
          back to any step to make changes.
        </p>
      </Banner>

      {/* Personal Information Review */}
      <Card>
        <BlockStack>
          <Text variant="headingMd" as="h3">
            Personal Information
          </Text>
          <List type="bullet">
            <List.Item>
              <strong>Name:</strong> {data.personalInfo.title}{" "}
              {data.personalInfo.firstName} {data.personalInfo.middleName}{" "}
              {data.personalInfo.lastName}
            </List.Item>
            {data.personalInfo.dateOfBirth && (
              <List.Item>
                <strong>Date of Birth:</strong>{" "}
                {new Date(
                  data.personalInfo.dateOfBirth
                ).toLocaleDateString()}
              </List.Item>
            )}
            {data.personalInfo.gender && (
              <List.Item>
                <strong>Gender:</strong>{" "}
                {data.personalInfo.gender.replace("-", " ")}
              </List.Item>
            )}
          </List>
        </BlockStack>
      </Card>

      {/* Contact Details Review */}
      <Card>
        <BlockStack>
          <Text variant="headingMd" as="h3">
            Contact Details
          </Text>
          <List type="bullet">
            <List.Item>
              <strong>Email:</strong> {data.contactDetails.email}
            </List.Item>
            <List.Item>
              <strong>Phone:</strong> {data.contactDetails.phone}
            </List.Item>
            {data.contactDetails.alternatePhone && (
              <List.Item>
                <strong>Alternate Phone:</strong>{" "}
                {data.contactDetails.alternatePhone}
              </List.Item>
            )}
            <List.Item>
              <strong>Preferred Contact:</strong>{" "}
              {data.contactDetails.preferredContactMethod}
            </List.Item>
            <List.Item>
              <strong>Time Zone:</strong>{" "}
              {
                TIME_ZONES.find(
                  (tz) => tz.value === data.contactDetails.timeZone
                )?.label
              }
            </List.Item>
            <List.Item>
              <strong>Best Time:</strong>{" "}
              {data.contactDetails.bestTimeToContact.join(", ")}
            </List.Item>
            <List.Item>
              <strong>Address:</strong> {data.contactDetails.address.street}
              {data.contactDetails.address.apartment &&
                `, ${data.contactDetails.address.apartment}`}
              , {data.contactDetails.address.city},{" "}
              {data.contactDetails.address.state}{" "}
              {data.contactDetails.address.zipCode},{" "}
              {
                COUNTRIES.find(
                  (c) => c.value === data.contactDetails.address.country
                )?.label
              }
            </List.Item>
          </List>
        </BlockStack>
      </Card>

      {/* Company Information Review */}
      {(data.companyInfo.companyName || data.companyInfo.jobTitle) && (
        <Card>
          <BlockStack>
            <Text variant="headingMd" as="h3">
              Company Information
            </Text>
            <List type="bullet">
              {data.companyInfo.companyName && (
                <List.Item>
                  <strong>Company:</strong> {data.companyInfo.companyName}
                </List.Item>
              )}
              {data.companyInfo.jobTitle && (
                <List.Item>
                  <strong>Job Title:</strong> {data.companyInfo.jobTitle}
                </List.Item>
              )}
              {data.companyInfo.department && (
                <List.Item>
                  <strong>Department:</strong> {data.companyInfo.department}
                </List.Item>
              )}
              {data.companyInfo.industry && (
                <List.Item>
                  <strong>Industry:</strong>{" "}
                  {
                    INDUSTRIES.find(
                      (i) => i.value === data.companyInfo.industry
                    )?.label
                  }
                </List.Item>
              )}
              {data.companyInfo.companySize && (
                <List.Item>
                  <strong>Company Size:</strong>{" "}
                  {data.companyInfo.companySize} employees
                </List.Item>
              )}
              {data.companyInfo.website && (
                <List.Item>
                  <strong>Website:</strong> {data.companyInfo.website}
                </List.Item>
              )}
            </List>
          </BlockStack>
        </Card>
      )}

      {/* Project Details Review */}
      <Card>
        <BlockStack>
          <Text variant="headingMd" as="h3">
            Project Details
          </Text>
          <List type="bullet">
            <List.Item>
              <strong>Inquiry Type:</strong>{" "}
              {data.projectDetails.inquiryType.replace("-", " ")}
            </List.Item>
            <List.Item>
              <strong>Subject:</strong> {data.projectDetails.subject}
            </List.Item>
            <List.Item>
              <strong>Priority:</strong> {data.projectDetails.priority}
            </List.Item>
            <List.Item>
              <strong>Timeline:</strong>{" "}
              {data.projectDetails.timeline.replace("-", " ")}
            </List.Item>
            {data.projectDetails.budget && (
              <List.Item>
                <strong>Budget:</strong>{" "}
                {data.projectDetails.budget
                  .replace("-", " to ")
                  .replace(/k/g, ",000")
                  .replace(/m/g, " million")}
              </List.Item>
            )}
            <List.Item>
              <strong>Project Types:</strong>{" "}
              {data.projectDetails.projectType
                .map(
                  (type) =>
                    PROJECT_TYPES.find((pt) => pt.value === type)?.label
                )
                .join(", ")}
            </List.Item>
          </List>
          <div>
            <Text variant="bodyMd" as="p" fontWeight="medium">
              Message:
            </Text>
            <TextContainer>
              <p>{data.projectDetails.message}</p>
            </TextContainer>
          </div>
          {data.projectDetails.technicalRequirements && (
            <div>
              <Text variant="bodyMd" as="p" fontWeight="medium">
                Technical Requirements:
              </Text>
              <TextContainer>
                <p>{data.projectDetails.technicalRequirements}</p>
              </TextContainer>
            </div>
          )}
        </BlockStack>
      </Card>

      {/* Communication Preferences Review */}
      <Card>
        <BlockStack>
          <Text variant="headingMd" as="h3">
            Communication Preferences
          </Text>
          <List type="bullet">
            <List.Item>
              <strong>Communication Frequency:</strong>{" "}
              {data.preferences.communicationFrequency}
            </List.Item>
            <List.Item>
              <strong>Follow-up Method:</strong>{" "}
              {data.preferences.followUpMethod}
            </List.Item>
            <List.Item>
              <strong>Language:</strong>{" "}
              {
                LANGUAGES.find(
                  (l) => l.value === data.preferences.language
                )?.label
              }
            </List.Item>
            <List.Item>
              <strong>Newsletter:</strong>{" "}
              {data.preferences.newsletter ? "Yes" : "No"}
            </List.Item>
            <List.Item>
              <strong>Marketing Consent:</strong>{" "}
              {data.preferences.marketingConsent ? "Yes" : "No"}
            </List.Item>
            <List.Item>
              <strong>Data Processing Consent:</strong>{" "}
              {data.preferences.dataProcessingConsent ? "Yes" : "No"}
            </List.Item>
            {data.preferences.interests.length > 0 && (
              <List.Item>
                <strong>Interests:</strong>{" "}
                {data.preferences.interests.join(", ")}
              </List.Item>
            )}
            {data.preferences.referralSource && (
              <List.Item>
                <strong>Referral Source:</strong>{" "}
                {data.preferences.referralSource.replace("-", " ")}
              </List.Item>
            )}
          </List>
        </BlockStack>
      </Card>
    </BlockStack>
  );
}

export default Review;
