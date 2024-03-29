import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { ReactElement, useEffect, useState } from "react";

export type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (promises: Promise<void | void[]>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setReady(true), 1000);
  }, []);
  usePromiseAll(
    //@ts-ignore
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  fonts?: FontSource;
  assets?: any;
  children: any;
}

const LoadAssets = ({ assets, fonts, children }: LoadAssetsProps) => {
  const ready = useLoadAssets(assets || [], fonts || {});

  if (!ready) {
    return <AppLoading />;
  }
  return children;
};

export default LoadAssets;
