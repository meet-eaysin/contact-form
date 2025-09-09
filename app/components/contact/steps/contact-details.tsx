import {type TContactDetails} from "../../../../../remix-app/app/types";
import {BlockStack, Checkbox, FormLayout, RadioButton, Select, Text, TextField} from "@shopify/polaris";
import {COUNTRIES, TIME_ZONES} from "../../../../../remix-app/app/utils/step-config";
import {BEST_TIME_TO_CONTACT} from "../../../utils/step-config";

interface TContactDetailsProps {
  data: TContactDetails;
  errors?: any;
  onChange: (field: keyof TContactDetails, value: any) => void;
  onNestedChange: (parentField: keyof TContactDetails, childField: string, value: any) => void;
  onArrayChange: (field: keyof TContactDetails, value: string, checked: boolean) => void;
}

export const ContactDetails = ({
                                 data,
                                 errors,
                                 onChange,
                                 onNestedChange,
                                 onArrayChange
                               }: TContactDetailsProps) => {
  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={data.email}
          onChange={(value) => onChange('email', value)}
          error={errors?.email}
          autoComplete="email"
        />
        <TextField
          label="Confirm Email Address"
          name="confirmEmail"
          type="email"
          value={data.confirmEmail}
          onChange={(value) => onChange('confirmEmail', value)}
          error={errors?.confirmEmail}
          autoComplete="email"
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={(value) => onChange('phone', value)}
          error={errors?.phone}
          autoComplete="tel"
        />
        <TextField
          label="Alternate Phone (Optional)"
          name="alternatePhone"
          type="tel"
          value={data.alternatePhone || ''}
          onChange={(value) => onChange('alternatePhone', value)}
          error={errors?.alternatePhone}
          autoComplete="tel"
        />
      </FormLayout.Group>

      <Select
        label="Time Zone"
        name="timeZone"
        options={TIME_ZONES}
        value={data.timeZone}
        onChange={(value) => onChange('timeZone', value)}
        error={errors?.timeZone}
      />

      <div>
        <Text variant="bodyMd" as="p" fontWeight="medium">
          Preferred Contact Method
        </Text>
        <BlockStack>
          {[
            {label: 'Email', value: 'email'},
            {label: 'Phone', value: 'phone'},
            {label: 'Both', value: 'both'},
          ].map((option) => (
            <RadioButton
              key={option.value}
              label={option.label}
              name="preferredContactMethod"
              checked={data.preferredContactMethod === option.value}
              id={`contact-method-${option.value}`}
              onChange={() => onChange('preferredContactMethod', option.value)}
            />
          ))}
        </BlockStack>
      </div>

      <div>
        <Text variant="bodyMd" as="p" fontWeight="medium">
          Best Time to Contact
        </Text>
        {errors?.bestTimeToContact && (
          <Text variant="bodySm" as="p" tone="critical">
            {errors.bestTimeToContact}
          </Text>
        )}
        <BlockStack>
          {BEST_TIME_TO_CONTACT.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              name="bestTimeToContact"
              checked={data.bestTimeToContact.includes(option.value)}
              onChange={(checked) => onArrayChange('bestTimeToContact', option.value, checked)}
            />
          ))}
        </BlockStack>
      </div>

      <Text variant="headingMd" as="h3">
        Address Information
      </Text>

      <TextField
        label="Street Address"
        name="street"
        value={data.address.street}
        onChange={(value) => onNestedChange('address', 'street', value)}
        error={errors?.address?.street}
        autoComplete="street-address"
      />

      <FormLayout.Group>
        <TextField
          label="Apartment, Suite, etc. (Optional)"
          name="apartment"
          value={data.address.apartment || ''}
          onChange={(value) => onNestedChange('address', 'apartment', value)}
          autoComplete="address-line2"
        />

        <TextField
          label="State/Province"
          name="state"
          value={data.address.state}
          onChange={(value) => onNestedChange('address', 'state', value)}
          error={errors?.address?.state}
          autoComplete="address-level1"
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <TextField
          label="ZIP/Postal Code"
          name="zipCode"
          value={data.address.zipCode}
          onChange={(value) => onNestedChange('address', 'zipCode', value)}
          error={errors?.address?.zipCode}
          autoComplete="postal-code"
        />
        <TextField
          label="City"
          name="city"
          value={data.address.city}
          onChange={(value) => onNestedChange('address', 'city', value)}
          error={errors?.address?.city}
          autoComplete="address-level2"
        />
      </FormLayout.Group>

      <Select
        label="Country"
        name="country"
        options={COUNTRIES}
        value={data.address.country}
        onChange={(value) => onNestedChange('address', 'country', value)}
        error={errors?.address?.country}
      />
    </FormLayout>
  );
}
