import { useState } from "react";

type TValues = {
  name?: string,
  email?: string,
  password?: string,
  token?: string,
}

export function useForm(inputValues:TValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  return {
    values, 
    handleChange, 
    setValues
  };
}