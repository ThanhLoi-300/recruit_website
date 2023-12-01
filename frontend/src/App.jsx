import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "~/components/layouts";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileLayout from "./components/layouts/ProfileLayout/ProfileLayout";
import RecruitmentLayout from "./components/layouts/RecruitmentLayout";
import BrandLayout from "./components/layouts/BrandLayout";
function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            {
              publicRoutes.map((route,index) => {
                const Layout = route.layout === null ? Fragment : AuthLayout;
                const BrandLayouts = route.layout === null ? Fragment : BrandLayout;
                const Page = route.component;
                if(route.layout && route.layout === "BrandLayout"){
                  return (
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={
                        <BrandLayouts>  
                          <Page/>
                        </BrandLayouts>
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
            {
              privateRoutes.map((route,index) => {
                const Layout = route.layout === null ? Fragment : DefaultLayout;
                const LayoutProfile = route.layout === null ? Fragment : ProfileLayout;
                const LayoutRecruitment = route.layout === null ? Fragment : RecruitmentLayout;
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
                } else if(route.layout && route.layout === 'RecruitmentLayout'){
                  return (
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={
                        <LayoutRecruitment>
                          <Routes>
                            {route.routes && route.routes.map((subRoute, subIndex) => (
                              <Route
                                  key={subIndex}
                                  path={subRoute.path}
                                  element={
                                    <subRoute.component>
                                      {subRoute.routes && (
                                        <Routes>
                                          {subRoute.routes.map((item, index) => (
                                            <Route
                                                key={index}
                                                path={item.path}
                                                element={
                                                  <item.component/>
                                                }
                                            />
                                          ))}
                                        </Routes>
                                      )}
                                    </subRoute.component>
                                  }
                              />
                            ))}
                          </Routes>
                        </LayoutRecruitment>
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
