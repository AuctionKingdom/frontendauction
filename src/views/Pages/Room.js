import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation , useHistory} from 'react-router-dom';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SocketContext from '../../socket-context.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from '@material-ui/lab/Skeleton';



toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media:{
    height:0,
    paddingTop:'56.25%',
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
    const [ isActive, setActive ]  = useState(false);
    const [ seconds, setSeconds ]  = useState(10);
    const [ email, setEmail ] = useState("");

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
            alert(data);
        })

        token = JSON.parse(token);
        setEmail(token.user.email)

        return()=>{
          props.socket.off('failure')
          props.socket.off('success')
        }

    },[])

    /**
       newPlayer: Current Player in the bidding process

       new Bid: Change in bid is reflected as soon as possible

    */

    useEffect(()=>{

        props.socket.on('newPlayer',data=>{
            changePlayer(data);
            changeBid(yourBid => 0);
        })

        props.socket.on('newBid',data=>{
            changePlayer(data);
        })


        return ()=>{
          props.socket.off('newPlayer');
          props.socket.off('newBid');
        }

    },[currentPlayer, yourBid]);


    /**
        Code submits the bid once you have improved your offer
    */

    useEffect(()=>{

      if(yourBid !== 0){
        let jwtToken = JSON.parse(localStorage.getItem('jwt'));
        props.socket.emit('Bid',{roomId:slug,bid:yourBid,email:jwtToken.user.email})
      }


    },[yourBid])


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

        return ()=>{ props.socket.off('data') }
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



    /**
        Rendering the user Card: Need to Improve
    */

    function renderUser(){
      if (users) {
          return Object.keys(users).map((key) => {
              return (
                  <Grid item xs={12}>
                      <Card>
                              <CardContent>
                                <Typography gutterBottom variant="body2" component="p">
                                    {key}:{JSON.parse(users[key])['name']}
                                </Typography>
                              </CardContent>
                      </Card>
                  </Grid>
              );
          });
        } else {
            return <p>No Users Available</p>;
        }
    }




    return(

        <Grid container direction="column" justify="center" alignContent="center" spacing={5} style={{marginTop:'5%'}}>

            {currentPlayer!=={}?(
            <Grid item md={12} xs={12}>
                <Card className={classes.root}>
                    <CardHeader
                      title= { currentPlayer.player }
                      subheader= { currentPlayer.type }
                    />
                    <CardMedia
                      className={ classes.media }
                      image={currentPlayer.imgsrc}
                      title={ currentPlayer.player}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Current Bid: { currentPlayer.currentBid}<br />
                          Highest Bidder: { users?users[currentPlayer.highestBidder]:null} <br />
                          Base Price: { currentPlayer.base } <br />
                      </Typography>
                    </CardContent>
                </Card>
            </Grid>
          ):(
            <Grid item md={12} xs={12}>
              <Skeleton variant="rect" width={345} height={500} />
            </Grid>
          )}

           <Grid item xs={12} >
                <Button variant="contained" color="primary" onClick={()=>{makeBid()}} >
                    Bid
                </Button>
            </Grid>
            {renderUser()}
            </Grid>
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
