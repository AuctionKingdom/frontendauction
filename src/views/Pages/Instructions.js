import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";

export const Instructions = () => {
return (
    <Grid ite md={2} xs={10}>
        <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 2000, exit: 1000 }}
          >
    <Paper
      elevation={15}
      style={{paddingTop:'20px', marginTop: "5%", paddingBottom: "40px", }}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={6}
        style={{ paddingTop: "5%" }}
      >
        <Grid item xs={6} style={{ backgroundColor : "#61047F", borderRadius:"4px", color: "white" }}>
          <Typography style={{textAlign:'center'}} variant="h6">
              HOW TO PLAY ?
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography style={{textAlign:'left'}} variant="body1">
              1. Enter the Room Size(4-10). Create Room.
              <hr></hr>
              2. After room creation, share the <span style={{color : "Red"}}>Room ID</span> to your playmates.
              <hr></hr>
              3.Find your <span style={{color : "Red"}}>Room ID</span> by clicking the icon to your top left corner.
          </Typography>
        </Grid>
        <Grid item xs={10}>
            <Typography style={{textAlign:'center'}} variant="body1">
                Have a nice play!
            </Typography>
        </Grid>
      </Grid>
    </Paper>
    </Slide>
</Grid>
);

} 
