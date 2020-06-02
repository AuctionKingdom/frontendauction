import React, { useEffect, useState } from "react";
import { makeStyles, Typing } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { signout } from "../Auth/userauth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
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

  let history = useHistory();
  const [name, setName] = useState(null);

  useEffect(() => {
    let jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      let token = JSON.parse(jwtToken);
      setName(token.user.name);
    }
  }, []);

  //Signout feature

  function signOut() {
    localStorage.removeItem("jwt");
    signout();
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <img
            src={require("/home/maddy/Desktop/AK/frontendauction/src/logo.png")}
            className={classes.image}
          />
          <Typography variant="h6" className={classes.content}>
            {name}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              signOut();
            }}
          >
            SignOut
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
