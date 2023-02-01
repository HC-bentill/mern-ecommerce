import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import {useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {Loader} from "./components/Loader/_component"
import { useEffect } from "react";

function App() {
  const admin = useSelector((state) => state.user?.user?.isAdmin);
  const appSlice = useSelector((state) => state.app);

  useEffect(() => {
    document.body.style.overflow = appSlice.loading ? "hidden" : "auto";
  }, [appSlice?.loading]);

  return (
    <Router>
      {appSlice.loading ? (
        <div className="loader_container">
          <Loader/>
        </div>
      ) : null}
      <Switch>
        {!admin ? (
          <>
            <Route path="/">
              <Login />
            </Route>
          </>
        ) : (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
