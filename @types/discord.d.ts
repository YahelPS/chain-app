export interface DiscordUser {
  id: String;
  username: String;
  avatar: String;
  discriminator: String;
  public_flags: integer;
  flags: integer;
  banner: String;
  banner_color: String;
  accent_color: integer;
  locale: String;
  mfa_enabled: Boolean;
  premium_type: integer;
  email: String;
  verified: Boolean;
}
