import {TCompanyInfo} from "../../../../../remix-app/app/types";
import {Banner, FormLayout, Select, TextField} from "@shopify/polaris";
import {INDUSTRIES} from "../../../../../remix-app/app/utils/step-config";

type TCompanyInfoStepProps = {
  data: TCompanyInfo;
  errors?: Partial<Record<keyof TCompanyInfo, string>>;
  onChange: (field: keyof TCompanyInfo, value: any) => void;
}

function CompanyInfo({ data, errors, onChange }: TCompanyInfoStepProps) {
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
          options={[{ label: 'Select industry...', value: '' }, ...INDUSTRIES]}
          value={data.industry || ''}
          onChange={(value) => onChange('industry', value)}
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <Select
          label="Company Size"
          name="companySize"
          options={[
            { label: 'Select size...', value: '' },
            { label: '1-10 employees', value: '1-10' },
            { label: '11-50 employees', value: '11-50' },
            { label: '51-200 employees', value: '51-200' },
            { label: '201-500 employees', value: '201-500' },
            { label: '501-1000 employees', value: '501-1000' },
            { label: '1000+ employees', value: '1000+' },
          ]}
          value={data.companySize || ''}
          onChange={(value) => onChange('companySize', value)}
        />
        <Select
          label="Annual Revenue"
          name="annualRevenue"
          options={[
            { label: 'Select revenue...', value: '' },
            { label: 'Less than $1M', value: 'less-than-1m' },
            { label: '$1M - $10M', value: '1m-10m' },
            { label: '$10M - $50M', value: '10m-50m' },
            { label: '$50M - $100M', value: '50m-100m' },
            { label: '$100M - $500M', value: '100m-500m' },
            { label: '$500M+', value: '500m+' },
          ]}
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
        options={[
          { label: 'Select type...', value: '' },
          { label: 'Business to Business (B2B)', value: 'b2b' },
          { label: 'Business to Consumer (B2C)', value: 'b2c' },
          { label: 'Both B2B and B2C', value: 'both' },
          { label: 'Non-Profit', value: 'non-profit' },
          { label: 'Government', value: 'government' },
        ]}
        value={data.businessType || ''}
        onChange={(value) => onChange('businessType', value)}
      />
    </FormLayout>
  );
}

export default CompanyInfo;
