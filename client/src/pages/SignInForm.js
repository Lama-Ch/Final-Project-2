import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ErrorMessage from '../components/forms/FormError';
import FormSuccess from '../components/forms/FormSuccess';
import { signUpService, singInService } from '../apis/authApi';
import { useAuth } from '../context/AuthContext';
import { EMAILREGEX } from '../utils/constants';
import { saveAuthToken } from '../utils/localStorage';
const SignInForm = () => {
	// Use the useAuth hook to save user login state in context
	const { setUserLoggedIn } = useAuth();
	const navigate = useNavigate();

	const [isSignUp, setIsSignUp] = useState(false);

	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isFormSubmitting, setIsFormSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [apiSuccessMessage, setApiSuccessMessage] = useState('');

	// Reset values and errors when form is toggled between signin and signup
	const resetValuesAndErrors = () => {
		setUsername('');
		setFullname('');
		setEmail('');
		setPassword('');
		setErrorMessage('');
		setApiSuccessMessage('');
	};

	const onFieldChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const toggleMode = () => {
		setIsSignUp(!isSignUp);
		resetValuesAndErrors();
	};

	const validateFields = () => {
		let validationError = null;
		if (!fullname && isSignUp) {
			validationError = 'Full name is mandatory.';
		} else if (isSignUp && (!email || !EMAILREGEX.test(email))) {
			validationError = 'Please provide a valid email.';
		} else if (!username) {
			validationError = 'Username is mandatory.';
		} else if (!password) {
			validationError = 'Password is mandatory.';
		}
		return validationError;
	};

	const onProcessSingupSubmit = () => {
		signUpService({ username, fullname, email, password })
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						setApiSuccessMessage('Registered successfully!', data.message);
					});
				} else {
					response.json().then((errorData) => {
						console.error('Singup failed::', errorData);
						setErrorMessage(errorData.error);
					});
				}
			})
			.catch((error) => {
				console.error('Singup error::', error);
				setErrorMessage('There was an erro with your request.');
			})
			.finally(() => {
				// Stop the loader function when done,
				// and re-enable the submit button
				setIsFormSubmitting(false);
			});
	};

	const onProcessSignInSubmit = () => {
		singInService({ username, password })
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						console.log('User Success::', data);
						// Save the access token locally and return to home page back
						setUserLoggedIn(data.user, data.token);
						saveAuthToken(data.token);	
						navigate('/');
					});
				} else {
					response.json().then((errorData) => {
						console.error('Signin failed::', errorData);
						setIsFormSubmitting(false);
						setErrorMessage(errorData.error);
					});
				}
			})
			.catch((error) => {
				console.error('Signin Error::', error);
				setIsFormSubmitting(false);
				setErrorMessage('There was an erro with your singin request.');

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
		if (isSignUp) {
			onProcessSingupSubmit();
		} else {
			onProcessSignInSubmit();
		}
	};

	return (
		<div className=''>
			<FormContainer>
				<FormTitle>{isSignUp ? 'Sign Up' : 'Log In'}</FormTitle>
				<FormGroup>
					<Label htmlFor='username'>Username</Label>
					<Input
						type='text'
						id='username'
						value={username}
						placeholder='Enter your username'
						onChange={onFieldChange(setUsername)}
					/>
				</FormGroup>
				{isSignUp && (
					<>
						<FormGroup>
							<Label htmlFor='fullname'>Full Name</Label>
							<Input
								type='text'
								id='fullname'
								value={fullname}
								placeholder='Enter your full name'
								onChange={onFieldChange(setFullname)}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor='email'>Email</Label>
							<Input
								type='email'
								id='email'
								value={email}
								placeholder='Enter your email'
								onChange={onFieldChange(setEmail)}
							/>
						</FormGroup>
					</>
				)}
				<FormGroup>
					<Label htmlFor='password'>Password</Label>
					<Input
						type='password'
						id='password'
						value={password}
						placeholder='Enter your password'
						onChange={onFieldChange(setPassword)}
					/>
				</FormGroup>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				{apiSuccessMessage && <FormSuccess>{apiSuccessMessage}</FormSuccess>}
				<SubmitButton
					type='button'
					disabled={isFormSubmitting}
					onClick={onSubmitForm}
				>
					{isFormSubmitting
						? 'Submitting...'
						: isSignUp
						? 'Sign Up'
						: 'Sign In'}
				</SubmitButton>
				<ModeToggle onClick={toggleMode}>
					{isSignUp ? 'Already have an account? ' : 'New user? '}
					<LoginText>{isSignUp ? 'Sign In' : 'Sign Up'}</LoginText>
				</ModeToggle>
			</FormContainer>
		</div>
	);
};

const FormContainer = styled.form`
 max-width: 300px;
 font-weight:bold;
	background-color: #e9f9d8;
	padding: 40px;
	border-radius: 20px;
	box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	height: 58vh;
	display: flex;
	flex-direction: column;
`;
const FormTitle = styled.h2`

	font-size: 30px;
	margin-top: 0;
	margin-bottom: 24px;
	text-align: center;
`;

const FormGroup = styled.div`
	margin-bottom: 24px;
	
`;

const ModeToggle = styled.p`
	font-size: 14px;
	
	color: #888;
	text-align: center;
	cursor: pointer;
	margin-top: 10px;
`;
const Label = styled.label`
	font-size: 12px;
	display: block;
	margin-bottom: 4px;
	opacity: 0.7;
`;
const LoginText = styled.span`
	position: relative;
	display: inline-block;
	color: black;
	&:hover {
		color: #4caf50;
	}

	&:hover::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: #4caf50;
		bottom: -5px;
		left: 0;
		transform-origin: center;
		transform: scaleX(1);
		transition: transform 0.3s ease-in-out;
	}

	&:hover::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.1);
		top: 0;
		left: 0;
		transform: perspective(500px) rotateX(30deg);
		transform-origin: top;
		opacity: 0.5;
		transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
	}
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

export default SignInForm;
