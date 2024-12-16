/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const primaryBlack = "#101010";
const secondaryWhite = "#f3f3f3";
const clearWhite = "#FAF9F6";
const secondaryBlack = "#1D1D1D";
const tertiaryBlack = "#141414";
const tertiaryWhite = "#F8FAFC";
const highlightBlack = "#0B0B0B";
const primaryWhite = "#fff";
const primaryTeal = "#07CCBA";
const secondaryTeal = "#d0e3e3";
const terriaryTeal = "#8ce7e0";
const primaryGrey = "#AAAAAA";
const secondaryGrey = "#3E3E3E";
const primeWhite = "#FAF9F6";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: primaryTeal,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryTeal,
    safe_area: secondaryWhite,
    search_contanier: tertiaryWhite,
    search_contanier_text: highlightBlack,
    secondary_text: secondaryGrey,
    card: tertiaryWhite,
    search_box:tertiaryWhite,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    safe_area: primaryBlack,
    search_contanier: highlightBlack,
    search_contanier_text: secondaryWhite,
    secondary_text: primaryGrey,
    card: highlightBlack,
    search_box:highlightBlack,
  },
  unique:{
    text: "#11181C",
    background: "#fff",
    floating:primaryTeal,
    secondary_text:primaryGrey,
    slider:primeWhite,
  }
};
