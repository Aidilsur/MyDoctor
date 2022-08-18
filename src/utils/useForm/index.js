import {useState} from 'react';

export const useForm = initaialValue => {
  const [values, setValues] = useState(initaialValue);
  return [
    values,
    (formType, formValue) => {
      return setValues({...values, [formType]: formValue});
    },
  ];
};
