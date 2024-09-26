import { useEffect, useState } from "react";
import AboutView from "./view";
import { fetchAbout } from "../../shared/services/about/about.service";
import { errorPopUpMessage } from "../../shared/components/Notification";

const AboutPage = () => {
  const [data, setData] = useState<string>();
  useEffect(() => {
    handleGetAboutData();
  });
  const handleGetAboutData = async () => {
    const result = await fetchAbout();
    if (!result.data.data) {
      errorPopUpMessage("Error fetching data", result.data.errors[0].message);
    }
    setData(result.data.data.findOneAbout.content);
  };
  return <AboutView data={data} />;
};

export default AboutPage;
