import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import SplashScreen from "./screens/SplashScreen";
import Onboarding from "./screens/Onboarding";
import UserTypeSelection from "./screens/UserTypeSelection";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import OTPVerification from "./screens/OTPVerification";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/user-type" element={<UserTypeSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/otp-verify" element={<OTPVerification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
