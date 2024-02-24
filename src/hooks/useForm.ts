import { useState, SyntheticEvent } from 'react'; 

export function useForm<T extends {[key: string]: string | number}>(inputValues:T) {
  const [values, setValues] = useState(inputValues);
  
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
  
}


/*useForm(inputValues: {[key: string]: string | number})*/