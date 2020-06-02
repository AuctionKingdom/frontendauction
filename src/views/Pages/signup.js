import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { signup } from "../../Auth/userauth";
import { useHistory, useLocation } from "react-router-dom";

const myStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    border: "1px solid red",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    display: "inline-block",
    width: "150px",
    height: "50px",
    objectFit: "cover",
  },
}));

function SignUp() {
  const classes = myStyles();
  let history = useHistory();
  let location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [RedirectTo, setRedirect] = useState(false);

  const clickSubmit = (event) => {
    event.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    console.log(user);
    signup(user).then((data) => {
      if (data && data.error) setError(data.error);
      else if (data) {
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        setRedirect(true);
      }
    });
  };

  const SignUpForm = () => {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline /> {/* compulsary */}
        <div className={classes.paper}>
          <img
            alt="logo"
            src={require("/home/maddy/Desktop/AK/frontendauction/src/logo.png")}
            className={classes.image}
          />

          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button
                variant={
                  location.pathname === "/signin" ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => history.replace("/signin")}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={
                  location.pathname === "/signup" ? "contained" : "outlined"
                }
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>

          <br></br>

          <form classname={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  name="Nick Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Slide
              direction="up"
              in={true}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 2000, exit: 2000 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={clickSubmit}
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Slide>
          </form>
        </div>
        <div style={{ display: error ? "" : "none" }}>{error}</div>
      </Container>
    );
  };

  return (
    <React.Fragment>
      {RedirectTo ? history.push("/signin") : SignUpForm()}
    </React.Fragment>
  );
}

export default SignUp;
