import {BlockStack, FormLayout, RadioButton, Text, TextField} from "@shopify/polaris";
import {type TPersonalInfo} from "../../../../../remix-app/app/types";
import {GENDER} from "../../../utils/step-config";

interface TPersonalInfoProps {
  data: TPersonalInfo;
  errors?: Partial<Record<keyof TPersonalInfo, string>>;
  onChange: (field: keyof TPersonalInfo, value: any) => void;
}

export const PersonalInfo = ({ data, errors, onChange }: TPersonalInfoProps) => {
  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={(value) => onChange('firstName', value)}
          error={errors?.firstName}
          autoComplete="given-name"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={(value) => onChange('lastName', value)}
          error={errors?.lastName}
          autoComplete="family-name"
        />
      </FormLayout.Group>

      <TextField
        label="Middle Name (Optional)"
        name="middleName"
        value={data.middleName || ''}
        onChange={(value) => onChange('middleName', value)}
        error={errors?.middleName}
        autoComplete="additional-name"
      />

      <FormLayout.Group>
        <TextField
          label="Title/Prefix (Optional)"
          name="title"
          value={data.title || ''}
          onChange={(value) => onChange('title', value)}
          error={errors?.title}
          placeholder="Mr., Mrs., Dr., etc."
          autoComplete={'honorific-prefix'}
        />
        <TextField
          label="Date of Birth (Optional)"
          name="dateOfBirth"
          type="date"
          value={data.dateOfBirth || ''}
          onChange={(value) => onChange('dateOfBirth', value)}
          error={errors?.dateOfBirth}
          helpText="Must be 13 years or older"
          autoComplete="bday"
        />
      </FormLayout.Group>

      <div>
        <Text variant="bodyMd" as="p" fontWeight="medium">
          Gender (Optional)
        </Text>
        <BlockStack>
          {GENDER.map((option) => (
            <RadioButton
              key={option.value}
              label={option.label}
              name="gender"
              checked={data.gender === option.value}
              id={`gender-${option.value}`}
              onChange={() => onChange('gender', option.value)}
            />
          ))}
        </BlockStack>
      </div>
    </FormLayout>
  );
}
