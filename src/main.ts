import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// ---------------------------------------------- CONTENT

const gameName = "Caffeine Clicker";
document.title = gameName;

let counter: number = 0;
let unitLabel = "coffees deep";

function increaseCounter(x: number) {
  counter += x;
  if (Math.floor(counter) == 1) {
    unitLabel = "coffee deep";
  } else {
    unitLabel = "coffees deep";
  }
  counterDisplay.innerHTML = `${Math.floor(counter)} ${unitLabel}`;
}

const buttonContent = "☕";

let curPerformance, fps;
let prevPerformance = performance.now();
function step() {
  // src = https://stackoverflow.com/questions/4787431/how-do-i-check-framerate-in-javascript
  // src = https://chat.brace.tools/s/34982369-88e5-4e6c-abce-bc25002d522e
  curPerformance = performance.now();
  fps = 1000 / (curPerformance - prevPerformance);
  prevPerformance = curPerformance;

  increaseCounter(1 / fps);
  requestAnimationFrame(step);
}

// ---------------------------------------------- ASSEMBLY

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} ${unitLabel}`;
app.append(counterDisplay);

const button = document.createElement("button");
button.innerHTML = buttonContent;
app.append(button);

button.addEventListener("click", () => {
  increaseCounter(1);
});

requestAnimationFrame(step);
