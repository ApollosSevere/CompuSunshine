import React from "react";
import useForm from "./utils/useForm";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardForm.css";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const CreditCardForm = ({ setCurrentStep }) => {
  const { handleChange, handleFocus, validate, values, errors } = useForm();

  const handleSubmission = async (e) => {
    e.preventDefault();
    let { variant } = validate();
    console.log(variant);
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

              {/* <input
                type="text"
                name="cardType"
                id="cardType"
                data-testid="cardType"
                placeholder="Card Type"
                value={values.cardType}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.ctype}
              ></input> */}

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

              {/* <input
                type="text"
                id="cardPostalCode"
                data-testid="cardPostalCode"
                name="cardPostalCode"
                placeholder="Postal Code"
                value={values.cardPostalCode}
                onChange={handleChange}
                onFocus={handleFocus}
                isValid={errors.cpostal}
              ></input> */}
              {/* 
              <button type="submit">Next</button>
              <button type="cancel" onClick={() => history.push("/cart")}>
                Cancel
              </button> */}

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
