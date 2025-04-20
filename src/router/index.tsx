// src/routes/Router.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import ProtectedRoute from "../pages/protectedRoute";

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Styles />
      <Header />
      <Routes>
        {routes.map((routeItem) => {
          const LazyComponent = lazy(() =>
            import(`../pages/${routeItem.component}`)
          );

          const element = routeItem.protected ? (
            <ProtectedRoute>
              <LazyComponent />
            </ProtectedRoute>
          ) : (
            <LazyComponent />
          );

          return routeItem.path.map((p: string) => (
            <Route
              key={p}
              path={p}
              element={element}
            />
          ));
        })}
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;
