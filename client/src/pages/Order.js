import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import UnauthorizedError from '../components/UnauthorizedError';
import { foodByIdService } from '../apis/foodsApi';
import LoadingSpinner from '../components/Loader';
import { EMAILREGEX } from '../utils/constants';
import ErrorMessage from '../components/forms/FormError';
import { createOrderService } from '../apis/ordersApi';

const Order = () => {
	const { token, user } = useAuth();
	const navigate = useNavigate();
	const { foodId } = useParams();

	const [foodData, setFoodData] = useState(null);
	const [foodDataLoading, setFoodDataLoading] = useState(true);

	// Form Inputs
	const [fullname, setFullname] = useState(user?.fullname);
	const [email, setEmail] = useState(user?.email);
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');

	const [isFormSubmitting, setIsFormSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const onFieldChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const validateFields = () => {
		let validationError = null;
		if (!fullname) {
			validationError = 'Full name is mandatory.';
		} else if (!email || !EMAILREGEX.test(email)) {
			validationError = 'Please provide a valid email.';
		} else if (!address1) {
			validationError = 'Please provide level 1 address.';
		}
		return validationError;
	};

	const createOrder = () => {
		const orderData = {
			fullname,
			email,
			address1,
			address2,
			total: foodData.price,
			food: foodData._id,
		};
		createOrderService(orderData, token)
			.then((result) => {
				result
					.json()
					.then((data) => {
						// Navigate to the Order Confirmation Page
						if (result.ok) {
							navigate(`/confirmation/${data.orderId}`);
						} else {
							setErrorMessage(data.error);
						}
					})
					.catch((err) => {
						console.error('FAILED', err);
						setErrorMessage(err.error);
					});
			})
			.catch((error) => {
				console.error('ERROR:', error);
				setErrorMessage(error.message || 'Failed to add posting, please retry');
			})
			.finally(() => {
				setIsFormSubmitting(false);
			});
	};

	const onSubmitForm = () => {
		setIsFormSubmitting(true);
		setErrorMessage('');
		// Validate form values
		// If not valid, then terminate the submission
		const errors = validateFields();

		if (errors) {
			setIsFormSubmitting(false);
			setErrorMessage(errors);
			return;
		}

		// Call the respective service function and process result
		createOrder();
	};

	const loadFoodData = () => {
		foodByIdService(foodId, token)
			.then((result) => {
				if (result.ok) {
					result
						.json()
						.then((data) => {
							setFoodData(data.result);
						})
						.catch();
				}
			})
			.catch()
			.finally(() => {
				setFoodDataLoading(false);
			});
	};

	const onGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (token) {
			loadFoodData();
		}
	}, []);

	if (!token) {
		return <UnauthorizedError />;
	} else {
		return (
			<>
				{foodData && (
					<StyledContainer>
						<PageHeader>
							<PageHeaderTitle>Order Food</PageHeaderTitle>
							<PageSubtitle>Fill up the form and submit to order.</PageSubtitle>
						</PageHeader>
						<FormContainer>
							<SmallInput
								name='fullname'
								placeholder='Full Name'
								value={fullname}
								onChange={onFieldChange(setFullname)}
							/>
							<SmallInput
								name='email'
								type='email'
								placeholder='Email'
								value={email}
								onChange={onFieldChange(setEmail)}
							/>
							<Input
								name='address1'
								placeholder='Line 1 Address'
								value={address1}
								onChange={onFieldChange(setAddress1)}
							/>
							<Input
								name='address2'
								placeholder='Line 2 Address'
								value={address2}
								onChange={onFieldChange(setAddress2)}
							/>
							{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
						</FormContainer>
						<OrderSummary>
							<SummarySectionTitle>Order Summary</SummarySectionTitle>
							<OrderItem>
								<StyledText>{foodData.name}</StyledText>
								<StyledText>${foodData.price}</StyledText>
							</OrderItem>
							<Seperator />
							<OrderItem>
								<StyledText>Total</StyledText>
								<StyledText>${foodData.price}</StyledText>
							</OrderItem>
							<OrderButton onClick={onSubmitForm}>
								{isFormSubmitting ? 'Submitting...' : 'Place Order'}
							</OrderButton>
						</OrderSummary>
					</StyledContainer>
				)}
				{(foodDataLoading || !foodData) && (
					<LoadingContainer>
						{foodDataLoading && <LoadingSpinner />}
						{!foodDataLoading && !foodData && (
							<EmptyErrorContainer>
								<EmptyErrorTitle>Oops!</EmptyErrorTitle>
								<EmptyError>
									Could not found any record with this data.
								</EmptyError>
								<ErrorActionsContainer>
									<ErrorBackActions onClick={onGoBack}>
										Go Back
									</ErrorBackActions>
								</ErrorActionsContainer>
							</EmptyErrorContainer>
						)}
					</LoadingContainer>
				)}
			</>
		);
	}
};

const StyledText = styled.p`
	margin: 0;
`;

const StyledContainer = styled.div`
	padding: 1rem;
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
`;
const FormContainer = styled.div`
	display: flex;
	flex-grow: 1;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 8px;
	width: calc(100% - 300px);
`;
const PageHeader = styled.div`
	width: 100%;
`;
const PageHeaderTitle = styled.h3`
	margin: 0;
`;
const PageSubtitle = styled.p``;

const OrderSummary = styled.div`
	padding: 16px;
	border: 1px solid #ccc;
	border-radius: 8px;
	width: 250px;
	height: fit-content;
`;

const SummarySectionTitle = styled.p`
	margin: 0;
	font-size: 12px;
	color: #979797;
	border-bottom: 1px solid #e9e9e9;
	padding-bottom: 2px;
`;
const OrderItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	font-weight: bold;
	margin: 16px 0;
`;
const OrderButton = styled.button`
	background-color: #4caf50;
	border: none;
	color: #fff;
	font-size: 14px;
	font-weight: bold;
	width: 100%;
	padding: 8px 8px;
	text-transform: uppercase;
	border-radius: 4px;
	cursor: pointer;
`;
const Seperator = styled.div`
	border-bottom: 1px solid #e9e9e9;
`;
const Input = styled.input`
	width: calc(100% - 20px);
	padding: 10px;
	font-size: 14px;
	border: 2px solid #ccc;
	border-radius: 5px;
	&:hover {
		background-color: #d3d3d3;
		opacity: 0.7;
	}
`;
const SmallInput = styled(Input)`
	width: calc(50% - 28px);
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 16px;
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

const Dummy = styled.div``;

export default Order;
