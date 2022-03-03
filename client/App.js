import React from "react";

// Modules/Libraries
import { ToastContainer } from "react-toastify";

// Components
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
