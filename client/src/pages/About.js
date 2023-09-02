import React from "react";
import styled from "styled-components";


const AboutPage = () => {

  return (
    <AboutContainer>
  <AboutBackground src="/Users/mac/Final-project/Final-Project/client/src/pictures/cover.jpg" alt="About Us" />
      <AboutContent>
        <AboutTitle>About Us</AboutTitle>
        
        <AboutText>
          Food Eats is a revolutionary platform that celebrates the joy of
          culinary exploration. Our mission is to connect passionate food
          enthusiasts from all corners of the world, empowering them to discover,
          create, and share exceptional recipes that delight the senses and
          nourish the soul.
        </AboutText>
        <AboutFeatures>
          <h2>Our Vision</h2>
          <p>
            We envision a world where food brings people together, fosters
            creativity, and nurtures cultural exchange. Through our innovative
            technology and community-driven approach, we strive to make cooking
            an immersive and joyful experience for everyone.
          </p>
        </AboutFeatures>
      </AboutContent>
    </AboutContainer>
  );
};


const AboutContainer = styled.div`
  position: relative;
  padding: 100px 0;
`;

const AboutBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

const AboutTitle = styled.h1`
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`;

const AboutText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const AboutFeatures = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
  }
`;

export default AboutPage;