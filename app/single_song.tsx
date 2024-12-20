import { Link, Stack } from "expo-router";
import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colours from "./colours";
// import WebView from "react-native-webview";

import YoutubeIframe from "react-native-youtube-iframe";
import { Alert } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
// import { LinearGradeint } from 'expo';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

// import FloatingButton from './FloatingButton';
export default function single_song() {
  const colorScheme = useColorScheme();
  var pos: any = { name: "", id: "" };
  var pos2: any = { isReady: "", status: "", error: "" };
  const [state, setState] = useState(pos2);
  const [posts, setPosts] = useState(pos);
  const [font_size, setFont_size] = useState(24);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("song");
      if (value !== null) {
        // We have data!!
        let val = JSON.parse(value);
        val.song = val.song.replace(/\\n/g, "\n");
        if (val.video_url) {
          val.video_url = val.video_url.split("?v=")[1];
        }
        setPosts(val);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("settings").then((data) => {
      if (data) {
        setFont_size(Number(data));
      }
    });

    _retrieveData();
  }, []);
  const set_font = (item: any) => {
    setFont_size(item);
    AsyncStorage.setItem("settings", String(item));
  };
  return (
    <>
      <Stack.Screen options={{ title: "Song" }} />

      <ScrollView
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].safe_area,
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          {/* <ImageBackground
            source={require("../assets/images/partial-react-logo.png")}
            style={styles.backgroundImage}
          > */}
          {/* <Expo.LinearGradient
              colors={['transparent', colours.primaryBlack]}
              locations={[0.4, 1.2]}
              style={styles.gradient}
            /> */}
          {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} ></LinearGradient> */}

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-evenly",
              paddingTop: 30,
              paddingBottom: 10,
              paddingLeft: 19,
              paddingRight: 19,
            }}
          >
            <ThemedText
              style={{
                color: Colors[colorScheme ?? "light"].text,
                fontSize: 30,
                lineHeight: 35,
                fontWeight: "300",
                paddingBottom: 7,
                shadowOpacity: 0.6,
                shadowRadius: 3,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                alignSelf: "center",
              }}
            >
              {posts.serial_no}
              {" - "}
            </ThemedText>
            <ThemedText
              style={{
                color: Colors[colorScheme ?? "light"].text,

                fontSize: 45,
                lineHeight: 60,

                fontWeight: "bold",
                paddingBottom: 0,
                shadowOpacity: 0.6,
                shadowRadius: 3,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                alignSelf: "center",
              }}
            >
              {posts.name}
            </ThemedText>
          </View>
          {/* </ImageBackground> */}
        </View>

        <View style={{ flex: 1, paddingLeft: 19, paddingRight: 19 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              marginBottom: 30,
            }}
          >
            {/* <Image
              style={styles.albumImage}
              source={{ uri: album.cover_medium }}
            /> */}
          </View>
          {/* {this.displayLyrics()} */}
        </View>
        <View style={styles.creditsContainer}>
          <ThemedText
            style={{
              color: Colors[colorScheme ?? "light"].text,
              lineHeight: font_size + 10,
              paddingBottom: 20,
              marginRight: 25,
              marginLeft: 25,
              flexWrap: "wrap",
              fontSize: font_size,
            }}
          >
            {posts.song}
          </ThemedText>

          {/* <Text>{posts.song}</Text> */}
        </View>
        <View style={styles.slider}>
          <Slider
          trackStyle={{backgroundColor:Colors["unique"].slider}}
          minimumTrackStyle={{backgroundColor:Colors["unique"].floating}}
          thumbStyle={{backgroundColor:Colors["unique"].floating}}
            minimumValue={12}
            maximumValue={70}
            value={font_size}
            onValueChange={(value) => set_font(Number(value))}
          />
        </View>
        {posts.video_url ? (
          <View style={{ flex: 1 }}>
            <YoutubeIframe
              height={300}
              play={false}
              videoId={posts.video_url}
            />
          </View>
        ) : (
          ""
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container1: {},
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  gradient: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: { flex: 1, minHeight: 360, flexDirection: "row" },
  artistHeading: {},
  songHeading: {},
  albumImage: {
    width: 130,
    height: 20,
    borderRadius: 130 / 2,
    borderWidth: 3,
    borderColor: colours.primaryWhite,
    marginRight: 25,
  },
  detailsHeading: {
    // color: Colors[colorScheme ?? "light"].text,

    marginBottom: 3,
  },
  details: {
    // color: Colors[colorScheme ?? "light"].text,
    fontWeight: "bold",
    marginRight: 25,
    marginLeft: 25,
    flexWrap: "wrap",
    marginBottom: 25,
    fontSize: 26,
  },
  lyrics: {},
  creditsContainer: {
    flex: 1,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 40,
    alignItems: "stretch",
    justifyContent: "center",
    color: "white",
  },
});
