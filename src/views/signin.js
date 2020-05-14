import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useLocation } from 'react-router-dom';
import history from './../history';
import Typing from 'react-typing-animation';
import Slide from '@material-ui/core/Slide';
import SigninAuth from './../Auth/signinauth'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let location = useLocation();


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

        <div className={classes.paper}>

        <Typing>
          <Typography variant="h4" component="h2">
            Auction Kingdom
          </Typography>
        </Typing>

        <br></br>

        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button variant={location.pathname === '/signin' || location.pathname === '/'  ? "contained" : "outlined"} color="primary">Sign In</Button>
          </Grid>
          <Grid item>
            <Button variant={location.pathname === '/signup' ? "contained" : "outlined"} color="primary" onClick={() => history.push('/signup')}>Sign Up</Button>
          </Grid>
        </Grid>


        <form className={classes.form} onSubmit={SigninAuth}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>

          </Slide>

        </form>
      </div>


    </Container>
  );
}