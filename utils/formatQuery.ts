export default function (params: Object) {
  // {username: 'a', password: 'a', region: 'a'}
  return (
    "?" +
    Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")
  );
}
