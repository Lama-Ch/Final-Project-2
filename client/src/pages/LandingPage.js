import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingPage = () => {
	return (
		<Wrapper>
			 <Logo2 src ='/assets/images/Foodeats-logo.png' alt='Logo' ></Logo2> 
			{/* <StyledTitle className='title'>Welcome </StyledTitle> */}
			<StyledSubtitle className='subtitle'>
				Discover our Fresh meals Today!
			</StyledSubtitle>
			<StyledLink to='/foods'>Get Started</StyledLink>
			<AboutText>
          Food Eats is a revolutionary platform that celebrates the joy of
          culinary exploration. Our mission is to connect passionate food
          enthusiasts from all corners of the world, empowering them to discover,
          create, and share exceptional recipes that delight the senses and
          nourish the soul.
        </AboutText>
		</Wrapper>
		
	);
};
const Logo2 = styled.img`
width:600px;
position: absolute;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
transform: translate(-50%, -90%); 
`;

const AboutText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 5px;
  color:black;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  height: 100vh;s
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  margin-top: 0px; /* Adjust the margin-top to move the logo higher */
`;
// const StyledTitle = styled.h1`
// 	font-size: 3rem;
// 	margin-bottom: 1rem;
// 	color:green;
// `;
const StyledSubtitle = styled.p`
	color: #333;
	font-size: 2rem;
	margin-bottom: 4rem;
	text-shadow: 1px 1px 2px rgba(16, 16, 16, 0.6);
`;
const StyledLink = styled(Link)`
	border: none;
	padding: 10px 30px;
	border-radius: 5px;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	background-color: #4caf50;
	transition: background-color 0.3s;
	text-decoration: none;
	cursor: pointer;
`;

export default LandingPage;
