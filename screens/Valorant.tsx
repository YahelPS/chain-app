import { Feather } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../components";
import ButtonComponent from "../components/App/ButtonComponent";
import Input from "../components/App/Input";
import ListPicker from "../components/App/ListPicker";
import { colors } from "../themes/Theme";
import formatQuery from "../utils/formatQuery";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  axiosCache,
  cache,
  Headers,
  UserInfo,
  UserStore,
} from "../apis/Valorant";

const NavigationTabs = [
  {
    id: "eu",
    name: "EU",
  },
  {
    id: "na",
    name: "NA",
  },
  {
    id: "ap",
    name: "Asia",
  },
  {
    id: "kr",
    name: "Korea",
  },
];

interface HeaderProps {
  username: string;
  password: string;
  region: string;
}

export default function ValorantScreen({ navigation }: { navigation: any }) {
  useEffect(() => {
    const cachedStore = Object.entries(axiosCache.store.store).find(([key]) => {
      return key.includes("storefront");
    });
    if (!cachedStore?.[0]) return;

    if (Object.keys(axiosCache.store).some((key) => key.includes(""))) {
      navigation.replace("ValorantStore", {
        store: axiosCache.store.store?.[cachedStore?.[0]].data,
      });
    }
  }, []);

  async function getHeaders({ username, password, region }: HeaderProps) {
    const headers = await Headers({ username, password, region });
    const store = await UserStore(headers);

    navigation.replace("ValorantStore", { store, headers });
    return headers;
  }

  const [selectedRegion, setSelectedRegion] = useState("eu");
  const [username, setUsername] = useState("RadNotRed");
  const [password, setPassword] = useState(
    "qatWj^GhSUgap84VX#2hJPCKbQz$FHkLhF*p"
  );

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text
        variant="heading1"
        textAlign="center"
      >{`Login to your\nValorant Account`}</Text>
      <Input
        value={username}
        label="Riot ID"
        onChangeText={setUsername}
        placeholder="egirlslayer"
        keyboardType="email-address"
        icon={<Feather name="user" color={colors["grey.400"]} size={22} />}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        label="Riot Password"
        placeholder="*********"
        icon={<Feather name="lock" color={colors["grey.400"]} size={22} />}
      />
      <View style={{ alignItems: "center" }}>
        <Text variant="label">Region</Text>
        <ListPicker
          items={NavigationTabs}
          //@ts-ignore
          onPress={(_) => setSelectedRegion(_.id)}
          //@ts-ignore
          selected={selectedRegion}
          itemWidth={80}
          buttonStyle={[
            {
              backgroundColor: "transparent",
              borderColor: colors.valorant,
              marginRight: 5,
            },
          ]}
          textStyle={{
            color: colors.white,
          }}
          activeBackgroundColor={colors.valorant}
        />
      </View>
      <ButtonComponent
        title="Login"
        variant="valorant"
        onPress={() =>
          getHeaders({ username, password, region: selectedRegion })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
