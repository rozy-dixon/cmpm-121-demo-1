import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// ---------------------------------------------- DESIGN

/* 
- upgrade 1: auto-clicking
*/

// ---------------------------------------------- CONTENT

// initialize name display
const gameName = "Caffeine Clicker";
document.title = gameName;

// initialize counter display defaults
let counter: number = 0;
let unitLabel = "coffees deep";
let growthRate = 0;

// allow for counter increase
function increaseCounter(x: number) {
  counter += x;
  if (Math.floor(counter) == 1) {
    unitLabel = "coffee deep";
  } else {
    unitLabel = "coffees deep";
  }
  counterDisplay.innerHTML = `${Math.floor(counter)} ${unitLabel}`;
}

// allow for counter decrease
function decreaseCounter(x: number) {
  counter -= x;
  if (Math.floor(counter) == 1) {
    unitLabel = "coffee deep";
  } else {
    unitLabel = "coffees deep";
  }
  counterDisplay.innerHTML = `${Math.floor(counter)} ${unitLabel}`;
}

// initialize button contents
const buttonContent = "☕";
const upgrade1Content = "purchase upgrade";

// allow for upgrade 1
let curPerformance, fps;
let prevPerformance = performance.now();
function step() {
  // src = https://stackoverflow.com/questions/4787431/how-do-i-check-framerate-in-javascript
  // src = https://chat.brace.tools/s/34982369-88e5-4e6c-abce-bc25002d522e
  curPerformance = performance.now();
  fps = 1000 / (curPerformance - prevPerformance);
  prevPerformance = curPerformance;

  upgrade1Button.disabled = counter < 10;

  increaseCounter(growthRate / fps);
  requestAnimationFrame(step);
}

function purshaseUpgrade1() {
  decreaseCounter(10);
  growthRate += 1;
}

// ---------------------------------------------- ASSEMBLY

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} ${unitLabel}`;
app.append(counterDisplay);

requestAnimationFrame(step);

const button = document.createElement("button");
button.innerHTML = buttonContent;
app.append(button);

button.addEventListener("click", () => {
  increaseCounter(1);
});

const upgrade1Button = document.createElement("button");
upgrade1Button.innerHTML = upgrade1Content;
app.append(upgrade1Button);

upgrade1Button.addEventListener("click", () => {
  purshaseUpgrade1();
});
