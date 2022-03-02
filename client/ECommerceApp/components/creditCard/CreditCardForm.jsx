import React from "react";
import "./CreditCardForm.css";

// Modules/Libraries
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

// Components
import useForm from "./utils/useForm";
import { Button, Alert } from "react-bootstrap";

const CreditCardForm = ({ setCurrentStep }) => {
  const { handleChange, handleFocus, validate, values, errors } = useForm();

  const handleSubmission = async (e) => {
    e.preventDefault();
    let { variant } = validate();
    variant === "success" && setCurrentStep(4);
  };

  return (
    <div>
      <div className="card-container">
        <div className="box justify-content-center align-items-center">
          <div className="card-formDiv">
            <div className="creditCard">
              <Cards
                cvc={values.cardSecurityCode}
                expiry={values.cardExpiration}
                focused={values.focus}
                name={values.cardName}
                number={values.cardNumber}
              />
            </div>

            <form
              style={{ width: "100%" }}
              className="Login custom-form col-7"
              onSubmit={handleSubmission}
            >
              <h6>DELIVERY ADDRESS</h6>

              <input
                type="text"
                id="cardName"
                data-testid="cardName"
                name="cardName"
                placeholder="Cardholder Name"
                value={values.cardName}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cname}
              />

              <input
                type="number"
                id="cardNumber"
                data-testid="cardNumber"
                name="cardNumber"
                placeholder="Card Number"
                value={values.cardNumber}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cnumber}
              />

              <div className="d-flex gap-4 align-items-center">
                <input
                  type="text"
                  id="cardExpiration"
                  data-testid="cardExpiration"
                  name="cardExpiration"
                  placeholder="Expiration Date"
                  value={values.cardExpiration}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cexp}
                ></input>

                <input
                  type="number"
                  id="cardSecurityCode"
                  data-testid="cardSecurityCode"
                  name="cardSecurityCode"
                  placeholder="Security Code"
                  value={values.cardSecurityCode}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.ccvv}
                ></input>
              </div>

              <Button
                size={"block"}
                data-testid="validateButton"
                id="validateButton"
                type="submit"
              >
                Validate
              </Button>
            </form>
          </div>
          <Alert
            id="alertMessage"
            data-testid="alertMessage"
            variant={errors.variant}
            show={errors.show}
          >
            {errors.message}
          </Alert>{" "}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
