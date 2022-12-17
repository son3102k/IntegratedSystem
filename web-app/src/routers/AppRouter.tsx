import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "../features/counter/Counter";
import { AfterLogInRouter, PrivateRouter, PublicRouter } from "../constant/routerComponent";
import Layout from "../features/Layout/Layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRouter.map((router) => (
          <Route key={router.router} path={router.router} element={router.component} />
        ))}
        {AfterLogInRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}
        {
          // role is admin
          PrivateRouter.map((privateRouter) => (
            <Route key={privateRouter.router} path={privateRouter.router} element={privateRouter.component} />
          ))
        }
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
