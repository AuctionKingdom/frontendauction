import React, {useEffect, useState} from 'react';
import { useParams, useLocation , useHistory} from 'react-router-dom';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SocketContext from '../../socket-context.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


function RoomPage(props){

    let history = useHistory();
    let location = useLocation();
    let { slug } = useParams();
    const [currentPlayer,changePlayer] = useState(null);
    const [currentBid, changeCurrentBid] = useState(null);
    const [YourBid, changeBid] = useState(null);
    const [baseBid, setBaseBid] = useState(null);
    const [users,setUsers] = useState(null);

    const useStyles = makeStyles({
        root: {
              maxWidth: 345,
            },
        });

    useEffect(()=>{

        let token = localStorage.getItem('jwt');
        if(location.state === undefined){
            history.push('/',{previousLocation:location.pathname});
        }
        else if(location.state.prevLocation === '/signin/'){
            props.socket.emit('LinkAdd',{'roomId':slug,'token':token})
        }

    })

    useEffect(()=>{

        props.socket.on('newPlayer',data=>{
            changePlayer(data.player);
            changeCurrentBid(data.currentBid);
            setBaseBid(data.increment);
        })

        props.socket.on('newBid',data=>{
            console.log(data)
            changeCurrentBid(data.currentBid);
            setBaseBid(data.increment);
        })

    },[currentPlayer,currentBid,props.socket]);

    useEffect(()=>{

        props.socket.emit('increaseBid',{'roomId':slug,'bid':YourBid})

    },[YourBid,props.socket])


    useEffect(()=>{
        props.socket.on('people',data=>{
              setUsers(data);
        })
    })

    function renderUser(){
      if (users) {
          return Object.keys(users).map( (key) => {
              return (
                  <Grid item xs={6}>
                      <Card className={useStyles.root}>
                              <CardContent>
                                <Typography gutterBottom variant="body2" component="p">
                                    {key}
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

            <Grid item xs={12}>
                Current Player: {currentPlayer}<br />
                Current Bid: { currentBid }<br />
                Your Bid: {YourBid}
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick = {()=>{props.socket.emit('Start',slug)}}>
                    Start Auction
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={()=>{changeBid(currentBid+baseBid)}}>
                    Bid
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary">
                    Pass
                </Button>
            </Grid>
            <Grid item xs={12}>
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
