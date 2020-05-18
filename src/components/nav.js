import React ,{ useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { signout } from '../Auth/userauth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content:{
    flexGrow:1,
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  let history = useHistory();
  const [name, setName] = useState(null);

  useEffect(()=>{

      let jwtToken = localStorage.getItem('jwt');
      if(jwtToken){
          let token = JSON.parse(jwtToken);
          setName(token.user.name);
      }
  },[])

  //Signout feature

  function signOut(){

        localStorage.removeItem('jwt');
        signout();
        history.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AuctionKing
          </Typography>
          <Typography variant="h6" className={classes.content}>
            {name}
          </Typography>
          <Button color="inherit" onClick = {()=>{signOut()}}>SignOut</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
