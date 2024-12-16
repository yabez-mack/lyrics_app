import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
  Animated,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { Link, Stack,useNavigation, useRouter } from "expo-router";
// import single_song from "../single_song";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Suggestions from "../Suggestions";
import colours from "../colours";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";

// import FloatingButton from './FloatingButton';
export default function HomeScreen() {
  //   const requestOptions={}
  const colorScheme = useColorScheme();
  const router = useRouter();
  var pos: any;
  let text = "";
  const [defaults, setDefault] = useState(pos);
  const [posts, setPosts] = useState(pos);
  useEffect(() => {
    get_songs();
  }, []);
  const get_songs = () => {
    fetch("http://13.60.52.40/get_song_name", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
        setDefault(data.data);
      });
  };
  const delete_song = (item: any) => {
    let body: any;
    body = {
      id: item,
    };
    fetch("http://13.60.52.40/delete_song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          get_songs();
          Alert.alert("Deleted Successfully");
        } else {
          Alert.alert(data.message);
        }
      });
  };
  const delete_press = (data: any) => {
    Alert.alert(
      `Delete ${data.name}`,
      "Cannot be Recovered",
      [
        {
          text: "Cancel",
          // onPress: () => console.log('Cancel Pressed'),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            delete_song(data.id);
          },
        },
      ],
      { cancelable: false }
    );
  };
  const button_press = (data: any) => {
    // router.push("/details")
    AsyncStorage.setItem("song", JSON.stringify(data));
   
  };
  const filterdata = (text: any) => {
    if (text) {
      let value = defaults.filter(function (item: any) {
        let name = item.name ? item.name.toLowerCase() : item.name;
        let texts = text ? text.toLowerCase() : text;
        return name.includes(texts);
      });
      // let value=posts.filter(function (el:any) {
      //   return el.name.includes(text)
      // });
      setPosts(value);
    } else {
      setPosts(defaults);
    }
  };
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider
        style={{
          backgroundColor:
            Colors[colorScheme === "dark" ? "dark" : "light"].safe_area,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            paddingTop: 18,
            paddingBottom: 18,
            paddingRight: 20,
            paddingLeft: 10,
            marginTop: 50,
            marginBottom: 20,
            backgroundColor:
              Colors[colorScheme === "dark" ? "dark" : "light"]
                .search_box,
            // ighlightBlack,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginLeft: 20,
            marginRight: 20,
            
            elevation: 1
            
        
            
          }}
        >
          <EvilIcons
            name="search"
            style={{
              marginLeft: 10,
            }}
            size={30}
            color="#07CCBA"
          />
          <TextInput
            editable
            style={{
              flex: 1,
              fontSize: 16,
              textAlign: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              color:
                Colors[colorScheme === "dark" ? "dark" : "light"]
                  .secondary_text,
            }}
            onChangeText={(text) => filterdata(text)}
            // value={text}
            placeholder="Search song"
            placeholderTextColor={Colors[colorScheme === "dark" ? "dark" : "light"].secondary_text}

            // clearButtonMode="always"
          />
        </View>

        <FlatList
          onScrollBeginDrag={Keyboard.dismiss}
          data={posts}
          // styles={{ alignSelf: 'stretch' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => delete_press(item)}
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "nowrap",
                elevation: 2,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 18,
                paddingRight: 12,
                marginLeft: 14,
                marginRight: 14,
                marginTop: 0,
                marginBottom: 10,
                borderRadius: 15,
                // backgroundColor: colours.tertiaryBlack,
                backgroundColor:
                  Colors[colorScheme === "dark" ? "dark" : "light"].card,
              }}
              // onPress={() => button_press(item)}
            >
              {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
              {item.image ? (
                <Image style={styles.image} source={{ uri: item.image }} />
              ) : (
                <Image
                  style={styles.image}
                  source={require("../../assets/images/user.png")}
                />
              )}
              <Link
                href="/single_song"
                style={{
                  color:
                    Colors[colorScheme === "dark" ? "dark" : "light"]
                      .search_contanier_text,
                  fontWeight: "800",

                  paddingBottom: 2,
                }}
                onPress={() => button_press(item)}
              >
                <View style={styles.detailsContainer}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color:
                        Colors[colorScheme === "dark" ? "dark" : "light"]
                          .search_contanier_text,
                      fontWeight: "800",

                      paddingBottom: 2,
                    }}
                  >
                    {item.serial_no}
                    {" - "}
                    {item.name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      color:
                        Colors[colorScheme === "dark" ? "dark" : "light"]
                          .secondary_text,

                      paddingBottom: 2,
                    }}
                  >
                    {item.artist}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      color:
                        Colors[colorScheme === "dark" ? "dark" : "light"]
                          .secondary_text,

                      paddingBottom: 2,
                    }}
                  >
                    {item.album}
                  </Text>
                </View>
              </Link>
              <Link
                style={styles.edit}
                href="/edit_song"
                onPress={() => button_press(item)}
              >
                {/* <EvilIcons  name="chevron-right" size={54} color="#333" /> */}
                <Entypo
                  name="edit"
                  size={23}
                  style={{
                    color:
                      Colors[colorScheme === "dark" ? "dark" : "light"]
                        .secondary_text,
                  }}
                />
              </Link>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Animated.View style={[styles.floating, { transform: [{ scale }] }]}>
          <TouchableOpacity
            // style={styles.floating}
            activeOpacity={1}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <MaterialIcons
              onPress={() => get_songs()}
              name="refresh"
              size={35}
              style={styles.edit_icon}
            />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
  // const colorScheme = useColorScheme();
}

//  Styles

const styles = StyleSheet.create({
  safeView: {},
  edit: {
    position: "absolute",
    right: 25,
  },
  edit_icon: {
    color: Colors["unique"].background,

    // color: Colors[colorScheme === "dark" ? "dark" :"light"].search_contanier_text,
  },
  floating: {
    position: "absolute",
    bottom: 10,
    // left: 200,
    right: 10,

    width: 70,
    // backgroundColor:"black",
    backgroundColor: Colors["unique"].floating,

    // backgroundColor: Colors[colorScheme === "dark" ? "dark" :"light"].search_contanier,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",

    height: 70,

    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: Colors[colorScheme === "dark" ? "dark" :"light"].search_contanier,

  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingTop: 40,
  //   paddingBottom: 30,
  // },
  input: {},
  logo: {
    width: 160,
    height: 160,
    marginBottom: 60,
    marginTop: 40,
  },
  searchContainer: {},
  TextInput: {
    paddingTop: 18,
    paddingBottom: 18,
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    color: colours.primaryWhite,
  },
  Suggestions: {
    flex: 1,
    alignItems: "center",

    color: colours.primaryWhite,
  },
  creditsContainer: {
    flexDirection: "row",
    width: 170,
  },
  creditsText: {
    fontSize: 12,
    color: colours.secondaryGrey,
    textAlign: "left",
    paddingLeft: 20,
  },
  creditsImage: {
    width: 30,
    height: 30,
    opacity: 0.2,
    alignSelf: "flex-start",
  },
  suggestionItem: {},
  image: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    alignSelf: "center",
    borderColor: colours.primaryWhite,
    borderWidth: 2,
    marginRight: 17,
    flex: 0,
  },
  detailsContainer: {
    width: 145,
    marginRight: 20,
  },
  songTitle: {},
  artistDetails: {},
  TextInput1: {},
});
