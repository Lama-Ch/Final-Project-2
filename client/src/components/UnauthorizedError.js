import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UnauthorizedError = () => {
	return (
		<Container>
			<Heading>Unauthorized</Heading>
			<Message>Please log in to access this feature.</Message>
			<LoginButton to='/signin'>Sign In</LoginButton>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 65px);
	background-color: #f8f9fa;
`;

const Heading = styled.h1`
	font-size: 3rem;
	color: #e74c3c;
	margin-bottom: 10px;
`;

const Message = styled.p`
	font-size: 18px;
	margin-bottom: 30px;
`;
const LoginButton = styled(Link)`
	padding: 10px 40px;
	font-size: 16px;
	background-color: #4caf50;
	font-size: 14px;
	font-weight: bold;
	color: #fff;
	border: none;
	border-radius: 5px;
	text-decoration: none;
`;

export default UnauthorizedError;
