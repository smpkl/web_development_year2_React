import {BrowserRouter, Routes, Route} from 'react-router';
import './CSS/App.css';
import Layout from './components/layout';
import Profile from './views/Profile';
import Home from './views/Home';
import Single from './views/Single';
import Upload from './views/Upload';
import Login from './views/Login';
import Logout from './views/Logout';
import {UserProvider} from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter basename="/~sampokl/context/">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="single" element={<Single />} />
              <Route path="upload" element={<Upload />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
