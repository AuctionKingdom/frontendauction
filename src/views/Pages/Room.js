import React, {useEffect, useState} from 'react';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SocketContext from '../../socket-context.js';
import base64 from 'base-64';


function RoomPage(props){

    const [currentPlayer,changePlayer] = useState(null);
    const [currentBid, changeCurrentBid] = useState(null);
    const [YourBid, changeBid] = useState(0);
    const [baseBid, setBaseBid] = useState(0);

    useEffect(()=>{
       
        props.socket.on('newPlayer',data=>{
            console.log(data)
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

        props.socket.emit('increaseBid',{'roomName':props.match.params.slug,'bid':YourBid})

    },[YourBid,props.socket,props.match.params.slug])


    return(
  
            <Grid container direction="column" justify="center" alignContent="center" spacing={5} style={{marginTop:'5%'}}>
            
            <Grid item xs={12}>
                Current Player: {currentPlayer}<br />
                Current Bid: { currentBid }<br />
                Your Bid: {YourBid}
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick = {()=>{props.socket.emit('Start',props.match.params.slug)}}>
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