import {
  createRestyleComponent,
  createText,
  createTheme,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import ButtonComponent from "../components/App/ButtonComponent";

export const colors = {
  valorant: "#ff4454",
  "valorant.yellow": "#e1e5ab",
  black: "#000000",
  white: "#ffffff",
  "grey.800": "#323f4b",
  "grey.400": "#7b8794",
  "grey.200": "#cbd2d9",
  "grey.100": "#e3e7eb",
  grey: "#f5f7fa",
  "primary.800": "#093269",
  "primary.600": "#1264d1",
  "primary.500": "#2f80ed",
  "primary.200": "#acccf8",
  "primary.100": "#d5e6fb",
  "positive.600": "#1a6234",
  "positive.400": "#34c369",
  "positive.200": "#97e3b3",
  "positive.100": "#cbf1d9",
  "negative.600": "#8d0909",
  "negative.400": "#e02b2b",
  "negative.200": "#f99c9c",
  "negative.100": "#fccece",
  "warning.600": "#775e0d",
  "warning.400": "#e7b820",
  "warning.200": "#f3db90",
  "warning.100": "#f9edc7",
};

export const theme = createTheme({
  colors: {
    textPrimary: colors.black,
    ...colors,
  },
  textVariants: {
    heading1: {
      fontFamily: "Mulish-Bold",
      fontSize: 32,
      fontWeight: "800",
      color: "textPrimary",
    },
    heading2: {
      fontFamily: "Mulish-Bold",
      fontSize: 24,
      fontWeight: "700",
      color: "textPrimary",
    },
    heading3: {
      fontFamily: "Mulish-Bold",
      fontSize: 20,
      color: "textPrimary",
    },
    heading4: {
      fontFamily: "Mulish-Bold",
      fontSize: 16,
      color: "textPrimary",
    },
    label: {
      fontFamily: "Mulish-Bold",
      fontSize: 14,
      fontWeight: "300",
      color: "textPrimary",
    },
    body: {
      fontFamily: "Mulish-Regular",
      fontSize: 14,
      fontWeight: "300",
      color: "textPrimary",
    },
    valorantTime: {
      color: "valorant.yellow",
      fontSize: 20,
      // fontFamily: "Valorant",

      fontWeight: "700",
    },
    valorantTitle: {
      color: "white",
      fontWeight: "bold",
      fontSize: 25,
      fontFamily: "Mulish-Bold",
    },
    fortniteTitle: {
      color: "white",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,

      elevation: 17,
      fontWeight: "bold",
      fontSize: 25,
      fontFamily: "Mulish-Bold",
    },
  },
  spacing: {
    2: 8,
    4: 16,
    6: 24,
    8: 32,
    10: 40,
  },
  breakpoints: {},
});

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    textPrimary: colors.white,
  },
};

type Theme = typeof theme;

// Components
export const Text = createText<Theme>();
