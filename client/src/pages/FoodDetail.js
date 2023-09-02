import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { foodByIdService } from '../apis/foodsApi';

const FoodDetail = () => {
	const { token } = useAuth();
	const navigate = useNavigate();
	const { foodId } = useParams();

	const [foodData, setFoodData] = useState(null);
	const [foodDataLoading, setFoodDataLoading] = useState(true);

	const onGoBack = () => {
		navigate(-1);
	};

	const parsedDateTime = useMemo(() => {
		if (!foodData) {
			return null;
		}
		const dateTime = new Date(foodData.createdAt);

		const formattedDate = dateTime.toLocaleString('en-CA', {
			dateStyle: 'medium',
			timeStyle: 'short',
		});

		return formattedDate;
	}, [foodData]);

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

	useEffect(() => {
		loadFoodData();
	}, []);

	return (
		<StyledContainer>
			<SectionHeader>
				<HeaderBackLink onClick={onGoBack}>Go Back</HeaderBackLink>
				<StyledSectionTitle>Food Detail</StyledSectionTitle>
			</SectionHeader>
			{foodData && (
				<FoodItem>
					<FoodName>
						{foodData.name}
						{foodData.isVegetarian && foodData.foodType === 'meal' && (
							<VeganBadge>Vegan Friendly</VeganBadge>
						)}
					</FoodName>
					<Label>
						Posted By: <span>{foodData.postedBy?.fullname}</span>
					</Label>
					<Label>
						Posted On: <span>{parsedDateTime}</span>
					</Label>
					<FoodDescription>{foodData.description}</FoodDescription>
					{/* <FoodPrice>Price: ${foodData.price}</FoodPrice> */}
					<ActionButtonContainer>
						{foodData.isAvailable && !foodData.isSelfPost && (
							<OrderButton to={`/order/${foodData._id}`}>Order Now</OrderButton>
						)}
					</ActionButtonContainer>
					{!foodData.isAvailable && <SoldOutBadge>Sold Out</SoldOutBadge>}
				</FoodItem>
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
								<ErrorBackActions onClick={onGoBack}>Go Back</ErrorBackActions>
								<ErrorRetryActions onClick={loadFoodData}>
									Retry
								</ErrorRetryActions>
							</ErrorActionsContainer>
						</EmptyErrorContainer>
					)}
				</LoadingContainer>
			)}
		</StyledContainer>
	);
};

const StyledContainer = styled.div`
	padding: 1rem;
`;
const SectionHeader = styled.div`
	border-bottom: 1px solid #e9e9e9;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	display: flex;
	align-items: center;
	gap: 8px;
`;
const StyledSectionTitle = styled.h1`
	font-size: 24px;
	margin: 0;
`;
const HeaderBackLink = styled.button`
	background-color: transparent;
	border: 0;
	color: #4caf50;
	font-size: 14px;
	font-weight: bold;
	cursor: pointer;
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
const ErrorRetryActions = styled.button`
	font-size: 14px;
	font-weight: bold;
	background-color: #4caf50;
	padding: 4px 30px;
	margin-left: 5px;
	border: 1px solid #4caf50;
	color: #fff;
	cursor: pointer;
`;

const FoodItem = styled.div`
	padding: 16px;
	border: 1px solid #ccc;
	border-radius: 8px;
	position: relative;
	overflow: hidden;
`;

const FoodName = styled.h3`
	margin-top: 0;
	margin-bottom: 10px;
	font-size: 16px;
	display: flex;
	align-items: center;
	gap: 4px;
`;

const VeganBadge = styled.span`
	font-size: 10px;
	padding: 4px 8px;
	border-radius: 10px;
	line-height: 1;
	border: 1px solid #4caf50;
	color: #4caf50;
	white-space: nowrap;
`;

const FoodDescription = styled.p`
	margin: 8px 0;
	font-size: 14px;
`;

const FoodPrice = styled.p`
	margin: 4px 0;
`;

const Label = styled.p`
	font-size: 12px;
	color: #595959;
	margin: 4px 0;
`;

const ActionButtonContainer = styled.div`
	margin-top: 10px;
	font-size: 12px;
	font-weight: bold;
	text-transform: uppercase;
`;

const OrderButton = styled(Link)`
	background-color: #4caf50;
	border: 1px solid #4caf50;
	padding: 4px 8px;
	color: #fff;
	cursor: pointer;
	text-decoration: none;
`;

const SoldOutBadge = styled.p`
	margin: 0;
	background-color: #f35050;
	color: #fff;
	font-size: 10px;
	padding: 4px 24px;
	font-weight: bold;
	position: absolute;
	top: 14px;
	right: -27px;
	transform: rotate(45deg);
	overflow: hidden;
`;

export default FoodDetail;
