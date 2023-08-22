import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import FoodList from './pages/FoodList';
import FoodDetail from './pages/FoodDetail';
import MyPostedFoods from './pages/MyPostedFoods';
import AddNewFood from './pages/AddNewFood';
import Order from './pages/Order';
import ConfirmationOrder from './pages/ConfirmationOrder';
import SignInForm from './pages/SignInForm';
import PageNotFound from './pages/PageNotFound';

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<NavBar />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/foods' element={<FoodList />} />
					<Route path='/foods/detail/:foodId' element={<FoodDetail />} />
					<Route path='/my-listing' element={<MyPostedFoods />} />
					<Route path='/add-food' element={<AddNewFood />} />
					<Route path='/order/:foodId' element={<Order />} />
					<Route
						path='/confirmation/:orderId'
						element={<ConfirmationOrder />}
					/>
					<Route path='/signin' element={<SignInForm />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
