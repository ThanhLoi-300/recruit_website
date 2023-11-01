import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { Fragment } from "react";
import { DefaultLayout } from "~/components/layouts";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          </Routes>
        </div>
        <ToastContainer/>
      </Router>
  );
}

export default App;
