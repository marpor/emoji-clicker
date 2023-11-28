"use strict";
/**
  Upgrades
  
  Possible upgrade types:
  
   click - Increases the amount of emojis generated per click by the player.
     Value: Numeric (e.g. 1, 2, 10...) representing the extra clicks gained.
  
   auto - Provides automatic clicks per second without player's interaction.
     Value: Numeric (e.g. 1, 2, 5...) representing the number of auto-clicks per second.
  
   farm - Adds to the passive production of emojis per second.
     Value: Numeric (e.g. 10, 20, 50...) representing the number of emojis per second.
  
   efficiency - Enhances the productivity of farms by a percentage.
     Value: Numeric decimal (e.g. 1.10, 1.20...) representing the efficiency multiplier.
  
   speed - Increases the rate at which the game's tick function is called.
     Value: Numeric decimal (e.g. 1.05, 1.10...) representing the speed multiplier.
  */

const upgrades = [
  {
    emoji: "👆",
    name: "Extra Click",
    description: "+1 click",
    cost: 10,
    type: "click",
    value: 1,
  },
  {
    emoji: "👋",
    name: "Double Click",
    description: "+2 clicks",
    cost: 50,
    type: "click",
    value: 2,
  },
  {
    emoji: "👵",
    name: "Grandma",
    description: "+10 clicks",
    cost: 500,
    type: "click",
    value: 10,
  },
  {
    emoji: "😎",
    name: "Cool",
    description: "+100 clicks",
    cost: 5000,
    type: "click",
    value: 100,
  },
  {
    emoji: "👿",
    name: "Devil",
    description: "+1000 clicks",
    cost: 50000,
    type: "click",
    value: 1000,
  },
  {
    emoji: "⏱️",
    name: "Auto-Clicker",
    description: "+1 click per second",
    cost: 100,
    type: "auto",
    value: 1,
  },
  {
    emoji: "👩‍🌾",
    name: "Farmer",
    description: "10 emoji/s",
    cost: 200,
    type: "farm",
    value: 10,
  },
  {
    emoji: "🐎",
    name: "Horse",
    description: "10% Better Farming",
    cost: 2000,
    type: "efficiency",
    value: 1.10,
  },
  {
    emoji: "🚜",
    name: "Tractor",
    description: "20% Better Farming",
    cost: 20000,
    type: "efficiency",
    value: 1.20,
  },
  {
    emoji: "🏭",
    name: "Factory",
    description: "25% Better Farming",
    cost: 200000,
    type: "efficiency",
    value: 1.25,
  },
  {
    emoji: "🚀",
    name: "Speed Boost",
    description: "10% Faster",
    cost: 1000,
    type: "speed",
    value: 1.10,
  }
];
