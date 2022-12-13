import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, LogIn } from "../features";
import { Counter } from "../features/counter/Counter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
