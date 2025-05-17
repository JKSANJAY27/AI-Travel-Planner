import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlanTripPage from './pages/PlanTripPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-trip" element={<PlanTripPage />} />
      </Routes>
    </Router>
  );
}
export default App;