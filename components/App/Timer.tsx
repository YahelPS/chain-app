import React, { useEffect, useState } from "react";
import { Text } from "../../themes/Theme";

export default function Timer({ time }: any) {
  const [timer, setTimer] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  });
  function secsToTime(secs: number) {
    let d = (secs / 8.64e4) | 0;
    let H = ((secs % 8.64e4) / 3.6e3) | 0;
    let m = ((secs % 3.6e3) / 60) | 0;
    let s = secs % 60;
    let z = (n: number) => (n < 10 ? "0" : "") + n;
    let str = `${z(H)}:${z(m)}:${z(s)}`;
    if (d < 1) return str;
    str = `${d}:${str}`;
    return str;
  }
  return <Text variant="valorantTime">{secsToTime(timer)}</Text>;
}
