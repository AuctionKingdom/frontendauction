import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loading from "./views/Pages/Loading";

const Error = React.lazy(() => import("./components/Error"));
const SignIn = React.lazy(() => import("./views/Pages/signin"));
const SignUp = React.lazy(() => import("./views/Pages/signup"));
const Home = React.lazy(() => import("./views/Pages/Home.js"));
const Room = React.lazy(() => import("./views/Pages/Room.js"));

const MainRouter = () => (
  <BrowserRouter>
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          exact
          path="/home"
          name="home"
          render={(props) => <Home {...props} />}
        />
        <Route
          exact
          path="/room/:slug"
          name="room"
          render={(props) => <Room {...props} />}
        />
        <Route path="*" name="404" render={(props) => <Error {...props} />} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

export default MainRouter;
