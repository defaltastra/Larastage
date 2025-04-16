import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
// import Navbar from './components/Navbar';
import Home from './components/Home';
import InternshipList from './components/InternshipList';
import GuideAndTips from './components/GuideAndTips';
import ContactPage from './components/ContactPage';
import InternRegister from './components/InternRegister';
import RegisterPage from './components/RegisterPage';
import LoginSelection from './components/LoginSelection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stages" element={<InternshipList />} />
        <Route path="guide" element={<GuideAndTips />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginSelection />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register/:type" element={<RegisterPage />} />
        <Route path="register-stagiaire" element={<InternRegister />} />
      </Route>
    </Routes>
  );
}

export default App;
