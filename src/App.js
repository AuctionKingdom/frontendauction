import React,{useState} from 'react';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as Constants from './components/constants';
import socketIOClient from 'socket.io-client';
import FormControl from '@material-ui/core/FormControl';

let socket;

function App() {

  const [RoomName,setRoomName] = useState("");
  const [Connected,setConnection] = useState(0);
  const [Information,setInformation] = useState("");

  function connectToServer(){
    if(!Connected){
      socket = socketIOClient(Constants.socketlink);
      socket.on("Connected",data=>{
        setConnection(1);
      });
    }
  }

  function connectToRoom(){
    let formData = {"roomName":RoomName}
    console.log(formData.roomName)
    socket.emit("Create Room",formData);

    socket.on("Information",data=>{
        setInformation(Information+"<br>"+data);
    })
  }


  function disConnect(socket){
    socket.emit("disconnect");
  }


  return (
    <div className="App">
        <Button variant="contained" color="primary" onClick={connectToServer}>
          Connect
        </Button>
        <p> Connection to the Bid room: {Connected} </p>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
        >
          <Grid item xs={12}>
                <input type="text" onChange={(e)=>setRoomName(e.target.value)} />
                <input type="submit" onClick={connectToRoom} />
          </Grid>
          <Grid item xs={12}>
             <Button variant="contained" color="primary" onClick={disConnect}>
                  Bid
             </Button>
          </Grid>
          <Grid item xs={12}>
              <Button variant="contained" color="primary">
                  Pass
              </Button>
          </Grid>
          <p>{Information}</p>
        </Grid>
    </div>
  );
}

export default App;
