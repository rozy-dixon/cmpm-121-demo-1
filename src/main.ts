/* 

DESIGN AND NOTES

click to gain espresso shots
take espresso shots to have enough energy to finish assignments

*/

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// ---------------------------------------------- INITS

let counter: number = 0;
let growthRate: number = 0;
const growthRateSuffix: string = "coffees/second";

const costMultiplier: number = 1.15;

let assignmentCount: number = 5;
const assignmentGrowthRate: number = 0.5;

let rotation: number = 0;

const fix: number = 2;

// ---------------------------------------------- ITEMS

interface Item {
  name: string;
  id: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "double shot",
    id: "double-shot",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "for when you need a pick me up",
  },
  {
    name: "triple shot",
    id: "triple-shot",
    cost: 100,
    rate: 2,
    count: 0,
    description: "for when you need more than a pick me up",
  },
  {
    name: "quadruple shot",
    id: "quadruple-shot",
    cost: 1000,
    rate: 50,
    count: 0,
    description: "for when you have to get it done",
  },
  {
    name: "quintuple shot",
    id: "quintuple-shot",
    cost: 10000,
    rate: 1000,
    count: 0,
    description: "no time to talk, i have stuff to do",
  },
  {
    name: "sextuple shot",
    id: "sextuple-shot",
    cost: 100000,
    rate: 10000,
    count: 0,
    description: "no thinking, just work",
  },
];

// ---------------------------------------------- FUNCTIONS

function SetCounter(difference: number = 1) {
  counter += difference;
  counterDisplay.innerHTML = `${Math.floor(counter).toFixed(fix)}`;
}

function SetAssignmentCount(difference: number = 1) {
  assignmentCount += difference;
  assignmentDiv.innerHTML = `${Math.floor(assignmentCount)} deadlines(s) to meet`;
}

let currentPerformance, fps;
let previousPerformance = performance.now();
function Step() {
  // src = https://stackoverflow.com/questions/4787431/how-do-i-check-framerate-in-javascript
  // src = https://chat.brace.tools/s/34982369-88e5-4e6c-abce-bc25002d522e
  currentPerformance = performance.now();
  fps = 1000 / (currentPerformance - previousPerformance);
  previousPerformance = currentPerformance;

  Array.from(document.getElementsByTagName("button")).forEach(
    (upgradeButton) => {
      DisableButton(upgradeButton);
    },
  );

  growthRateDisplay.innerHTML = `${growthRate.toFixed(fix)} ${growthRateSuffix}`;
  assignmentDiv.innerHTML = `${Math.floor(assignmentCount)} deadlines(s) to meet`;

  SetCounter(growthRate / fps);
  SetAssignmentCount((growthRate + assignmentGrowthRate) / fps);
  requestAnimationFrame(Step);
}

function DisableButton(upgradeButton: HTMLButtonElement) {
  availableItems.forEach((element) => {
    if (upgradeButton.id === element.id) {
      upgradeButton.disabled = Math.floor(counter) < element.cost;
      upgradeButton.innerHTML = `$${element.cost.toFixed(fix)} ${element.name} (${element.count})`;
    }
  });
  assignmentButton.disabled =
    Math.floor(assignmentCount) < 1 || Math.floor(counter) < 1;
  assignmentDiv.innerHTML = `${Math.floor(assignmentCount)} deadlines(s) to meet`;
}

// ---------------------------------------------- TITLE DISPLAY

const gameName = "Caffeine Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// ---------------------------------------------- COUNTER/GROWTHRATE DISPLAY

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter}`;
app.append(counterDisplay);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `${growthRate} ${growthRateSuffix}`;
app.append(growthRateDisplay);

// ---------------------------------------------- ESPRESSO DISPLAY

requestAnimationFrame(Step);

const clickContent = "☕";
const clickButton = document.createElement("h2");
clickButton.innerHTML = clickContent;
app.append(clickButton);

clickButton.addEventListener("click", (event) => {
  event.stopPropagation();
  SetCounter();
  // src = https://chat.brace.tools/s/306ec42f-7ac1-4381-be4b-dbcb47af314f
  clickButton.style.transform = `rotate(${(rotation += 360)}deg)`;
});

const buttonDiv = document.createElement("div");
buttonDiv.id = "button-div";
app.append(buttonDiv);

availableItems.forEach((element) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.id = element.id;
  upgradeButton.title = element.description;
  buttonDiv.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    SetCounter(-element.cost);
    element.cost *= costMultiplier;
    growthRate += element.rate;
    element.count++;
  });
});

// ---------------------------------------------- ASSIGNMENT DISPLAY

const assignmentDiv = document.createElement("div");
app.append(assignmentDiv);

const assignmentButtonDiv = document.createElement("div");
app.append(assignmentButtonDiv);

const assignmentButton = document.createElement("button");
assignmentButton.innerHTML = `complete assignment`;
assignmentButtonDiv.append(assignmentButton);

assignmentButton.addEventListener("click", () => {
  SetAssignmentCount(-1);
  SetCounter(-1);
});
