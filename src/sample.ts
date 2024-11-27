import { FormItem } from './Types/formGenerator';

const form1: Record<string, FormItem> = {
    userName: {
      validation: ["nullable"],
      type: "text",
      label: "نام",
    },
    personalNumber: {
      validation: ["number"],
      type: "text",
      label: "کد ملی",
    },
  };
  
export default form1;
