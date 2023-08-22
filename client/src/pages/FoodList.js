import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { listedMealsService } from '../apis/foodsApi';

const FoodList = () => {
	const { token } = useAuth();

	const [mealsList, setMealsList] = useState([]);
	const [mealsLoading, setMealsLoading] = useState(true);
	const [drinksList, setDrinksList] = useState([]);
	const [drinksLoading, setDrinksLoading] = useState(true);

	const loadMeals = () => {
		listedMealsService('meal', token)
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

	const loadDrinks = () => {
		listedMealsService('drink', token)
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
// refreshed with every token
	useEffect(() => {
		loadMeals();
		loadDrinks();
	}, [token]);

	return (
		<StyledContainer>
			<StyledDiv>
				<StyledSectionTitle>Meals</StyledSectionTitle>
				<ListContainer>
					{mealsList.map((food) => (
						<FoodCard key={food._id} {...food} />
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
				<StyledSectionTitle>Drinks</StyledSectionTitle>
				<ListContainer>
					{drinksList.map((food) => (
						<FoodCard key={food._id} {...food} />
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
const StyledSectionTitle = styled.h1`
	font-size: 24px;
	margin-bottom: 0.5rem;
	border-bottom: 1px solid #e9e9e9;
`;
const LoadingContainer = styled.div`
	margin: auto;
`;
const EmptyListError = styled.p``;
const ListContainer = styled.div`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	padding: 1rem 0;
`;

export default FoodList;
