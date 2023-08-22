import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingPage = () => {
	return (
		<Wrapper>
			<StyledTitle className='title'>Welcome to Food Eats</StyledTitle>
			<StyledSubtitle className='subtitle'>
				Discover our Fresh meals Today
			</StyledSubtitle>
			<StyledLink to='/foods'>Get Started</StyledLink>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: url(/assets/images/landing-cover.jpg);
	background-size: cover;
	background-position: center;
	color: #fff;
	text-align: center;
`;
const StyledTitle = styled.h1`
	font-size: 3rem;
	margin-bottom: 1rem;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;
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
	font-size: 14px;
	font-weight: bold;
	background-color: #4caf50;
	transition: background-color 0.3s;
	cursor: pointer;
`;

export default LandingPage;
