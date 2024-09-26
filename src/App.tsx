import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { ConfigProvider } from "antd";

import pageRoutes from "./pages/routes";
import Main from "./shared/components/Layout/Main";
import { CUSTOMER_PATH, ERROR_PATH } from "./shared/constants/path";

import "./index.css";
import ProtectedRoute from "./shared/routes/protected.routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#001529",
        },
        components: {
          Layout: {
            headerHeight: 64,
            headerPadding: "0 10px",
            footerBg: "#001529",
          },
          Steps: {
            finishIconBorderColor: "#001529",
          },
          Button: {
            defaultGhostBorderColor: "white",
            defaultGhostColor: 'white',
            ghostBg: '#001529'
          },
          Menu: {
            itemActiveBg: '#001529',
            itemSelectedBg: '#001529',
            itemSelectedColor: 'white'
          },
        },
      }}>
      <Main>
        <Suspense
          fallback={<h1 style={{ textAlign: "center" }}>Loading...</h1>}>
          <Routes>
            {pageRoutes.map(
              ({
                component: Component,
                path,
                protected: isProtected,
                ...rest
              }) => {
                if (isProtected) {
                  return (
                    <Route
                      {...rest}
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute>
                          <Component />
                        </ProtectedRoute>
                      }
                    />
                  );
                }
                return (
                  <Route
                    {...rest}
                    key={path}
                    path={path}
                    element={<Component />}
                  />
                );
              }
            )}

            <Route
              path="/"
              element={<Navigate replace to={CUSTOMER_PATH.HOME} />}
            />
            <Route
              path="*"
              element={<Navigate replace to={ERROR_PATH.PAGE_NOT_FOUND} />}
            />
          </Routes>
        </Suspense>
      </Main>
    </ConfigProvider>
  );
}

export default App;
