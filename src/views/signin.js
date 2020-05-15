import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useLocation, Redirect } from 'react-router-dom';
import history from './../history';
import Typing from 'react-typing-animation';
import Slide from '@material-ui/core/Slide';
import {signin,authenticate} from './../Auth/userauth'
import {useTypewriter} from 'react-typewriter-hook'


const useStyles = (theme) => ({
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
});

class SignIn extends Component {
  constructor() {
      super()
      this.state = {
          email:"",
          password:"",
          error:"",
          redirectToRefer: false,
          title:"Auction Kingdom"
      }
  }
  //changing state of variables
  handleChange = (name) => (event) => {
      this.setState({error: ""})
      this.setState({[name]: event.target.value});
  }

  

  clickSubmit = event => {
      event.preventDefault()
      const {email,password} = this.state;
      const user = {
          email,
          password
      };
      //console.log(user)
      signin(user)
      .then(data => {
          if(data.error) { 
              this.setState({error: data.error})
          }
          else
          {
              //authenticate
              //redirect
              authenticate(data,()=> {
                  this.setState({redirectToRefer: true})
              });
          }
      })

    }

  SignInForm = (email, password ,error) => {

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
  
          <div className = {this.props.classes.paper}>
          <Typing>
            <Typography variant="h4" component="h2">
              Auction Kingdom
            </Typography>
          </Typing>
  
          <br></br>
  
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button variant={history.location.pathname === '/signin' || history.location.pathname === '/'  ? "contained" : "outlined"} color="primary">Sign In</Button>
            </Grid>
            <Grid item>
              <Button variant={history.location.pathname === '/signup' ? "contained" : "outlined"} color="primary" onClick={() => history.push('/signup')}>Sign Up</Button>
            </Grid>
          </Grid>
  
  
          <form className = {this.props.classes.form}>
            <TextField
              onChange={this.handleChange("email")}
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
              onChange={this.handleChange("password")}
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
                onClick = {this.clickSubmit}
                className = {this.props.classes.submit}
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

  render() {
      const {email, password,error,redirectToRefer} = this.state;
      const {classes} = this.props;

      if(redirectToRefer) {
          return <Redirect to="/room"/>
      }
      return(
          <div>
              {this.SignInForm(email, password, error)}
          </div>
      );
  }
}


export default withStyles(useStyles)(SignIn);


