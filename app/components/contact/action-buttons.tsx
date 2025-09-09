import { Button } from "@shopify/polaris";
import { type SubmitFunction } from "@remix-run/react";
import { type TCompleteFormData } from "../../types";

type ActionButtonsProps = {
  isSubmitting: boolean;
  submit: SubmitFunction;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: number;
  formData: any;
};

const ActionButtons = ({
  isSubmitting,
  submit,
  isFirstStep,
  isLastStep,
  currentStep,
  formData,
}: ActionButtonsProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem 0",
      }}
    >
      {!isFirstStep && (
        <Button
          onClick={() =>
            submit(
              {
                currentStep: String(currentStep),
                _action: "previous",
                formData: JSON.stringify(formData),
              },
              { method: "post" },
            )
          }
          disabled={isSubmitting}
        >
          Previous
        </Button>
      )}

      <Button
        onClick={() =>
          submit(
            {
              currentStep: String(currentStep),
              _action: isLastStep ? "submit" : "next",
              formData: JSON.stringify(formData),
            },
            { method: "post" },
          )
        }
        loading={isSubmitting}
        variant="primary"
        disabled={isSubmitting}
      >
        {isLastStep ? "Submit Form" : "Continue"}
      </Button>
    </div>
  );
};

export default ActionButtons;
