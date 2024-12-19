import {
  StyleSheet,
  Image,
  Platform,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import colours from "../colours";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

// import FloatingButton from './FloatingButton';
// import DeviceInfo from 'react-native-device-info';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  var pos: any = {
    name: "",
    song: "",
    serial_no: "",
    artist: "",
    image: "",
    index: "",
    album: "",
    language: "",
    video_url: "",
  };
  const [height, setHeight] = useState(0);
  const [posts, setPosts] = useState(pos);
  const [name, setName] = useState("");
  const [song, setSong] = useState("");
  const [serial_no, setSerial_no] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");
  const [index, setIndex] = useState("");
  const [album, setAlbum] = useState("");
  const [language, setLanguage] = useState("");
  const [video_url, setVideo_url] = useState("");
  const submit = () => {
    if (!serial_no) {
      Alert.alert("Please Enter Song No.");
    } else if (!name) {
      Alert.alert("Please Enter Song Name");
    } else if (!song) {
      Alert.alert("Please Enter Song Lyrics");
    } else {
      fetch("http://13.60.52.40/save_song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          song: song,
          serial_no: serial_no,
          artist: artist,
          image: image,
          index: serial_no,
          album: album,
          language: language,
          video_url: video_url,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            setName("");
            setSong("");
            setSerial_no("");
            setArtist("");
            setImage("");
            setIndex("");
            setAlbum("");
            setLanguage("");
            setVideo_url("");
            Alert.alert("Song Added Successfully");
          } else {
            Alert.alert(data.message);
          }
        });
    }
  };
  const clear = () => {
    setName("");
    setSong("");
    setSerial_no("");
    setArtist("");
    setImage("");
    setIndex("");
    setAlbum("");
    setLanguage("");
    setVideo_url("");
  };
  const set_name = (item: any, name: any) => {
    // // Get the device's unique ID (IMEI on Android, IDFV on iOS)
    // const uniqueId = DeviceInfo.getUniqueId();
    // console.log('Unique ID:', uniqueId);
    // // Get the device's model (e.g., iPhone X, Samsung Galaxy S10)
    // const deviceModel = DeviceInfo.getModel();
    // console.log('Device Model:', deviceModel);
    // // Get the device's brand (e.g., Apple, Samsung)
    // const deviceBrand = DeviceInfo.getBrand();
    // console.log('Device Brand:', deviceBrand);
    // // Get the device's system name (e.g., iOS, Android)
    // const systemName = DeviceInfo.getSystemName();
    // console.log('System Name:', systemName);
    // // Get the device's system version (e.g., 14.5, 11)
    // const systemVersion = DeviceInfo.getSystemVersion();
    // console.log('System Version:', systemVersion);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].safe_area,
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View>
        {/* <Text > Demo Form </Text> */}
        <Text
          style={{
            color: Colors[colorScheme ?? "light"].text,

            fontSize: 30,
            lineHeight: 45,
            fontWeight: "bold",
            paddingTop: 40,
            paddingLeft: 30,
            paddingBottom: 0,
            shadowOpacity: 0.6,
            shadowRadius: 3,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          }}
        >
          Add Song
        </Text>
        <View>
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: 40,
            }}
            onChangeText={(changedText) => setSerial_no(changedText)}
            keyboardType="numeric"
            value={serial_no}
            placeholder="Song Number"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: 40,
            }}
            onChangeText={(changedText) => setName(changedText)}
            value={name}
            placeholder="Song Name"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: 40,
            }}
            onChangeText={(changedText) => setArtist(changedText)}
            value={artist}
            placeholder="Artist Name"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: 40,
            }}
            onChangeText={(changedText) => setAlbum(changedText)}
            value={album}
            placeholder="Album Name"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: 40,
            }}
            onChangeText={(changedText) => setLanguage(changedText)}
            value={language}
            placeholder="Language"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: 40,
            }}
            onChangeText={(changedText) => setImage(changedText)}
            value={image}
            placeholder="Image URL"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: 40,
            }}
            onChangeText={(changedText) => setVideo_url(changedText)}
            value={video_url}
            placeholder="Video URL"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
          <TextInput
            style={{
              fontSize: 16,
              color: colours.tertiaryBlack,
              borderColor: colours.primaryTeal,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: colours.primaryWhite,
              borderRadius: 20,
              height: Math.max(80, height),
            }}
            onContentSizeChange={(event) =>
              setHeight(event.nativeEvent.contentSize.height)
            }
            onChangeText={(changedText) => setSong(changedText)}
            multiline={true}
            value={song}
            placeholder="Song Lyrics"
            placeholderTextColor="#36454F"
            clearButtonMode="always"
          />
        </View>
      </View>
      <View style={styles.button_set}>
        <Pressable style={styles.button_1} onPress={(event) => submit()}>
          <Text style={styles.text}>SUBMIT</Text>
        </Pressable>
        <Pressable style={styles.button_2} onPress={(event) => clear()}>
          <Text style={styles.text}>RESET</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button_set: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  safeView: {},
  TextInput: {},

  songHeading: {},
  button_1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#17B169",
    // width:150,
    flexDirection: "column",
    flex: 1,
    alignSelf: "center",
  },
  button_2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#36454F",
    // width:150,
    flexDirection: "column",
    flex: 1,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  mainConatinerStyle: {
    flexDirection: "column",
    flex: 1,
  },
  floatingMenuButtonStyle: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 35,
  },
});
