import React from "react";

// Components
import Footer from "../../components/footer/Footer.jsx";
import ContactInfo from "../../components/homeComponents/contact/ContactInfo.jsx";
import ShopSection from "../../components/homeComponents/shopSection/ShopSection.jsx";
import CalltoActionSection from "../../components/homeComponents/callToAction/CalltoActionSection.jsx";

export const Home = (props) => {
  return (
    <div>
      <CalltoActionSection />
      <ShopSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default Home;
