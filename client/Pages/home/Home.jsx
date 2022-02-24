import React from "react";
import { connect } from "react-redux";

import CalltoActionSection from "../../components/homeComponents/callToAction/CalltoActionSection.jsx";
import ContactInfo from "../../components/homeComponents/contact/ContactInfo.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ShopSection from "../../components/homeComponents/shopSection/ShopSection.jsx";
import Header from "../../components/Header/Header.jsx";

/**
 * COMPONENT
 */
export const Home = (props) => {
  console.log("current state: ", props.state);
  const { username } = props;

  return (
    <div>
      <Header canSearch={true} />
      <CalltoActionSection />
      <ShopSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    state: state,
  };
};

export default connect(mapState)(Home);
