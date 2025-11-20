import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* componentes*/
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';

/* pages*/ 
import Home from './components/pages/Auth/Home';
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';

function App() {
  return (
    <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
        <Footer />
    </Router>
  );
}

export default App;

