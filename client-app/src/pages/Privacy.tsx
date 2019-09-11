// 3rd Party
import React, { CSSProperties } from "react";

// CSS / Images
const privacyStyle: CSSProperties = {
  textAlign: "left"
};

// Component
const Privacy: React.FC = () => {
  return (
    <div style={privacyStyle}>
      <p>Budget or Your Life Privacy Policy</p>
      <p>
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit{" "}
        <a href="https://budgetoryourlife.com">https://budgetoryourlife.com</a>{" "}
        (the “Site”).
      </p>
      <p>PERSONAL INFORMATION WE COLLECT</p>
      <p>
        When you visit the Site, we automatically collect certain information
        about your device, including information about your web browser, IP
        address, time zone, and some of the cookies that are installed on your
        device. Additionally, as you browse the Site, we collect information
        about the individual web pages or products that you view, what websites
        or search terms referred you to the Site, and information about how you
        interact with the Site. We refer to this automatically-collected
        information as “Device Information.”
      </p>
      <p>We collect Device Information using the following technologies:</p>
      <p style={{ marginLeft: "2em" }}>
        {" "}
        - “Log files” track actions occurring on the Site, and collect data
        including your IP address, browser type, Internet service provider,
        referring/exit pages, and date/time stamps.
      </p>
      <p>
        When we talk about “Personal Information” in this Privacy Policy, we are
        talking about Device Information.
      </p>
      <p>HOW DO WE USE YOUR PERSONAL INFORMATION?</p>
      <p>
        We use the Device Information that we collect to help us better design
        our site for common user devices and browsers
      </p>
      <p>SHARING YOUR PERSONAL INFORMATION</p>
      <p>
        We share your Personal Information with third parties to help us use
        your Personal Information, as described above. For example, we use
        Google Analytics to help us understand how our customers use the
        Site--you can read more about how Google uses your Personal Information
        here: https://www.google.com/intl/en/policies/privacy/. You can also
        opt-out of Google Analytics here:
        https://tools.google.com/dlpage/gaoptout.
      </p>
      <p>
        Finally, we may also share your Personal Information to comply with
        applicable laws and regulations, to respond to a subpoena, search
        warrant or other lawful request for information we receive, or to
        otherwise protect our rights.
      </p>
      <p>
        Additionally, you can opt out of some of these services by visiting the
        Digital Advertising Alliance’s opt-out portal at:{" "}
        <a href="http://optout.aboutads.info/">http://optout.aboutads.info/.</a>
      </p>
      <p>DO NOT TRACK</p>
      <p>
        Please note that we do not alter our Site’s data collection and use
        practices when we see a Do Not Track signal from your browser.
      </p>
      <p>CHANGES</p>
      <p>
        We may update this privacy policy from time to time in order to reflect,
        for example, changes to our practices or for other operational, legal or
        regulatory reasons.
      </p>
      <p>CONTACT US</p>
      <p>
        For more information about our privacy practices, if you have questions,
        or if you would like to make a complaint, please contact us contacting
        us on our{" "}
        <a href="https://budgetoryourlife.com/Contact">contact page</a>
      </p>
    </div>
  );
};

export default Privacy;
