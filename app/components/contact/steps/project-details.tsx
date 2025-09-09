import {type TProjectDetails} from "../../../../../remix-app/app/types";
import {BlockStack, Checkbox, FormLayout, Select, Text, TextField} from "@shopify/polaris";
import {PROJECT_TYPES} from "../../../../../remix-app/app/utils/step-config";
import {BUDGET, INDUSTRY_TYPE, PRIORITY, TIMELINE} from "../../../utils/step-config";

interface ProjectDetailsProps {
  data: TProjectDetails;
  errors?: Partial<Record<keyof TProjectDetails, string>>;
  onChange: (field: keyof TProjectDetails, value: any) => void;
  onArrayChange: (field: keyof TProjectDetails, value: string, checked: boolean) => void;
}

export const ProjectDetails = ({ data, errors, onChange, onArrayChange }: ProjectDetailsProps) => {
  return (
    <FormLayout>
      <FormLayout.Group>
        <Select
          label="Inquiry Type"
          name="inquiryType"
          options={INDUSTRY_TYPE}
          value={data.inquiryType}
          onChange={(value) => onChange('inquiryType', value)}
          error={errors?.inquiryType}
        />
        <Select
          label="Priority"
          name="priority"
          options={PRIORITY}
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
          options={BUDGET}
          value={data.budget || ''}
          onChange={(value) => onChange('budget', value)}
        />
        <Select
          label="Timeline"
          name="timeline"
          options={TIMELINE}
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
          <Text variant="bodySm" as="p" tone="critical">{errors.projectType}</Text>
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
