import React, {useEffect, useState} from 'react';
import { useParams, useLocation , useHistory} from 'react-router-dom';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SocketContext from '../../socket-context.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




toast.configure();

function RoomPage(props){

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
            history.replace('/');
        })

        token = JSON.parse(token);
        setEmail(token.user.email)

    },[])

    /**
       newPlayer: Current Player in the bidding process

       new Bid: Change in bid is reflected as soon as possible

    */

    useEffect(()=>{

        props.socket.on('newPlayer',data=>{
            changePlayer(data);
            toast('Auction: New Player')
        })

        props.socket.on('newBid',data=>{
            changePlayer(data);
            toast('Auction: Increase in Bid')
        })



    },[currentPlayer, seconds, props.socket]);


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
    })

    /**
        Begin seconds
    */

    useEffect(()=>{
        props.socket.on('Begin timeout',data=>{
            toast('10s more ...Please Decide sooner')
        })
    })


    /**
        Timer indicating the user a bid hasnt been made in the last 20s, and it could
        lead to closing of the current player
    */

    useEffect(() => {

      if (isActive) {
        setTimeout(()=>{
          setSeconds(seconds => seconds-1);
        },1000)
      }else{
          setSeconds(seconds => 10);
      }

    });


    /**
        Rendering the user Card: Need to Improve
    */

    function renderUser(){
      if (users) {
          return Object.keys(users).map((key) => {
              return (
                  <Grid item>
                      <Card>
                              <CardContent>
                                <Typography gutterBottom variant="body2" component="p">
                                    {key}:{users[key]}
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

            <Grid item xs={12} md={12}>
                Current Player: {currentPlayer.player}<br />
                Current Bid: { currentPlayer.currentBid}<br />
                Highest Bidder: { currentPlayer.highestBidder} <br />
                Base Price: { currentPlayer.base } <br />
                Your Bid: {yourBid}
            </Grid>


            <Grid item xs={12} md={12}>
                <Button variant="contained" color="primary" onClick={()=>{makeBid()}} >
                    Bid
                </Button>
            </Grid>
            <Grid item xs={6} md={12}>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                >
                  {renderUser()}
                </Grid>
            </Grid>
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
