import {type TProjectDetails} from "../../../../../remix-app/app/types";
import {BlockStack, Checkbox, FormLayout, Select, Text, TextField} from "@shopify/polaris";
import {PROJECT_TYPES} from "../../../../../remix-app/app/utils/step-config";

interface ProjectDetailsStepProps {
  data: TProjectDetails;
  errors?: Partial<Record<keyof TProjectDetails, string>>;
  onChange: (field: keyof TProjectDetails, value: any) => void;
  onArrayChange: (field: keyof TProjectDetails, value: string, checked: boolean) => void;
}

function ProjectDetails({ data, errors, onChange, onArrayChange }: ProjectDetailsStepProps) {
  return (
    <FormLayout>
      <FormLayout.Group>
        <Select
          label="Inquiry Type"
          name="inquiryType"
          options={[
            { label: 'General Inquiry', value: 'general' },
            { label: 'Technical Support', value: 'support' },
            { label: 'Sales Question', value: 'sales' },
            { label: 'Partnership', value: 'partnership' },
            { label: 'Technical Discussion', value: 'technical' },
            { label: 'Billing Question', value: 'billing' },
            { label: 'Other', value: 'other' },
          ]}
          value={data.inquiryType}
          onChange={(value) => onChange('inquiryType', value)}
          error={errors?.inquiryType}
        />
        <Select
          label="Priority"
          name="priority"
          options={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
            { label: 'Urgent', value: 'urgent' },
          ]}
          value={data.priority}
          onChange={(value) => onChange('priority', value)}
          error={errors?.priority}
        />
      </FormLayout.Group>

      <TextField
        label="Subject"
        name="subject"
        value={data.subject}
        onChange={(value) => onChange('subject', value)}
        error={errors?.subject}
        placeholder="Brief description of your inquiry"
        autoComplete={'off'}
      />

      <FormLayout.Group>
        <Select
          label="Budget Range"
          name="budget"
          options={[
            { label: 'Select budget...', value: '' },
            { label: 'Less than $5,000', value: 'less-than-5k' },
            { label: '$5,000 - $25,000', value: '5k-25k' },
            { label: '$25,000 - $100,000', value: '25k-100k' },
            { label: '$100,000 - $500,000', value: '100k-500k' },
            { label: '$500,000+', value: '500k+' },
          ]}
          value={data.budget || ''}
          onChange={(value) => onChange('budget', value)}
        />
        <Select
          label="Timeline"
          name="timeline"
          options={[
            { label: 'ASAP', value: 'asap' },
            { label: 'Within 1 month', value: 'within-1-month' },
            { label: '1-3 months', value: '1-3-months' },
            { label: '3-6 months', value: '3-6-months' },
            { label: '6+ months', value: '6-months+' },
          ]}
          value={data.timeline}
          onChange={(value) => onChange('timeline', value)}
          error={errors?.timeline}
        />
      </FormLayout.Group>

      <div>
        <Text variant="bodyMd" as="p" fontWeight="medium">
          Project Type (Select all that apply)
        </Text>
        {errors?.projectType && (
          <Text variant="bodySm" as="p" tone="critical">
            {errors.projectType}
          </Text>
        )}
        <BlockStack>
          {PROJECT_TYPES.map((type) => (
            <Checkbox
              key={type.value}
              label={type.label}
              name="projectType"
              checked={data.projectType.includes(type.value)}
              onChange={(checked) => onArrayChange('projectType', type.value, checked)}
            />
          ))}
        </BlockStack>
      </div>

      <TextField
        label="Detailed Message"
        name="message"
        multiline={6}
        value={data.message}
        onChange={(value) => onChange('message', value)}
        error={errors?.message}
        helpText="Please provide as much detail as possible about your project or inquiry"
        showCharacterCount
        maxLength={2000}
        autoComplete={'off'}
      />

      <TextField
        label="Technical Requirements (Optional)"
        name="technicalRequirements"
        multiline={4}
        value={data.technicalRequirements || ''}
        onChange={(value) => onChange('technicalRequirements', value)}
        error={errors?.technicalRequirements}
        helpText="Any specific technical requirements, integrations, or constraints"
        showCharacterCount
        maxLength={1000}
        autoComplete={'off'}
      />

      <FormLayout.Group>
        <TextField
          label="Current Solution (Optional)"
          name="currentSolution"
          multiline={3}
          value={data.currentSolution || ''}
          onChange={(value) => onChange('currentSolution', value)}
          error={errors?.currentSolution}
          helpText="What are you currently using?"
          showCharacterCount
          maxLength={500}
          autoComplete={'off'}
        />
        <TextField
          label="Expected Outcome (Optional)"
          name="expectedOutcome"
          multiline={3}
          value={data.expectedOutcome || ''}
          onChange={(value) => onChange('expectedOutcome', value)}
          error={errors?.expectedOutcome}
          helpText="What do you hope to achieve?"
          showCharacterCount
          maxLength={500}
          autoComplete={'off'}
        />
      </FormLayout.Group>

      <TextField
        label="Success Metrics (Optional)"
        name="successMetrics"
        multiline={3}
        value={data.successMetrics || ''}
        onChange={(value) => onChange('successMetrics', value)}
        error={errors?.successMetrics}
        helpText="How will you measure success?"
        showCharacterCount
        maxLength={500}
        autoComplete={'off'}
      />
    </FormLayout>
  );
}

export default ProjectDetails;
