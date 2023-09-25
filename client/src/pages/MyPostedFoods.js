import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import UnauthorizedError from '../components/UnauthorizedError';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Loader';
import FoodCard from '../components/FoodCard';
import { myPostedFoodsService } from '../apis/foodsApi';
import { Link } from 'react-router-dom';

const MyPostedFoods = () => {
	const { token } = useAuth();

	const [mealsList, setMealsList] = useState([]);
	const [mealsLoading, setMealsLoading] = useState(true);
	const [drinksList, setDrinksList] = useState([]);
	const [drinksLoading, setDrinksLoading] = useState(true);

	const loadMyPostMeals = () => {
		myPostedFoodsService('meal', token)
			.then((result) => {
				if (result.ok) {
					result
						.json()
						.then((data) => {
							setMealsList(data.result);
						})
						.catch();
				}
			})
			.catch()
			.finally(() => {
				setMealsLoading(false);
			});
	};

	const loadMyPostedDrinks = () => {
		myPostedFoodsService('drink', token)
			.then((result) => {
				if (result.ok) {
					result
						.json()
						.then((data) => {
							setDrinksList(data.result);
						})
						.catch();
				}
			})
			.catch()
			.finally(() => {
				setDrinksLoading(false);
			});
	};

	useEffect(() => {
		if (token) {
			// Fetch the data
			loadMyPostMeals();
			loadMyPostedDrinks();
		}
	}, [token]);

	return !token ? (
		<UnauthorizedError />
	) : (
		<StyledContainer>
			<StyledDiv>
				<SectionHeader>
					<StyledSectionTitle>Meals</StyledSectionTitle>
					<AddFoodLink to='/add-food?foodType=meal'>Add New</AddFoodLink>
				</SectionHeader>
				<ListContainer>
					{mealsList.map((food) => (
						<FoodCard
							key={food._id}
							{...food}
							hideOrderAction={true}
							hideUser={true}
						/>
					))}

					{(mealsLoading || mealsList.length == 0) && (
						<LoadingContainer>
							{mealsLoading && <LoadingSpinner />}
							{!mealsLoading && mealsList.length == 0 && (
								<EmptyListError>
									No Food available for now, please visit later.
								</EmptyListError>
							)}
						</LoadingContainer>
					)}
				</ListContainer>
			</StyledDiv>
			<StyledDiv>
				<SectionHeader>
					<StyledSectionTitle>Drinks</StyledSectionTitle>
					<AddFoodLink to='/add-food?foodType=drink'>Add New</AddFoodLink>
				</SectionHeader>
				<ListContainer>
					{drinksList.map((food, index) => (
						<FoodCard
							key={index}
							{...food}
							hideOrderAction={true}
							hideUser={true}
						/>
					))}

					{(drinksLoading || drinksList.length == 0) && (
						<LoadingContainer>
							{drinksLoading && <LoadingSpinner />}
							{!drinksLoading && drinksList.length === 0 && (
								<EmptyListError>
									No Food available for now, please visit later.
								</EmptyListError>
							)}
						</LoadingContainer>
					)}
				</ListContainer>
			</StyledDiv>
		</StyledContainer>
	);
};

const StyledDiv = styled.div``;
const StyledContainer = styled.div`
	padding: 1rem;
`;

const SectionHeader = styled.div`
 border-bottom: 1px solid #e9e9e9;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
const StyledSectionTitle = styled.h1`
	font-size: 24px;
	margin: 0;
`;
const AddFoodLink = styled(Link)`
	color: #4caf50;
	font-size: 14px;
	font-weight: bold;
`;
const LoadingContainer = styled.div`
	margin: auto;
`;
const EmptyListError = styled.p`
text-align: center;
`;
const ListContainer = styled.div`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	padding: 1rem 0;
`;

export default MyPostedFoods;
