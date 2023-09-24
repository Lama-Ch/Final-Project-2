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
        <Image src = "/assets/images/fresh-cinnamon-roll-detail-shot.jpeg" alt = "Background"/>
      <HeaderBackLink onClick={onGoBack}>← Back</HeaderBackLink>
      {foodDataLoading ? (
        <LoadingSpinner />
      ) : foodData ? (
        <FoodItem>
          {/* <FoodImage src={foodData.image} alt={foodData.name} /> */}
          <FoodName>
            {foodData.name}
            {foodData.isVegetarian && foodData.foodType === 'meal' && (
              <VeganBadge>Vegan Friendly</VeganBadge>
            )}
          </FoodName>
          <Label>Posted By: {foodData.postedBy?.fullname}</Label>
          <Label>Posted On: {parsedDateTime}</Label>
          <FoodDescription>{foodData.description}</FoodDescription>
          <OrderButtonContainer>
            <FoodPrice>Price: ${foodData.price}</FoodPrice>
            {foodData.isAvailable ? (
              <OrderButton to={`/order/${foodData._id}`}>Order Now</OrderButton>
            ) : (
              <SoldOutBadge>Sold Out</SoldOutBadge>
            )}
          </OrderButtonContainer>
          
        </FoodItem>
      ) : (
        <EmptyErrorContainer>
          <EmptyErrorTitle>Oops!</EmptyErrorTitle>
          <EmptyError>Could not find any record with this data.</EmptyError>
          <ErrorActionsContainer>
            <ErrorBackActions onClick={onGoBack}>Go Back</ErrorBackActions>
            <ErrorRetryActions onClick={loadFoodData}>Retry</ErrorRetryActions>
          </ErrorActionsContainer>
        </EmptyErrorContainer>
      )}
   
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative; /* Required for the absolute positioning of the background image */
  padding: 2rem;
  max-width: 500px;
`;

const HeaderBackLink = styled.button`
  background-color: transparent;
  border: 0;
  color: #4caf50;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 230%;
  height: 200%;
  object-fit: cover;
  z-index: -1; /* Place the background image behind other content */
  opacity: 0.8;
`;

const FoodItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  overflow: hidden;
`;

const FoodImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

const FoodName = styled.h2`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VeganBadge = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 10px;
  line-height: 1;
  border: 1px solid #4caf50;
  color: #4caf50;
  white-space: nowrap;
`;

const FoodDescription = styled.p`
  margin: 8px 0;
  font-size: 16px;
`;

const FoodPrice = styled.p`
  margin: 4px 0;
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
`;

const Label = styled.p`
  font-size: 14px;
  color: #595959;
  margin: 4px 5px;
`;

const OrderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Space out the items horizontally */
  align-items: center; /* Align items vertically */
  margin-top: 20px; /* Add some top margin for spacing */
`;

const OrderButton = styled(Link)`
  background-color: #4caf50;
  border: none;
  padding: 7px 16px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
`;

const SoldOutBadge = styled.p`
  margin: 0;
  background-color: #f35050;
  color: #fff;
  font-size: 14px;
  padding: 4px 12px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: -18px;
  transform: rotate(45deg);
`;

const EmptyErrorContainer = styled.div`
  text-align: center;
`;

const EmptyErrorTitle = styled.h2`
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 10px;
  text-align: center;
`;

const EmptyError = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const ErrorActionsContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ErrorBackActions = styled.button`
  background-color: transparent;
  color: #4caf50;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #4caf50;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
`;

const ErrorRetryActions = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: #4caf50;
  padding: 8px 20px;
  border: 1px solid #4caf50;
  color: #fff;
  cursor: pointer;
`;

export default FoodDetail;