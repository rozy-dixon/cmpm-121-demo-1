import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// ---------------------------------------------- CONTENT

const gameName = "Caffeine Clicker";
document.title = gameName;

let counter: number = 0;
let unitLabel = "coffees deep";

function increaseCounter() {
    counter += 1;
    if (counter == 1) {
        unitLabel = "coffee deep";
    } else {
        unitLabel = "coffees deep";
    }
    counterDisplay.innerHTML = `${counter} ${unitLabel}`;
}

const buttonContent = "☕";

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
    increaseCounter();
});

setInterval(increaseCounter, 1000);