import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import NotFound from "../src/containers/not_found";
import SignUp from "../src/containers/signup";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import Dashboard from "../src/containers/dashboard";
import Fotting from "./components/Fotting";
import Navving from "./components/Navving";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import Signup from "./screens/Signup";

function App() {
  //layout cover kore heder portion
  return (
    <Router>
      <Navving />
      <Container>{/* <Signup /> */}</Container>

      <Container>
        <Switch>
          <Route exact path={"/"}>
            <HomeScreen />
          </Route>
          <Route exact path={"/product_detail/:id"}>
            <ProductDetailScreen />
          </Route>
          <PrivateRoute exact path={"/cart"} component={CartScreen} />

          <PublicRoute
            restricted={true}
            component={LoginScreen}
            path="/login"
            exact
          />
          <PublicRoute
            restricted={true}
            component={Signup}
            path="/signup"
            exact
          />
          <PrivateRoute exact path={"/dashboard"} component={Dashboard} />
          <PrivateRoute exact path={"/order"} component={OrderScreen} />
          <PrivateRoute exact path={"/user"} component={UserProfileScreen} />
          <Route exact path={"/404"}>
            <NotFound />
          </Route>
          <Route exact path={"*"}>
            <Redirect to={"/404"}></Redirect>
          </Route>
        </Switch>
        <Fotting />
      </Container>
    </Router>
  );
}

export default App;
