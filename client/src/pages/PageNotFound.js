import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
	return (
		<NotFoundContainer>
			<Title>Oops!</Title>
			<Message>The page you're looking for doesn't exist.</Message>
			<GoToHomeButton to='/'>Back to Home</GoToHomeButton>
		</NotFoundContainer>
	);
};
const NotFoundContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 65px);
	background-color: #f8f9fa;
`;

const Title = styled.h1`
	font-size: 3rem;
	color: #e74c3c;
	margin-bottom: 10px;
`;

const Message = styled.p`
	font-size: 1.2rem;
	color: #333;
	margin-bottom: 20px;
`;

const GoToHomeButton = styled(Link)`
	border: none;
	padding: 10px 30px;
	border-radius: 5px;
	color: #fff;
	font-size: 14px;
	font-weight: bold;
	background-color: #4caf50;
	transition: background-color 0.3s;
	cursor: pointer;
	text-decoration: none;
`;

export default NotFoundPage;
