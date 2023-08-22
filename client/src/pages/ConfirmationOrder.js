import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { orderByIdService } from '../apis/ordersApi';
import LoadingSpinner from '../components/Loader';

const ConfirmationOrder = () => {
	const { token } = useAuth();
	const navigate = useNavigate();
	const { orderId } = useParams();

	const [orderData, setOrderData] = useState(null);
	const [orderDataLoading, setOrderDataLoading] = useState(true);

	const parsedDateTime = useMemo(() => {
		if (!orderData) {
			return null;
		}
		const dateTime = new Date(orderData.createdAt);

		const formattedDate = dateTime.toLocaleString('en-CA', {
			dateStyle: 'medium',
			timeStyle: 'short',
		});

		return formattedDate;
	}, [orderData]);

	const loadOrderData = () => {
		orderByIdService(orderId, token)
			.then((result) => {
				result.json().then((data) => {
					if (result.ok) {
						setOrderData(data.result);
					}
				});
			})
			.catch()
			.finally(() => {
				setOrderDataLoading(false);
			});
	};

	useEffect(() => {
		loadOrderData();
	}, []);
	return (
		<Container>
			{orderData && (
				<>
					<SuccessIcon>&#10003;</SuccessIcon>
					<Message>Your order was successful!</Message>
					<OrderDetails>
						<Description>
							Thank you for your order. Your food will be delivered shortly.
						</Description>
						<StyledText>
							Food: <StyledSubText>{orderData.food.name}</StyledSubText>
						</StyledText>
						<StyledText>
							Total Price: <StyledSubText>${orderData.total}</StyledSubText>
						</StyledText>
						<StyledText>
							Ordered On: <StyledSubText>{parsedDateTime}</StyledSubText>
						</StyledText>
						<BackButton to='/foods'>View Listed Foods</BackButton>
					</OrderDetails>
				</>
			)}
			{(orderDataLoading || !orderData) && (
				<LoadingContainer>
					{orderDataLoading && <LoadingSpinner />}
					{!orderDataLoading && !orderData && (
						<EmptyErrorContainer>
							<EmptyErrorTitle>Oops!</EmptyErrorTitle>
							<EmptyError>
								Could not found any record with this data.
							</EmptyError>
							<ErrorActionsContainer>
								<BackButton to='/foods'>View Listed Foods</BackButton>
							</ErrorActionsContainer>
						</EmptyErrorContainer>
					)}
				</LoadingContainer>
			)}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 63px);
	background-color: #f8f9fa;
`;

const SuccessIcon = styled.div`
	font-size: 36px;
	color: #fff;
	margin-bottom: 20px;
	background-color: green;
	border-radius: 100%;
	width: 70px;
	height: 70px;
	text-align: center;
	line-height: 70px;
`;

const StyledText = styled.p`
	font-size: 14px;
	margin: 8px 0;
`;
const StyledSubText = styled.span`
	font-weight: bold;
`;

const Message = styled.p`
	text-align: center;
	margin: 0;
	font-weight: bold;
`;

const Description = styled(StyledText)`
	margin-bottom: 24px;
	margin-top: 8px;
`;

const OrderDetails = styled.div`
	text-align: center;
	font-size: 16px;
	max-width: 260px;
`;
const BackButton = styled(Link)`
	font-size: 16px;
	color: #4caf50;
	border: 1px solid #4caf50;
	padding: 4px 8px;
	display: inline-block;
	margin-top: 8px;
	text-decoration: none;
	border-radius: 4px;
`;
const LoadingContainer = styled.div`
	margin: auto;
`;
const EmptyErrorContainer = styled.div``;
const EmptyErrorTitle = styled.h2`
	font-size: 3rem;
	color: #e74c3c;
	margin-bottom: 10px;
	text-align: center;
`;
const EmptyError = styled.p``;
const ErrorActionsContainer = styled.div`
	text-align: center;
`;
const ErrorBackActions = styled.button`
	background-color: transparent;
	color: #4caf50;
	font-size: 14px;
	font-weight: bold;
	border: 1px solid #4caf50;
	border-radius: 3px;
	padding: 4px 10px;
	cursor: pointer;
`;

export default ConfirmationOrder;
