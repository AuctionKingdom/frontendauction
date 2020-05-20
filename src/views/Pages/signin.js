import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory,useLocation } from 'react-router-dom';
import Typing from 'react-typing-animation';
import Slide from '@material-ui/core/Slide';
import {signin,authenticate} from '../../Auth/userauth'
import {useTypewriter} from 'react-typewriter-hook';


const useStyles = makeStyles((theme)=>({
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

function SignIn(){


  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [redirectToRefer,setRedirect] = useState(false);
  const [title,setTitle]=useState("Auction Kingdom");

  const clickSubmit = event => {
      event.preventDefault()
      const user = {
          email,
          password
      };
      console.log(user)
      signin(user)
      .then(data => {
          if(data.error) {
              setError(data.error)
          }
          else
          {
              console.log("Entering here");
              //authenticate
              //redirect
              authenticate(data,()=> {
                  setRedirect(true);
              });
          }
      })

    }

    useEffect(()=>{
      if(redirectToRefer === true)
          history.push({
              pathname:'/home',
              state:{Auth:redirectToRefer}
          })
    },[redirectToRefer])

  const SignInForm = () => {

    return (
                <Container component="main" maxWidth="xs">
                  <CssBaseline />

                    <div className = {classes.paper}>
                    <Typing>
                      <Typography variant="h4" component="h2">
                        {title}
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


                    <form className = {classes.form}>
                      <TextField
                        onChange={(e)=>{setEmail(e.target.value)}}
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
                        onChange={(e)=>{setPassword(e.target.value)}}
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
                          onClick = {clickSubmit}
                          className = {classes.submit}
                        >
                          Sign In
                      </Button>

                      </Slide>

                    </form>
                  </div>
                  <br></br>
                  <hr />
                  <div style={{ display: error ? "" : "none" }}>
                         {error}
                  </div>
            </Container>
    );
  }



  return(
          <div>
              {SignInForm()}
          </div>
      );
  }


export default SignIn;
