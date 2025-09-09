import { type TCompanyInfo } from "../../../../../remix-app/app/types";
import {Banner, FormLayout, Select, TextField} from "@shopify/polaris";
import {INDUSTRIES} from "../../../../../remix-app/app/utils/step-config";
import {ANNUAL_REVENUE, BUSINESS_TYPES, COMPANY_SIZES} from "../../../utils/step-config";

type TCompanyInfoProps = {
  data: TCompanyInfo;
  errors?: Partial<Record<keyof TCompanyInfo, string>>;
  onChange: (field: keyof TCompanyInfo, value: any) => void;
}

export const CompanyInfo = ({ data, errors, onChange }: TCompanyInfoProps) => {
  return (
    <FormLayout>
      <Banner tone="info">
        <p>This section is optional but helps us better understand your needs.</p>
      </Banner>

      <FormLayout.Group>
        <TextField
          label="Company Name"
          name="companyName"
          value={data.companyName || ''}
          onChange={(value) => onChange('companyName', value)}
          error={errors?.companyName}
          autoComplete="organization"
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={data.jobTitle || ''}
          onChange={(value) => onChange('jobTitle', value)}
          error={errors?.jobTitle}
          autoComplete="organization-title"
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <TextField
          label="Department"
          name="department"
          value={data.department || ''}
          onChange={(value) => onChange('department', value)}
          error={errors?.department}
          autoComplete="organization"
        />
        <Select
          label="Industry"
          name="industry"
          error={errors?.industry}
          options={[{ label: 'Select industry...', value: '' }, ...INDUSTRIES]}
          value={data.industry || ''}
          onChange={(value) => onChange('industry', value)}
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <Select
          label="Company Size"
          name="companySize"
          error={errors?.companySize}
          options={COMPANY_SIZES}
          value={data.companySize || ''}
          onChange={(value) => onChange('companySize', value)}
        />
        <Select
          label="Annual Revenue"
          name="annualRevenue"
          error={errors?.annualRevenue}
          options={ANNUAL_REVENUE}
          value={data.annualRevenue || ''}
          onChange={(value) => onChange('annualRevenue', value)}
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <TextField
          label="Company Website"
          name="website"
          type="url"
          value={data.website || ''}
          onChange={(value) => onChange('website', value)}
          error={errors?.website}
          placeholder="https://www.example.com"
          autoComplete={'website'}
        />
        <TextField
          label="LinkedIn Profile"
          name="linkedinProfile"
          type="url"
          value={data.linkedinProfile || ''}
          onChange={(value) => onChange('linkedinProfile', value)}
          error={errors?.linkedinProfile}
          placeholder="https://www.linkedin.com/company/example"
          autoComplete={'linkedin'}
        />
      </FormLayout.Group>

      <Select
        label="Business Type"
        name="businessType"
        error={errors?.businessType}
        options={BUSINESS_TYPES}
        value={data.businessType || ''}
        onChange={(value) => onChange('businessType', value)}
      />
    </FormLayout>
  );
}
