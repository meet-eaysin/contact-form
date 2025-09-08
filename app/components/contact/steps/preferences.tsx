import {type TPreferences} from "../../../../../remix-app/app/types";
import {BlockStack, Checkbox, FormLayout, Select, Text} from "@shopify/polaris";
import {LANGUAGES} from "../../../../../remix-app/app/utils/step-config";

interface TPreferencesProps {
  data: TPreferences;
  errors?: any;
  onChange: (field: keyof TPreferences, value: any) => void;
  onNestedChange: (parentField: keyof TPreferences, childField: string, value: any) => void;
  onArrayChange: (field: keyof TPreferences, value: string, checked: boolean) => void;
}

function Preferences({
                           data,
                           errors,
                           onChange,
                           onNestedChange,
                           onArrayChange
                         }: TPreferencesProps) {
  return (
    <FormLayout>
      <Text variant="headingMd" as="h3">
        Communication Preferences
      </Text>

      <FormLayout.Group>
        <Select
          label="Communication Frequency"
          name="communicationFrequency"
          options={[
            { label: 'Immediately', value: 'immediately' },
            { label: 'Daily digest', value: 'daily' },
            { label: 'Weekly summary', value: 'weekly' },
            { label: 'Monthly update', value: 'monthly' },
          ]}
          value={data.communicationFrequency}
          onChange={(value) => onChange('communicationFrequency', value)}
          error={errors?.communicationFrequency}
        />
        <Select
          label="Follow-up Method"
          name="followUpMethod"
          options={[
            { label: 'Email only', value: 'email' },
            { label: 'Phone only', value: 'phone' },
            { label: 'Both email and phone', value: 'both' },
            { label: 'No follow-up needed', value: 'none' },
          ]}
          value={data.followUpMethod}
          onChange={(value) => onChange('followUpMethod', value)}
          error={errors?.followUpMethod}
        />
      </FormLayout.Group>

      <Select
        label="Preferred Language"
        name="language"
        options={LANGUAGES}
        value={data.language}
        onChange={(value) => onChange('language', value)}
        error={errors?.language}
      />

      <div>
        <Text variant="bodyMd" as="p" fontWeight="medium">
          Interests (Optional)
        </Text>
        <Text variant="bodySm" as="p" tone="subdued">
          What topics would you like to hear about?
        </Text>
        <BlockStack>
          {[
            { label: 'Product Updates', value: 'product-updates' },
            { label: 'Industry News', value: 'industry-news' },
            { label: 'Case Studies', value: 'case-studies' },
            { label: 'Webinars & Events', value: 'webinars' },
            { label: 'Technical Articles', value: 'technical' },
          ].map((interest) => (
            <Checkbox
              key={interest.value}
              label={interest.label}
              name="interests"
              checked={data.interests.includes(interest.value)}
              onChange={(checked) => onArrayChange('interests', interest.value, checked)}
            />
          ))}
        </BlockStack>
      </div>

      <Select
        label="How did you hear about us? (Optional)"
        name="referralSource"
        options={[
          { label: 'Please select...', value: '' },
          { label: 'Search Engine', value: 'search-engine' },
          { label: 'Social Media', value: 'social-media' },
          { label: 'Referral from friend/colleague', value: 'referral' },
          { label: 'Online Advertisement', value: 'advertisement' },
          { label: 'Conference/Event', value: 'event' },
          { label: 'Other', value: 'other' },
        ]}
        value={data.referralSource || ''}
        onChange={(value) => onChange('referralSource', value)}
      />

      <Text variant="headingMd" as="h3">
        Consent & Permissions
      </Text>

      <BlockStack>
        <Checkbox
          label="Subscribe to newsletter and product updates"
          name="newsletter"
          checked={data.newsletter}
          onChange={(checked) => onChange('newsletter', checked)}
          helpText="We'll send you occasional updates about our products and services"
        />

        <Checkbox
          label="I consent to receiving marketing communications"
          name="marketingConsent"
          checked={data.marketingConsent}
          onChange={(checked) => onChange('marketingConsent', checked)}
          helpText="We may contact you about our products, services, and promotional offers"
        />

        <Checkbox
          label="I consent to the processing of my personal data"
          name="dataProcessingConsent"
          checked={data.dataProcessingConsent}
          onChange={(checked) => onChange('dataProcessingConsent', checked)}
          error={errors?.dataProcessingConsent}
          helpText="Required: We need your consent to process and respond to your inquiry"
        />
      </BlockStack>

      <Text variant="headingMd" as="h3">
        Accessibility Preferences
      </Text>

      <Text variant="bodySm" as="p" tone="subdued">
        Help us provide you with the best possible experience
      </Text>

      <BlockStack>
        <Checkbox
          label="I use a screen reader"
          name="screenReader"
          checked={data.accessibility.screenReader}
          onChange={(checked) => onNestedChange('accessibility', 'screenReader', checked)}
        />
        <Checkbox
          label="I prefer larger fonts"
          name="largeFonts"
          checked={data.accessibility.largeFonts}
          onChange={(checked) => onNestedChange('accessibility', 'largeFonts', checked)}
        />
        <Checkbox
          label="I need high contrast mode"
          name="highContrast"
          checked={data.accessibility.highContrast}
          onChange={(checked) => onNestedChange('accessibility', 'highContrast', checked)}
        />
        <Checkbox
          label="I primarily use keyboard navigation"
          name="keyboardNavigation"
          checked={data.accessibility.keyboardNavigation}
          onChange={(checked) => onNestedChange('accessibility', 'keyboardNavigation', checked)}
        />
      </BlockStack>
    </FormLayout>
  );
}

export default Preferences;
