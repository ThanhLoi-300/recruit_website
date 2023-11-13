import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "~/components/layouts";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileLayout from "./components/layouts/ProfileLayout/ProfileLayout";
function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            {
              publicRoutes.map((route,index) => {
                const Layout = route.layout === null ? Fragment : AuthLayout;
                const Page = route.component;
                  return (
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={
                        <Layout>
                          <Page/>
                        </Layout>
                      }
                    />
                  ) 
              })
            }
            {
              privateRoutes.map((route,index) => {
                const Layout = route.layout === null ? Fragment : DefaultLayout;
                const LayoutProfile = route.layout === null ? Fragment : ProfileLayout;
                const Page = route.component ? route.component : null;
                if(route.layout && route.layout === 'ProfileLayout'){
                  return (
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={
                        <LayoutProfile>
                          <Routes>
                            {route.routes && route.routes.map((subRoute, subIndex) => (
                              <Route
                                  key={subIndex}
                                  path={subRoute.path}
                                  element={
                                    <subRoute.component/>
                                  }
                              />
                            ))}
                          </Routes>
                        </LayoutProfile>
                      }
                    />
                  ) 
                } else {
                  return (
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={
                        <Layout>
                          <Page/>
                        </Layout>
                      }
                    />
                  )
                }
              })
            }
          </Routes>
        </div>
        <ToastContainer/>
      </Router>
  );
}

export default App;
