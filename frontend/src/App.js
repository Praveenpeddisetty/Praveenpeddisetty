import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import SplashScreen from "./screens/SplashScreen";
import Onboarding from "./screens/Onboarding";
import UserTypeSelection from "./screens/UserTypeSelection";
import Login from "./screens/Login";
import OTPVerification from "./screens/OTPVerification";
import ConsumerHome from "./screens/consumer/ConsumerHome";
import SearchBrowse from "./screens/consumer/SearchBrowse";
import FilterScreen from "./screens/consumer/FilterScreen";
import DesignDetail from "./screens/consumer/DesignDetail";
import ArtisanProfile from "./screens/consumer/WorkerProfile";
import OrderCustomization from "./screens/consumer/OrderCustomization";
import OrderConfirmation from "./screens/consumer/OrderConfirmation";
import MyOrders from "./screens/consumer/MyOrders";
import OrderTracking from "./screens/consumer/OrderTracking";
import ChatScreen from "./screens/consumer/ChatScreen";
import Wishlist from "./screens/consumer/Wishlist";
import RateReview from "./screens/consumer/RateReview";
import Notifications from "./screens/consumer/Notifications";
import ConsumerProfile from "./screens/consumer/ConsumerProfile";
import WorkerDashboard from "./screens/worker/WorkerDashboard";
import WorkerOrders from "./screens/worker/WorkerOrders";
import WorkerOrderDetail from "./screens/worker/WorkerOrderDetail";
import WorkerProfile from "./screens/worker/WorkerProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/user-type" element={<UserTypeSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verify" element={<OTPVerification />} />
          
          {/* Consumer Routes */}
          <Route path="/consumer-home" element={<ConsumerHome />} />
          <Route path="/search" element={<SearchBrowse />} />
          <Route path="/filter" element={<FilterScreen />} />
          <Route path="/design/:id" element={<DesignDetail />} />
          <Route path="/worker/:id" element={<ArtisanProfile />} />
          <Route path="/customize/:id" element={<OrderCustomization />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/rate-review/:id" element={<RateReview />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/consumer-profile" element={<ConsumerProfile />} />
          
          {/* Worker Routes */}
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/orders" element={<WorkerOrders />} />
          <Route path="/worker/order-detail/:id" element={<WorkerOrderDetail />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
