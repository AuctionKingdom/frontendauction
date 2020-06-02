import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import { useHistory } from "react-router-dom";
//import { signout } from "../Auth/userauth";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    border: "1px solid #A29266",
    color: "#A29266",
    borderRadius: "2px",
    textAlign: "center",
  },
  image: {
    display: "inline-block",
    width: "150px",
    height: "50px",
    objectFit: "cover",
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  // let history = useHistory();
  const [name, setName] = useState(null);

  useEffect(() => {
    let jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      let token = JSON.parse(jwtToken);
      setName(token.user.name);
    }
  }, []);

  //Signout feature

  // function signOut() {
  //   localStorage.removeItem("jwt");
  //   signout();
  //   history.push("/");
  // }

  return (
    <div className={classes.root}>
      <Grid container>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid item xs={6}>
              <img
                alt="DreamTeam"
                src={require("/home/maddy/Desktop/AK/frontendauction/src/logo.png")}
                className={classes.image}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6" className={classes.title}>
                {name}
              </Typography>
            </Grid>

            <Switch onChange={props.otd}></Switch>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
}
