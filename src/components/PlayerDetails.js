import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import GavelIcon from "@material-ui/icons/Gavel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    marginBottom: "10px"
  },
  list: {
    marginTop: 10,
    display: "flex",
    borderRadius: "10px",
    boxShadow: "1px 5px 10px #888888",
    padding: "10px",
    marginRight: "10px"
  },
}));

export default function PlayerDetails(props) {
  const classes = useStyles();
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.users && props.player.highestBidder)
      setName(JSON.parse(props.users[props.player.highestBidder])["name"]);
    else {
      setName("");
    }
  }, [props.users, props.player.highestBidder]);

  return (
    <List className={classes.root}>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <AssignmentIndIcon style={{ color: "blue" }} />
        </ListItemAvatar>
        <ListItemText primary="Type" secondary={props.player.type} />
      </ListItem>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <MonetizationOnIcon style={{ color: "red" }} />
        </ListItemAvatar>
        <ListItemText primary="BaseBid" secondary={props.player.base} />
      </ListItem>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <GavelIcon style={{ color: "brown" }} />
        </ListItemAvatar>
        <ListItemText primary="MaxBidder" secondary={name} />
      </ListItem>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <GavelIcon style={{ color: "green" }} />
        </ListItemAvatar>
        <ListItemText
          primary="currentBid"
          secondary={props.player.currentBid}
        />
      </ListItem>
    </List>
  );
}
