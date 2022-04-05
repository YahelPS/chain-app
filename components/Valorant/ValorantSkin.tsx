import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import CachedImage from "../App/CachedImage";
import { Text } from "..";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { GetContentTiers, GetWeapons } from "../../apis/Valorant";

interface SkinProps {
  image: string;
  name: string;
  time: string;
  video: string;
  uuid: string;
}

export default function ValorantSkin({ image, name, video, uuid }: SkinProps) {
  const player = React.useRef<any>(null);
  const [color, setColor] = useState<string>("5a9fe233");
  const [isModalVisible, setModalVisible] = useState(false);

  //@ts-ignore
  useEffect(async () => {
    const fetchedWeapons = await GetWeapons();
    console.log(uuid);

    const contentTier = fetchedWeapons?.data
      ?.find((weapon: any) =>
        weapon.skins.some((skin: any) =>
          skin.levels.find((level: any) => level.uuid === uuid)
        )
      )
      ?.skins.find((skin: any) =>
        skin.levels.some((level: any) => level.uuid === uuid)
      )?.contentTierUuid;

    // console.log(contentTier ?? `null for ${name}`);
    const tier = await GetContentTiers(contentTier);
    setColor(tier.data.highlightColor);
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <LinearGradient
      colors={[`#${color}`, "transparent"]}
      start={[0, 1]}
      end={[0, 0]}
      style={{
        ...styles.container,
        borderColor: `#${color}`,
        borderWidth: 1,
        // backgroundColor: "#00958733",
        borderRadius: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (!video) {
            Toast.show({
              type: "error",
              text1: "Sorry, there is no available video for this skin.",
            });

            toggleModal();
            return;
          }
          player.current.presentFullscreenPlayer();
          player.current.playAsync();
        }}
        style={{
          ...styles.container,
          // backgroundColor: "#00958733",
          borderRadius: 8,
        }}
      >
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View
            style={{
              backgroundColor: "white",
              height: 200,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              variant="valorantTitle"
              style={{ fontSize: 20, color: "black" }}
            >
              {name}
            </Text>
            <CachedImage
              uri={image}
              resizeMode="contain"
              style={{ height: 100, width: 300 }}
            />
          </View>
        </Modal>
        <Video
          ref={player}
          source={{
            uri: video,
          }}
          onFullscreenUpdate={(event) => {
            if (
              event.fullscreenUpdate ===
              Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS
            ) {
              player.current.pauseAsync();
            }
          }}
          useNativeControls
          style={{ width: 320, height: 180, display: "none" }}
        />
        <View style={styles.texts}>
          <Text variant="valorantTitle" style={{ fontSize: 20 }}>
            {name}
          </Text>
        </View>
        <CachedImage
          uri={image}
          style={{
            height: 40,
            transform: [{ rotate: "45deg" }],
          }}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    position: "relative",
    height: 175,
    width: 175,
    // alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    left: 20,
    maxWidth: 150,
  },
});
