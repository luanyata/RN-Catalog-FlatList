import { Dimensions } from "react-native";

const { width } = Dimensions.get('screen');

export const SPACING = 10;
export const ITEM_WIDTH = width * 0.76;
export const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
export const VISIBLE_ITEMS = 3;
export const OVERFLOW_HEIGHT = 70;
