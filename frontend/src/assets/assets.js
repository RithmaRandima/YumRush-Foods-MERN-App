import HomeBgImage from "./header-background.jpg";
import newsletterBg from "./newsletter-bg.jpg";
import newsletterTacos from "./newsletter-tacos.png";
import newsletterSandwitch from "./newsletter-sandwitch.png";
import headingLeaf from "./heading-leaf.png";

import menu_1 from "./menu-item-1.png";
import menu_2 from "./menu-item-2.png";
import menu_3 from "./menu-item-3.png";
import menu_4 from "./menu-item-4.png";
import menu_5 from "./menu-item-5.png";
import menu_6 from "./menu-item-6.png";
import menu_7 from "./menu-item-7.png";
import menu_8 from "./menu-item-8.png";

import food_item_1 from "./caesar-salad.jpg";

import food_item_2 from "./greek-salad.jpg";
import food_item_3 from "./nicoise-salad.jpg";
import food_item_4 from "./waldorf-salad.jpg";

import food_item_5 from "./caprese-salad.jpg";
import food_item_6 from "./cobb-salad.jpg";

export const mainImgObject = {
  HomeBgImage,
  newsletterBg,
  newsletterTacos,
  newsletterSandwitch,
  menu_8,
  menu_1,
  headingLeaf,
};

export const menu_list = [
  {
    menu_name: "Salad",
    menu_image: menu_1,
  },
  {
    menu_name: "Rolls",
    menu_image: menu_2,
  },
  {
    menu_name: "Deserts",
    menu_image: menu_3,
  },
  {
    menu_name: "Sandwitch",
    menu_image: menu_4,
  },
  {
    menu_name: "Cake",
    menu_image: menu_5,
  },
  {
    menu_name: "Pure Veg",
    menu_image: menu_6,
  },
  {
    menu_name: "Pasta",
    menu_image: menu_7,
  },
  {
    menu_name: "Noodles",
    menu_image: menu_8,
  },
];

export const food_list = [
  {
    _id: 1,
    name: "Caesar Salad",
    image: food_item_1,
    price: 12,
    description: "Food is really tasty",
    category: "Salad",
  },
  {
    _id: 2,
    name: "Greek salad",
    image: food_item_2,
    price: 12,
    description: "Food is really tasty",
    category: "Rolls",
  },
  {
    _id: 3,
    name: "Nicoise salad",
    image: food_item_3,
    price: 12,
    description: "Food is really tasty",
    category: "Rolls",
  },
  {
    _id: 4,
    name: "Waldorf salad",
    image: food_item_4,
    price: 12,
    description: "Food is really tasty",
    category: "Rolls",
  },
  {
    _id: 5,
    name: "caprese salad",
    image: food_item_5,
    price: 12,
    description: "Food is really tasty",
    category: "Rolls",
  },
  {
    _id: 6,
    name: "cobb salad",
    image: food_item_6,
    price: 12,
    description: "Food is really tasty",
    category: "Rolls",
  },
];
