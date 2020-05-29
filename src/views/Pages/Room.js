import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation , useHistory} from 'react-router-dom';
import SocketContext from '../../socket-context.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlayerDetails from '../../components/PlayerDetails';
import { Typography, Button, Grid, Paper} from '@material-ui/core';
import UserExpand from '../../components/UserExpand';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';


toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily:`Arial, Helvetica, sans-serif`,
    flexGrow: 1,
    overflow:'hidden'
  },
  player: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundImage:`url('https://image.shutterstock.com/image-photo/stadium-lights-flashes-3d-260nw-600464927.jpg')`,
    backgroundSize:'cover',
    backgroundPosition:'center',
  },
  paper:{

    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    textAlign:'center',
    color: theme.palette.text.primary,
  },
  image:{
    display: 'inline-block',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  }
}));


function RoomPage(props){

    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let { slug } = useParams();
    const [currentPlayer,changePlayer] = useState({});
    const [yourBid, changeBid] = useState(0);
    const [users,setUsers] = useState(null);
    const [disable,setDisable] = useState(false)
    const [playerList, setPlayerList] = useState({});
    const [allPlayers, setPlayers] = useState([]);
    /**

    */

    useEffect(()=>{

        let token = localStorage.getItem('jwt');
        if(location.state === undefined){
            history.push('/',{previousLocation:location.pathname});
        }
        else if(location.state.previousLocation === '/'){
            console.log(location.state.previousLocation)
            props.socket.emit('Link Join',{roomId:slug, token:token})
        }

        props.socket.on('failure',data=>{
            alert(data)
            history.replace('/');
        })

        props.socket.on('success',data=>{
            toast('Success')
        })

        return()=>{
          props.socket.off('failure')
          props.socket.off('success')
        }

    },[history, location, props.socket, slug])

    /**
       newPlayer: Current Player in the bidding process

       new Bid: Change in bid is reflected as soon as possible

    */

    useEffect(()=>{

        props.socket.on('newPlayer',data=>{
            changePlayer(data);
            changeBid(yourBid => 0);
            setDisable(false);
        })

        props.socket.on('newBid',data=>{
            changePlayer(data);
        })


        return ()=>{
          props.socket.off('newPlayer');
          props.socket.off('newBid');
        }

    },[currentPlayer, yourBid, props.socket, disable]);


    /**
        Code submits the bid once you have improved your offer
    */

    useEffect(()=>{

      if(yourBid !== 0 && yourBid){
        let jwtToken = JSON.parse(localStorage.getItem('jwt'));
        props.socket.emit('Bid',{roomId:slug,bid:yourBid,email:jwtToken.user.email})
      }


    },[yourBid, props.socket, slug])


    function makeBid(){

        if(currentPlayer.currentBid === 0){
            changeBid(yourBid => currentPlayer.base)
        }else{
            changeBid(yourBid => currentPlayer.currentBid+50);
        }
    }


    /**
        Waits for the server to emit the people
    */

    useEffect(()=>{
        props.socket.on('people',data=>{
              setUsers(data);
        })

        props.socket.on('playerList',data=>{
              setPlayerList(data);
        })

        props.socket.on('availablePlayers',data=>{
              setPlayers(data);
        })

        return ()=>{
          props.socket.off('data');
          props.socket.off('playerList');
          props.socket.off('availablePlayers');
        }
    })

    /**
        Begin seconds
    */

    useEffect(()=>{
        props.socket.on('Begin timeout',data=>{
            toast('10s more ...Please Decide sooner')
        })

        return ()=>{ props.socket.off('Begin timeout')}
    })


    return(

      <React.Fragment>
          <ResponsiveDrawer allPlayers={allPlayers} playerList ={playerList}/>
          <div className={classes.root}>
          <Grid container spacing={1} style={{ padding:'1em'}}>
            <Grid item xs={12}>
              <Grid container justify="center">
                  <Grid item xs={12} md={6}>
                      <Paper className={classes.player}>
                          <img src={currentPlayer.imgsrc} alt='PlayerImage' className={classes.image} />
                      </Paper>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
              <Grid item xs={12}>
                  <Grid container justify="center">
                      <Grid item xs={6} md={3}>
                          <div className={classes.paper}>
                              <Typography variant="body1" component="p">
                                  <b>{currentPlayer.player}</b>
                              </Typography>
                              <PlayerDetails player={currentPlayer} users={users}/>
                          </div>
                      </Grid>

                      <Grid item xs={6} md={3}>
                        <div className={classes.paper}  style={{marginTop:'3em'}}>
                            <Button type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled = {disable}
                                    endIcon={<TrendingUpIcon />}
                                    onClick = {()=>{makeBid()}}
                            >
                              Bid
                            </Button>
                            <Button type="submit"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    endIcon={<TrendingDownIcon />}
                                    style={{margin:10}}
                                    onClick={()=>{setDisable(true)}}
                            >
                              Pass
                            </Button>
                            <UserExpand users={users} playerList={playerList}/>
                        </div>
                      </Grid>
                  </Grid>
                </Grid>
            </Grid>
          </div>
        </React.Fragment>
       )

}

const Room = props=>{

    return(
        <SocketContext.Consumer>
            {socket=><RoomPage {...props} socket={socket} /> }
        </SocketContext.Consumer>
    )
}

export default Room;
