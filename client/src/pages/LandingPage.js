import { Link } from 'react-router-dom';
import styled from 'styled-components';
import  SignInForm from "./SignInForm";

const LandingPage = () => {
	return (
		<Wrapper>
			 {/* <Logo2 src ='/assets/images/Foodeats-logo.png' alt='Logo' ></Logo2>  */}
			 <Image src = "/assets/images/backgroundImage.png" alt = "Background"/>
			<StyledSubtitle className='subtitle'>
				Discover our Fresh meals Today!
			</StyledSubtitle>
			<LinksContainer>
			<StyledLink to='/foods'>Find Food</StyledLink>
			{/* <AboutText>
          
        </AboutText> */}
	<SignInLink to="/signin" style={{ textDecoration: 'none' }}>  Sign In ? </SignInLink>
	</LinksContainer>
		</Wrapper>
		
	);
};
const Logo2 = styled.img`
width:300px;
position: absolute;
  top: 20%; /* Center vertically */
  left: 6.5%; /* Center horizontally */
transform: translate(-50%, -90%); 

`;

const AboutText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 5px;
  color:black;
`;
const Image= styled.img`
border: 5px solid #ddd;
  border-radius: 4px;
  padding: 4px;
 width: 80%;
 opacity: 0.8;
 margin-top: -150px; 
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  height: 100vh;
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  margin-top: 0px; /* Adjust the margin-top to move the logo higher */
`;

const StyledSubtitle = styled.p`
	color: green;
	font-size: 2rem;
	margin-bottom: 4rem;
	text-shadow: 1px 1px 2px rgba(16, 16, 16, 0.6);
`;
const LinksContainer = styled.div`
  display: flex;
  align-items: center; /* Center horizontally */
  gap: 10px; /* Adjust the gap between the links */
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
const SignInLink = styled(Link)`
font-weight: bold;
color: black;
`;
export default LandingPage;
