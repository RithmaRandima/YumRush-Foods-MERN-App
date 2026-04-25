import React, { useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Newsletter from "../../components/Newsletter/Newsletter";
import VideoSection from "../../components/VideoSection/VideoSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import HomeMenuSection from "../../components/HomeMenuSection/HomeMenuSection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <AboutSection />
      <HomeMenuSection />
      <VideoSection />
      <Newsletter />
      {/* <AppDownload /> */}
    </div>
  );
};

export default Home;
