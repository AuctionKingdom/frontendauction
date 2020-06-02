import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    margin: 10,
    border: "2px solid black",
  },
  section: {
    padding: 10,
    flexGrow: 1,
  },
  userContainer: {
    marginTop: 10,
    border: "2px solid black",
    backgroundColor: "skyblue",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  userDetails: {
    borderRight: "2px solid black",
    display: "flex",
    fontSize: 15,
  },
  userName: {
    fontSize: 15,
  },
  Balance: {
    fontSize: 15,
  },
  playerDetails: {
    display: "flex",
    paddingLeft: 10,
  },
});

export function PdfDocument(props) {
  //  Render all the Player name which suits the emailId

  function renderPlayerList(emailId) {
    if (props.playerList) {
      return Object.keys(props.playerList).map((key) => {
        if (JSON.parse(props.playerList[key])["highestBidder"] === emailId) {
          if (JSON.parse(props.playerList[key])["type"] === "WK-Batsman") {
            return (
              <View>
                <Text>
                  {JSON.parse(props.playerList[key])["player"]}(WK) -{" "}
                  {JSON.parse(props.playerList[key])["currentBid"]} Lakhs
                </Text>
              </View>
            );
          } else {
            return (
              <View>
                <Text>
                  {JSON.parse(props.playerList[key])["player"]} -{" "}
                  {JSON.parse(props.playerList[key])["currentBid"]} Lakhs
                </Text>
              </View>
            );
          }
        } else {
          return <View></View>;
        }
      });
    }
  }

  function renderUser() {
    if (props.users) {
      return Object.keys(props.users).map((key) => {
        return (
          <View key={key} style={styles.userContainer}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {JSON.parse(props.users[key])["name"]}{" "}
              </Text>
              <Text style={styles.Balance}>
                {JSON.parse(props.users[key])["wallet"]} Lakhs{" "}
              </Text>
            </View>
            <View style={styles.playerDetails}>{renderPlayerList(key)}</View>
          </View>
        );
      });
    } else {
      return <View></View>;
    }
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              backgroundColor: "blue",
              width: "100%",
            }}
          >
            Auction Kingdom
          </Text>
          {renderUser()}
        </View>
      </Page>
    </Document>
  );
}
