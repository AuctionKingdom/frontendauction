import React,{useState} from 'react';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../socket-context.js';
import base64 from 'base-64';

function HomePage(props) {

  let history = useHistory();
  const [RoomName,setRoomName] = useState("");
  const [userName,setUserName] = useState("");

  function connectToRoom(){
    let formData = {"roomName":RoomName}
    console.log(formData.roomName)
    props.socket.emit("Create Room",formData);

    props.socket.on(`success`,data=>{
        history.push('room/'+data);
    })
  }

  function JoinRoom(){

    let formData = {"roomName":RoomName,"user":userName}
    props.socket.emit("Join Room",formData);

    props.socket.on("success",data=>{
      let encodedData = base64.encode(data);
      history.push('room/'+encodedData);
    })

  }


  return (
    <div style={{marginTop:'5%'}}>

        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={5}
        >
          <Grid item xs={2}>
                <input type="text" onChange={(e)=>setRoomName(e.target.value)} />
                <Button variant="contained" color="primary" type="submit" onClick={connectToRoom}>Create Room </Button>
          </Grid>

          <Grid item xs={2}>
                <input type="text" onChange={(e)=>setRoomName(e.target.value)} />
                <input type="text" onChange={(e)=>setUserName(e.target.value)} />
                <Button variant="contained" color="secondary" type="submit" onClick={JoinRoom} >Join Room </Button>
          </Grid>
        </Grid>
    </div>
  );
}

const Home = props => (
    <SocketContext.Consumer>
      {socket => <HomePage {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default Home;