import { useState } from "react";
import validateInfo from "./validateInfo";

const useForm = () => {
  const [values, setValues] = useState({
    cardName: "",
    cardNumber: "5290990016556656",
    cardType: "",
    cardExpiration: "",
    cardSecurityCode: "",
    cardPostalCode: "",
    focus: "",
  });

  const [errors, setErrors] = useState({});

  const handleFocus = (e) => {
    setValues({
      ...values,
      focus: e.target.name === "cardSecurityCode" ? "cvc" : e.target.name,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    let errorsInfo = validateInfo(values);
    setErrors(errorsInfo);
    return errorsInfo;
  };

  return { handleChange, handleFocus, validate, values, errors };
};

export default useForm;
