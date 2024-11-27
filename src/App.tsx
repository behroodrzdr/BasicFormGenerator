import React from 'react';
import form1 from './sample';

import FormGenerator from "./FormGenerator";
import './App.css';

export default function App() {

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className='App'>
      <div className='formBody'>
        <FormGenerator formSchema={form1} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}