import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// ---------------------------------------------- INITS

let counter: number = 0;
let growthRate: number = 0;
const growthRateSuffix: string = "coffees/second";

const costMultiplier: number = 1.15;

let rotation: number = 0;

const fix: number = 2;

// ---------------------------------------------- ITEMS

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "double shot",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "for when you need a pick me up",
  },
  {
    name: "triple shot",
    cost: 100,
    rate: 2,
    count: 0,
    description: "for when you need more than a pick me up",
  },
  {
    name: "quadruple shot",
    cost: 1000,
    rate: 50,
    count: 0,
    description: "for when you have to get it done",
  },
  {
    name: "quintuple shot",
    cost: 10000,
    rate: 1000,
    count: 0,
    description: "no time to talk, i have stuff to do",
  },
  {
    name: "sextuple shot",
    cost: 100000,
    rate: 10000,
    count: 0,
    description: "no thinking, just work",
  },
];

// ---------------------------------------------- FUNCTIONS

function setCounter(difference: number = 1) {
  counter += difference;
  counterDisplay.innerHTML = `${counter.toFixed(fix)}`;
}

let curPerformance, fps;
let prevPerformance = performance.now();
function step() {
  // src = https://stackoverflow.com/questions/4787431/how-do-i-check-framerate-in-javascript
  // src = https://chat.brace.tools/s/34982369-88e5-4e6c-abce-bc25002d522e
  curPerformance = performance.now();
  fps = 1000 / (curPerformance - prevPerformance);
  prevPerformance = curPerformance;

  Array.from(document.getElementsByTagName("button")).forEach(
    (upgradeButton) => {
      availableItems.forEach((element) => {
        if (upgradeButton.id === element.name) {
          upgradeButton.disabled = counter < element.cost;
          upgradeButton.innerHTML = `$${element.cost.toFixed(fix)} ${element.name} (${element.count})`;
        }
      });
    },
  );

  growthRateDisplay.innerHTML = `${growthRate.toFixed(fix)} ${growthRateSuffix}`;

  setCounter(growthRate / fps);
  requestAnimationFrame(step);
}

// ---------------------------------------------- TITLE DISPLAY

const gameName = "Caffeine Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// ---------------------------------------------- COUNTER AND GROWTH DISPLAY

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter}`;
app.append(counterDisplay);

const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `${growthRate} ${growthRateSuffix}`;
app.append(growthRateDisplay);

// ---------------------------------------------- BUTTON DISPLAY

requestAnimationFrame(step);

const clickContent = "☕";
const clickButton = document.createElement("h2");
clickButton.innerHTML = clickContent;
app.append(clickButton);

clickButton.addEventListener("click", () => {
  setCounter();
  // src = https://chat.brace.tools/s/306ec42f-7ac1-4381-be4b-dbcb47af314f
  clickButton.style.transform = `rotate(${(rotation += 360)}deg)`;
});

availableItems.forEach((element) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.id = element.name;
  upgradeButton.title = element.description;
  app.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    setCounter(-element.cost);
    element.cost *= costMultiplier;
    growthRate += element.rate;
    element.count++;
  });
});
