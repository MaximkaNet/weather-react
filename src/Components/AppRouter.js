import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";
const AppRouter = () => {
  return (
    <Routes>
      {
        routes.map(({ to, component }) =>
          <Route key={to} path={to} element={component} />
        )
      }
    </Routes>
  )
}
export default AppRouter;