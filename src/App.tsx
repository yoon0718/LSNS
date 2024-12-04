import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

import LoginPage from "./components/FirstPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
