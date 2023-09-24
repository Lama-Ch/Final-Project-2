import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import UnauthorizedError from '../components/UnauthorizedError';
import { useAuth } from '../context/AuthContext';
import { addFoodsService, myPostedFoodsService } from '../apis/foodsApi';
import ErrorMessage from '../components/forms/FormError';
import FormSuccess from '../components/forms/FormSuccess';

const AddNewFood = () => {
	const { token } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// Pre-select the food type passed from the previous page in query params
	const params = new URLSearchParams(location.search);
	const selectedFoodType = params.get('foodType');

	// Form Fields
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [foodType, setFoodType] = useState(selectedFoodType || 'meal');
	const [isVegetarian, setIsVegetarian] = useState(false);

	const [isFormSubmitting, setIsFormSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [apiSuccessMessage, setApiSuccessMessage] = useState('');

	const onGoBack = () => {
		navigate(-1);
	};

	const onFieldChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const onCheckBoxChange = (event) => {
		setIsVegetarian(event.target.checked);
	};

	const validateFields = () => {
		let validationError = null;
		if (!name) {
			validationError = 'Food name is mandatory.';
		} else if (!description) {
			validationError = 'Food short description is mandatory.';
		} 
		else if (!price) {
			validationError = 'Price is mandatory.';
		}
		return validationError;
	};

	const addFood = () => {
		const foodData = { name, description, price, isVegetarian, foodType };
		addFoodsService(foodData, token)
			.then((result) => {
				if (result.ok) {
					result
						.json()
						.then((data) => {
							setApiSuccessMessage(data.message);
							// Reset input fields
							setName('');
							setDescription('');
							setPrice('');
						})
						.catch((err) => {
							console.error('FAILED', err);
							setErrorMessage(err.error);
						});
				}
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
		setApiSuccessMessage('');
		// Validate form values
		// If not valid, then terminate the submission
		const errors = validateFields();

		if (errors) {
			setIsFormSubmitting(false);
			setErrorMessage(errors);
			return;
		}
		addFood();
	};

	if (!token) {
		return <UnauthorizedError />;
	} else {
		return (
			<StyledContainer>
				<SectionHeader>
					<HeaderBackLink onClick={onGoBack}>Go Back</HeaderBackLink>
					<StyledSectionTitle>Add New Food</StyledSectionTitle>
				</SectionHeader>
				{/* ADD FORM HERE */}
				<FormContainer>
					<FormGroup>
						<Label htmlFor='name'>Food Name</Label>
						<Input
							type='text'
							id='name'
							value={name}
							placeholder='Enter food name'
							onChange={onFieldChange(setName)}
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor='price'> DELIVERY FEE</Label>
						<Input
							type='number'
							id='price'
							min={1}
							value={price}
							placeholder='delivery fee'
							onChange={onFieldChange(setPrice)}
						/>
					</FormGroup>

					<RadioGroup>
						<RadioOption>
							<Checkbox
								type='radio'
								name='foodType'
								value='meal'
								id='foodType_meal'
								checked={foodType === 'meal'}
								onChange={onFieldChange(setFoodType)}
							/>
							<Label htmlFor='foodType_meal'>Meal</Label>
						</RadioOption>
						<RadioOption>
							<Checkbox
								type='radio'
								name='foodType'
								value='drink'
								id='foodType_drink'
								checked={foodType === 'drink'}
								onChange={onFieldChange(setFoodType)}
							/>
							<Label htmlFor='foodType_drink'>Drink</Label>
						</RadioOption>
					</RadioGroup>

					<CheckboxGroup>
						<Checkbox
							type='checkbox'
							id='isVegetarian'
							onChange={onCheckBoxChange}
						/>
						<Label htmlFor='isVegetarian'>Vegetarian Friendly</Label>
					</CheckboxGroup>

					<FormGroup>
						<Label htmlFor='description'>Description</Label>
						<TextArea
							type='text'
							id='description'
							placeholder='Provide short description about the food.'
							value={description}
							rows={10}
							onChange={onFieldChange(setDescription)}
						/>
					</FormGroup>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
					{apiSuccessMessage && <FormSuccess>{apiSuccessMessage}</FormSuccess>}
					<SubmitButton
						type='button'
						disabled={isFormSubmitting}
						onClick={onSubmitForm}
					>
						{isFormSubmitting ? 'Submitting...' : 'Submit'}
					</SubmitButton>
				</FormContainer>
			</StyledContainer>
		);
	}
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

// FORM STYLINGS
const FormContainer = styled.form`
	padding: 10px 40px;
	max-width: 300px;
	margin: 0 auto;
`;

const FormGroup = styled.div`
	margin-bottom: 24px;
`;
const Label = styled.label`
	font-size: 12px;
	font-weight: bold;
	display: block;
	margin-bottom: 4px;
	opacity: 0.7;
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
const CheckboxGroup = styled.div`
	margin-bottom: 24px;
	display: flex;
`;
const Checkbox = styled.input`
	margin-top: 0;
`;

const RadioGroup = styled.div`
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
`;
const RadioOption = styled.div`
	margin-bottom: 4px;
	display: flex;
`;
const TextArea = styled.textarea`
	width: calc(100% - 20px);
	padding: 10px;
	font-size: 14px;
	border: 2px solid #ccc;
	border-radius: 5px;
	resize: none;
	font-family: sans-serif;
	&:hover {
		background-color: #d3d3d3;
		opacity: 0.7;
	}
`;

const SubmitButton = styled.button`
	border: none;
	padding: 10px 30px;
	border-radius: 5px;
	width: 100%;
	color: #fff;
	font-size: 14px;
	font-weight: bold;
	background-color: #4caf50;
	transition: background-color 0.3s;
	cursor: pointer;
	&:disabled {
		opacity: 0.8;
	}
`;

export default AddNewFood;