import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from './../history';
import Typing from 'react-typing-animation';
import Slide from '@material-ui/core/Slide';
import SignupAuth from './../Auth/signupauth';


import {
    useLocation 
 } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  paper: {        
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: { 
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let location = useLocation();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />   {/* compulsary */}
      <div className={classes.paper}>
      
    <Typing>
    <Typography variant="h4" component="h2">
      Auction Kingdom
    </Typography>
    </Typing>
    <br></br>
      
      <Grid container justify="center" spacing={2}>

            <Grid item>
            
            <Button variant={location.pathname === '/signin' ? "contained" : "outlined" } color="primary" onClick={() => history.push('/signin')}>Sign In</Button>
            </Grid>
          <Grid item>
            <Button variant={location.pathname === '/signup' ? "contained" : "outlined" } color="primary" >Sign Up</Button>
            </Grid>
          </Grid>

       
        <form className={classes.form} onSubmit={SignupAuth}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="userName"
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
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>      

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          </Slide>
        </form>
      </div>
    </Container>
  );
}

