import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(undefined);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    try {
      // post login credentials to API
      console.log('log in:', credentials);
      const response = await postLogin(credentials);

      if (!response.ok) {
        console.log('Login failed:', response.status);
        alert(response.body.message);
        return;
      }
      console.log('response:', response);
      const {user, token} = response.body;

      // set token to local storage
      if (token) {
        localStorage.setItem('token', token);
      } else {
        console.log('Login failed: no token received');
        return false;
      }
      // set user to state
      setUser(user);
      // navigate to home
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      console.log('log out');
      // remove token from local storage
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      } else {
        console.log('Unable to log out: no token found');
      }
      // set user to null
      setUser(null);
      // navigate to home or login page
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      console.log('try autologin');
      // get token from local storage
      const token = localStorage.getItem('token');
      // if token exists, get user data from API
      if (token) {
        const result = await getUserByToken(token);
        // set user to state
        setUser(result);
        // navigate to home
        navigate(location.pathname);
      } else {
        console.log('Unable to autologin: no token found');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const value = {
    user,
    handleLogin,
    handleLogout,
    handleAutoLogin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export {UserProvider, UserContext};
