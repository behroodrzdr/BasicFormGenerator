export interface FormItem {
    validation: Array<'nullable' | 'number'>;
    type: 'text' | 'number' | 'email' | 'password';
    label: string;
  }
  
  export type FormSchema = Record<string, FormItem>;

  export interface Forms {
    name: string,
    value: string,
    isValidate: boolean,
    error?: string,
  }