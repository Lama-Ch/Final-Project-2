import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
	const { user, logout } = useAuth();

	return (
		<NavbarWrapper>
			<NavLink to='/'>
				<LogoImage src='/assets/images/applogo.png' alt='Logo' />
			</NavLink>
			<NavigationLeft>
				<NavItem to='/foods'>Foods List</NavItem>
				<NavItem to='/my-listing'>My Posts</NavItem>
			</NavigationLeft>

			<NavigationRight>
				{user ? (
					<>
						<LoggedInUserName>Hi, {user.fullname}</LoggedInUserName>
						<LogoutButton onClick={logout}>Logout</LogoutButton>
					</>
				) : (
					<NavItem to='/signin'>Sign In</NavItem>
				)}
				<NavItem to='/contactus'>Contact Us</NavItem>
			</NavigationRight>
		</NavbarWrapper>
	);
};

const NavbarWrapper = styled.div`
	opacity: 0.8;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0 0px; /* Adjusted padding */
	text-transform: uppercase;
`;

const NavigationBar = styled.div`
	display: flex;
	align-items: center;
`;

const NavigationLeft = styled(NavigationBar)`
	margin-right: auto;
	margin-left: 20px;
`;
const LogoImage = styled.img`
	width: 170px;
	height: 60px;
	object-fit: cover;
`;

const NavigationRight = styled(NavigationBar)`
	margin-left: auto;
	margin-right: 20px;
`;

const NavItem = styled(NavLink)`
	font-size: 14px; /* Slightly smaller font size */
	color: black;
	text-decoration: none;
	margin-left: 30px; /* Reduced margin */
	transition: color 0.3s, transform 0.3s;
	&.active {
		text-decoration: underline;
		color: #4caf50;
		font-weight: bold;
	}
	&:hover {
		text-decoration: underline;
		transform: translateY(-2px) scale(1.1);
	}
`;
const LoggedInUserName = styled.p`
	font-size: 14px;
`;
const LogoutButton = styled.button`
	background-color: transparent;
	border: 0;
	text-decoration: none;
	text-transform: unset;
	font-size: 14px; /* Slightly smaller font size */
	color: black;
	text-decoration: none;
	margin-left: 30px; /* Reduced margin */
	transition: color 0.3s, transform 0.3s;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
		transform: translateY(-2px) scale(1.1);
	}
`;

export default NavBar;
