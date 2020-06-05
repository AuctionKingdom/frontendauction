import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { signout } from "../Auth/userauth";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    paddingRight:20,
    textAlign: "right",
  },
  image: {
    display: "inline-block",
    width: "100px",
    height: "50px",
    objectFit: "cover",
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();
  const [name, setName] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Grid container>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid item xs={3} md={1}>
              <img
                alt="Xtreme11"
                src={require("../logo.png")}
                className={classes.image}
              />
            </Grid>
            <Grid item xs={7} md={10}>
              <Typography variant="h6">
                Xtreme11
              </Typography>
            </Grid>
            <Grid item xs={2} md={1}>
              <Button color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Menu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>{name}</MenuItem>
                <MenuItem onClick={()=>{signOut()}}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
}
