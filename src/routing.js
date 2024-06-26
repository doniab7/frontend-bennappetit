import { Route, Routes, useLocation } from "react-router-dom";
import { Category, Error, Home, MealDetails } from "./pages";
import LoginSignUp from "./components/LoginSignup/LoginSignup";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import UserMeal from "./components/Meal/UserMeal";
import { useAuthContext } from "./context/authenticationContext";
import UserProfile from "./components/Profile/UserProfile";
import Navbar from "./components/Header/Navbar";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./components/Unauthorized/Unauthorized";

const Layout = ({ children }) => (
  <>
    <Header />
    <Sidebar />
    {children}
  </>
);
const Routing = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuthContext();
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/meal/:id"
        element={
          <Layout>
            <MealDetails />
          </Layout>
        }
      />
      <Route
        path="/meal/category/:name"
        element={
          <Layout>
            <Category />
          </Layout>
        }
      />
      <Route path="/signup" element={<LoginSignUp />} />
      <Route path="/your-recipes" element={<UserMeal />} />
      <Route
        path="/user/:id"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/unauthorized"
        element={
            <Unauthorized />
          
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <Error />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Routing;
