import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// ---------------------------------------------- INITS

let counter: number = 0;
let growthRate: number = 0;
const growthRateSuffix: string = "coffees/second";
let rotation: number = 0;

const fix: number = 2;

let upgradeACost: number = 10;
let upgradeBCost: number = 100;
let upgradeCCost: number = 1000;

const upgradeAIncrease: number = 0.1;
const upgradeBIncrease: number = 2.0;
const upgradeCIncrease: number = 50.0;

let upgradeACount: number = 0;
let upgradeBCount: number = 0;
let upgradeCCount: number = 0;

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

  upgradeAButton.disabled = counter < upgradeACost;
  upgradeBButton.disabled = counter < upgradeBCost;
  upgradeCButton.disabled = counter < upgradeCCost;

  upgradeAButton.innerHTML = `double shot: ${upgradeACount} ($${upgradeACost.toFixed(fix)})`;
  upgradeBButton.innerHTML = `triple shot: ${upgradeBCount} ($${upgradeBCost.toFixed(fix)})`;
  upgradeCButton.innerHTML = `quadruple shot: ${upgradeCCount} ($${upgradeCCost.toFixed(fix)})`;

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

const upgradeAContent = `double shot: ${upgradeACount} ($${upgradeACost})`;
const upgradeAButton = document.createElement("button");
upgradeAButton.innerHTML = upgradeAContent;
app.append(upgradeAButton);

upgradeAButton.addEventListener("click", () => {
  setCounter(-upgradeACost);
  upgradeACost *= 1.15;
  growthRate += upgradeAIncrease;
  upgradeACount++;
});

const upgradeBContent = `triple shot: ${upgradeBCount} ($${upgradeBCost})`;
const upgradeBButton = document.createElement("button");
upgradeBButton.innerHTML = upgradeBContent;
app.append(upgradeBButton);

upgradeBButton.addEventListener("click", () => {
  setCounter(-upgradeBCost);
  upgradeBCost *= 1.15;
  growthRate += upgradeBIncrease;
  upgradeBCount++;
});

const upgradeCContent = `quadruple shot: ${upgradeCCount} ($${upgradeCCost})`;
const upgradeCButton = document.createElement("button");
upgradeCButton.innerHTML = upgradeCContent;
app.append(upgradeCButton);

upgradeCButton.addEventListener("click", () => {
  setCounter(-upgradeCCost);
  upgradeCCost *= 1.15;
  growthRate += upgradeCIncrease;
  upgradeCCount++;
});
