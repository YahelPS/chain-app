import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Like from "../App/Like";
import Toast from "react-native-toast-message";
import { colors } from "../../themes/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function GameBanner({
  game,
  source,
  liked,
}: {
  game: string;
  source: any;
  liked: boolean;
}) {
  const [like, setLike] = useState(liked);
  const [enabled, setEnabled] = useState(false);
  return (
    <TouchableOpacity
      style={{ position: "relative" }}
      onPress={() => setEnabled(!enabled)}
    >
      <Image
        source={source}
        style={{
          height: 200,
          width: 150,
          borderRadius: 15,
          marginTop: 10,
          borderWidth: 1,
          borderColor: colors["grey.100"],
          opacity: enabled ? 1 : 0.3,
        }}
      />
      {/* <View style={{ position: "absolute", right: 0, top: 10 }}>
        <Like
          liked={liked}
          onPress={() => {
            setLike(!like);
            like &&
              Toast.show({
                type: "success",
                text1: `Removed ${game} from your library.`,
                text2: "Tap to undo",
                position: "bottom",
              });
          }}
        />
      </View> */}
    </TouchableOpacity>
  );
}
