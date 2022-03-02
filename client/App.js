import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes />
    </div>
  );
};

export default App;
