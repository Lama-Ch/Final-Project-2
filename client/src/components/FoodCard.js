import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SERVER_URL } from '../utils/constants';

const FoodCard = ({
	_id,
	name,
	image,
	isVegetarian,
	foodType,
	postedBy,
	createdAt,
	description,
	isAvailable,
	hideOrderAction,
	price,
	hideUser,
	
}) => {
	//to format the creation date and time
	const parsedDateTime = useMemo(() => {
		const dateTime = new Date(createdAt);

		const formattedDate = dateTime.toLocaleString('en-CA', {
			dateStyle: 'medium',
			timeStyle: 'short',
		});

		return formattedDate;
	}, [createdAt]);
	return (

		<FoodItem>
			{image &&<FoodImage src={`${SERVER_URL}/${image}`} />}
			<FoodName>
				<FoodTitle>{name} </FoodTitle>
				{isVegetarian && foodType === 'meal' && (
					<VeganBadge>Vegan Friendly</VeganBadge>
				)}
			</FoodName>
			{!hideUser && (
				<Label>
					Posted By: <span>{postedBy?.fullname}</span>
				</Label>
			)}
			<Label>
				Posted On: <span>{parsedDateTime}</span>
			</Label>
			<FoodDescription>{description}</FoodDescription>
			<FoodPrice>Price: ${price}</FoodPrice>
			<ActionButtonContainer>
				<DetailButton to={`/foods/detail/${_id}`}>View Detail</DetailButton>
				{isAvailable && !hideOrderAction && (
					<OrderButton to={`/order/${_id}`}>Order Now</OrderButton>
				)}
			</ActionButtonContainer>
			{!isAvailable && <SoldOutBadge> NOT AVALABLE</SoldOutBadge>}
		</FoodItem>
	);
};
const BackgroundImage = styled.div`
  background-size: cover;
  background-position: center;
  height: 150px; /* Adjust the height as needed */
`;

const FoodImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const FoodItem = styled.div`
	padding: 16px;
	border: 1px solid #ccc;
	border-radius: 8px;
	position: relative;
	overflow: hidden;
	max-width: 230px;
`;

const FoodName = styled.h3`
color:black;
	margin-top: 0;
	margin-bottom: 10px;
	font-size: 16px;
	display: flex;
	align-items: center;
	gap: 4px;
`;

const FoodTitle = styled.span`
	white-space: nowrap;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
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
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
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
const DetailButton = styled(Link)`
	background-color: transparent;
	border: 1px solid #4caf50;
	padding: 4px 8px;
	color: #4caf50;
	cursor: pointer;
	text-decoration: none;
	margin-right: 10px;
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
	padding: 6px 34px;
	font-weight: bold;
	position: absolute;
	top: 24px;
	right: -27px;
	transform: rotate(45deg);
	overflow: hidden;
`;

export default FoodCard;
