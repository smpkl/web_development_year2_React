import {BrowserRouter, Routes, Route} from 'react-router';
import './CSS/App.css';
import Layout from './components/layout';
import Profile from './views/Profile';
import Home from './views/Home';
import Single from './views/Single';
import Upload from './views/Upload';
import Login from './views/Login';
import Logout from './views/Logout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="single" element={<Single />} />
            <Route path="upload" element={<Upload />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
