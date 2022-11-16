import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForgetPW, Home, LogIn, Register, ResetPW } from "../features";
import { Counter } from "../features/counter/Counter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPW />} />
        <Route path="/reset-password" element={<ResetPW />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
