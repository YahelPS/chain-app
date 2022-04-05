import {
  View,
  Text,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import WebView from "react-native-webview";
import GestureRecognizer from "react-native-swipe-gestures";
import ButtonComponent from "./ButtonComponent";
import { Feather } from "@expo/vector-icons";

export default function WebModal({ callback }: { callback: any }) {
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef(null);
  return (
    <View>
      <GestureRecognizer onSwipeDown={() => setModalVisible(false)}>
        <Animated.View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "white",
                    borderRadius: 20,
                    alignSelf: "center",
                    marginBottom: 5,
                  }}
                />
                <WebView
                  ref={ref}
                  style={{ borderRadius: 20 }}
                  allowsInlineMediaPlayback={true}
                  source={{
                    uri:
                      "https://auth.riotgames.com/authorize?scope=account%20openid&client_id=play-valorant-web-prod&redirect_uri=https://playvalorant.com/opt_in&response_type=token%20id_token&nonce=1",
                  }}
                  thirdPartyCookiesEnabled={true}
                  cacheEnabled={true}
                  userAgent={
                    Platform.OS === "android"
                      ? "Chrome/18.0.1025.133 Mobile Safari/535.19"
                      : "AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75"
                  }
                  onNavigationStateChange={(e) => {
                    console.log(e.url);

                    if (!e.url.startsWith("https://playvalorant.com/opt_in"))
                      return;

                    const params = e.url
                      .split(/[?&]/)[0]
                      .split("#")
                      .splice(1)
                      .map((e) => {
                        const parts = e.split("=");
                        const name = parts[0];
                        const value = parts[1];
                        const obj = {};
                        //@ts-ignore
                        obj[name] = value;
                        return obj;
                      })[0];
                    //@ts-ignore

                    if (!params?.access_token) return;
                    //@ts-ignore
                    ref.current.stopLoading();
                    setModalVisible(false);
                    //@ts-ignore
                    callback(params.access_token);
                  }}
                />
              </View>
            </View>
          </Modal>
          <ButtonComponent
            title="Login with Valorant"
            variant="valorant"
            onPress={() => setModalVisible(true)}
          />
        </Animated.View>
      </GestureRecognizer>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderTopColor: "white",
    marginTop: 30,
    borderRadius: 20,
    // padding: 5,
    // backgroundColor: "white",
    height: "90%",
    width: "90%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
