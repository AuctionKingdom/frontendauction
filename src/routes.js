import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loading from "./views/Pages/Loading";
//import App from './App';

const Error = React.lazy(() => import("./components/Error"));
const SignIn = React.lazy(() => import("./views/Pages/signin"));
const SignUp = React.lazy(() => import("./views/Pages/signup"));
const Home = React.lazy(() => import("./views/Pages/Home.js"));
const Room = React.lazy(() => import("./views/Pages/Room.js"));
const Form11 = React.lazy(() => import("./views/Pages/Form11.js"));

const MainRouter = ({ onToggleDark }) => {
  console.log(onToggleDark);

  return (
    <BrowserRouter>
      <React.Suspense fallback={Loading()}>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/home"
            name="home"
            render={(props) => <Home {...props} otd={onToggleDark} />}
          />
          <Route
            exact
            path="/room/:slug"
            name="room"
            render={(props) => <Room {...props} otd={onToggleDark} />}
          />
          <Route exact path="/team" render={(props) => <Form11 {...props} />} />
          <Route path="*" component={Error} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};
export default MainRouter;
