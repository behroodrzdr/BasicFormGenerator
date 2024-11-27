import React, { useState } from "react";
import { FormSchema } from './Types/formGenerator';

interface FormGeneratorProps {
  formSchema: FormSchema;
  onSubmit: (data: Record<string, string>) => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ formSchema, onSubmit }) => {
  const initialFormState = Object.keys(formSchema).reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {}
  );

  const [formData, setFormData] = useState<Record<string, string>>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>(initialFormState);

  const validateField = (key: string, value: string): string => {
    const { validation } = formSchema[key];

    if (validation.includes("nullable") && !value.trim()) {
      return "This field is required.";
    }

    if (validation.includes("number") && isNaN(Number(value))) {
      return "This field must be a number.";
    }

    return "";
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { ...initialFormState } as any;

    for (const key in formSchema) {
      const error = validateField(key, formData[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for this field
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData(initialFormState); // Reset form
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      {Object.keys(formSchema).map((key) => {
        const field = formSchema[key];
        return (
          <div key={key} style={{ marginBottom: "16px" }}>
            <label htmlFor={key} style={{ display: "block", marginBottom: "8px" }}>
              {field.label}:
            </label>
            <input
              type={field.type}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />
            {errors[key] && <span style={{ color: "red", fontSize: "12px" }}>{errors[key]}</span>}
          </div>
        );
      })}

      <button type="submit" style={{ padding: "10px 20px" }}>
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;