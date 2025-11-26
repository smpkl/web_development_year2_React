import {BrowserRouter, Routes, Route} from 'react-router';
import './CSS/App.css';
import Layout from './components/layout';
import Profile from './views/Profile';
import Home from './views/Home';
import Single from './views/Single';
import Upload from './views/Upload';

function App() {
  return (
    <>
      <BrowserRouter basename="/~sampokl/custom-hooks/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="single" element={<Single />} />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
