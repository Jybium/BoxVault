// Jersey Images
import firstJersey from "@/images/kit1.jpg"
import secondJersey from "@/images/kit2.jpg"
import thirdJersey from "@/images/kit3.jpg"
import fourthJersey from "@/images/kit4.jpg"
import fifthJersey from "@/images/kit5.jpg"
import sixthJersey from "@/images/kit6.png"
import seventhJersey from "@/images/kit7.png"
import eighthJersey from "@/images/kit8.png"
import ninthJersey from "@/images/kit9.png"


// Trophies Images
import firstTrophy from "@/images/b1.png";
import secondTrophy from "@/images/b2.png";
import thirdTrophy from "@/images/b3.png";
import fourthTrophy from "@/images/b4.png";
import fifthTrophy from "@/images/b5.png";
import sixthTrophy from "@/images/b6.png";
import seventhTrophy from "@/images/b7.png";

// Moments Image
import firstMoment from "@/images/m1.jpg";
import secondMoment from "@/images/m2.jpg";
import thirdMoment from "@/images/m3.jpg";
import fourthMoment from "@/images/m4.jpg";
import fifthMoment from "@/images/m5.jpg";
import sixthMoment from "@/images/m6.jpg";
import seventhMoment from "@/images/m7.jpg";

// Jersey Images
const jerseyImages = [
 firstJersey,
 secondJersey,
 thirdJersey,
 fourthJersey,
 fifthJersey,
 sixthJersey,
 seventhJersey,
 eighthJersey,
 ninthJersey
]

// Trophies Images
const trophyImages = [
firstTrophy,
secondTrophy,
 thirdTrophy,
 fourthTrophy,
 fifthTrophy,
 sixthTrophy,
 seventhTrophy
];

// Moments Images
const momentImages = [
firstMoment,
secondMoment,
 thirdMoment,
 fourthMoment,
 fifthMoment,
 sixthMoment,
 seventhMoment
];


// Define the interface for a jersey item
interface Item {
    id: number;
    name: string;
    title: string;
    imageURL: string;
    category: string;
}

const jerseyItems: Item[] = [];
const trophyItems: Item[] = [];
const momentItems: Item[] = [];


// Add jersey items
for (let i = 0; i < 7; i++) {
  jerseyItems.push({
    id: i + 1,
    name: `#Jersey - ${(i + 1).toString().padStart(4, "0")}`,
    title: "Soccer Jersey",
    imageURL: jerseyImages[i]?.src,
    category: "Jersey",
  });
}

// Add trophy items
for (let i = 0; i < 7; i++) {
  trophyItems.push({
    id: i + 1,
    name: `#Trophy - ${(i + 1).toString().padStart(4, "0")}`,
    title: "Trophy",
    imageURL: trophyImages[i]?.src,
    category: "Trophy",
  });
}

// Add moment items
for (let i = 0; i < 7; i++) {
  momentItems.push({
    id: i + 1,
    name: `#Moment - ${(i + 1).toString().padStart(4, "0")}`,
    title: "Special Moment",
    imageURL: momentImages[i]?.src,
    category: "Moment",
  });
}

// console.log(jerseyItems, trophyItems, momentItems);


export {jerseyItems, trophyItems, momentItems}