import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from './../history';
import Typing from 'react-typing-animation';
import Slide from '@material-ui/core/Slide';
import {signup} from './../Auth/userauth';


import {
    useLocation,Redirect
 } from 'react-router-dom'


const myStyles = (theme) => ({
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
});


class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      RedirectTo: "",
      title: "Auction Kingdom"
    }
  }

  handleChange = (name) => (event) => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value})
  }

  clickSubmit = event => {
    event.preventDefault()
    const {name,email,password} = this.state
    const user = {
      name,
      email,
      password,
    }
    console.log(user)
    signup(user)
    .then(data => {
      if (data.error)
          this.setState({error: data.error})
      else
          this.setState({
            error:"",
            name: "",
            email: "",
            password: "",
            RedirectTo: true
          })
    })
  }

  SignUpForm = (name, email, password, error) => {
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />   {/* compulsary */}
        <div className = {this.props.classes.paper}>
      <h1>{this.state.title}</h1>
      
      <br></br>
        
        <Grid container justify="center" spacing={2}>
  
              <Grid item>
              
              <Button variant={history.location.pathname === '/signin' ? "contained" : "outlined" } color="primary" onClick={() => history.push('/signin')}>Sign In</Button>
              </Grid>
            <Grid item>
              <Button variant={history.location.pathname === '/signup' ? "contained" : "outlined" } color="primary" >Sign Up</Button>
              </Grid>
            </Grid>
  
          <br></br>
          <form classname = {this.props.classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleChange("name")}
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
                  onChange={this.handleChange("email")}
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
                  onChange={this.handleChange("password")}
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
              onClick = {this.clickSubmit}
              className  = {this.props.classes.submit}
            >
              Sign Up
            </Button>
  
            </Slide>
          </form>
        </div>
        <br></br>
          <hr />
          <div style={{display: error ? "" : "none" }}>
              {error}
          </div>
      </Container>
    );
  }

  render () {
    const {name, email, password, error, RedirectTo} = this.state;
    const { classes } = this.props;

    if(RedirectTo) {
      return <Redirect to="/signin"></Redirect>
    }

    return (
      <div>
        {this.SignUpForm(name, email, password, error)}
      </div>
    )
  }

}


export default withStyles(myStyles)(SignUp);



