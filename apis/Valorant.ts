//@ts-nocheck
import formatQuery from "../utils/formatQuery";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

export const axiosCache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const api = axios.create({
  adapter: axiosCache.adapter,
});

export async function Headers({ accessToken }) {
  const resp = await api.get(
    `https://valorant-api.vladzich.repl.co/login/${formatQuery({
      accessToken,
    })}`
  );
  console.log(resp.data);

  return resp.data;
}

export async function UserInfo(headers: HeadersInit) {
  const resp = await api.get("https://auth.riotgames.com/userinfo", {
    headers,
  });
  return resp.data;
}

export async function UserStore(headers: HeadersInit) {
  const user = await UserInfo(headers);
  const resp = await api.get(
    `https://pd.eu.a.pvp.net/store/v2/storefront/${user.sub}`,
    { headers }
  );
  return resp.data;
}

export async function GetBundle(bundle) {
  const resp = await api.get(`https://valorant-api.com/v1/bundles/${bundle}`);
  return resp.data;
}

export async function GetSkin(skin) {
  const resp = await api.get(
    `https://valorant-api.com/v1/weapons/skinlevels/${skin}`
  );
  return resp.data;
}

export async function StoreItems(store) {
  if (cache.StoreItems) return cache.StoreItems;
  const bundle = store.FeaturedBundle.Bundle;
  const items = store.SkinsPanelLayout.SingleItemOffers;
  const itemsData = items.map(async (item) => await GetSkin(item));
  const bundleData = await GetBundle(bundle.DataAssetID);
  const res = {
    bundle: bundleData,
    items: await Promise.all(itemsData),
    itemsTimeLeft:
      store.SkinsPanelLayout.SingleItemOffersRemainingDurationInSeconds,
    bundleTimeLeft: store.FeaturedBundle.BundleRemainingDurationInSeconds,
  };
  cache.StoreItems = res;
  return res;
}

export async function GetWallet(headers: HeadersInit) {
  const userInfo = await UserInfo(headers);
  const resp = await api.get(
    `https://pd.eu.a.pvp.net/store/v1/wallet/${userInfo.sub}`,
    {
      headers,
    }
  );
  return resp.data;
}

export async function GetUsername(puuid: string) {
  let defVal = null;
  const resp = await api
    .put(`https://pd.eu.a.pvp.net/name-service/v2/players/`, `["${puuid}"]`)
    .catch((e) => (defVal = [{ GameName: "Unknown", TagLine: "User" }]));
  return defVal ? defVal : resp.data;
}

export async function GetInventory(headers: HeadersInit, puuid: string) {
  const resp = await api.get(
    `https://pd.eu.a.pvp.net/personalization/v2/players/${puuid}/playerloadout`,
    { headers }
  );
  return resp.data;
}

export async function GetMatchHistory(headers: HeadersInit) {
  const resp = await api.get(
    `https://pd.eu.a.pvp.net/match-history/v1/history/${headers.puuid}`,
    { headers }
  );
  return resp.data;
}

export async function GetMatch(matchId: string, headers) {
  const resp = await api.get(
    `https://pd.eu.a.pvp.net/match-details/v1/matches/${matchId}`,
    { headers }
  );
  return resp.data;
}

export async function GetMaps() {
  const resp = await api.get("https://valorant-api.com/v1/maps");
  return resp.data;
}

export async function GetWeapons() {
  const resp = await api.get("https://valorant-api.com/v1/weapons");
  return resp.data;
}

export async function GetContentTiers(uuid = "") {
  const resp = await api.get(
    `https://valorant-api.com/v1/contenttiers/${uuid}`
  );
  return resp.data;
}

export const cache = {};
