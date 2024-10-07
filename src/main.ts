import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// ---------------------------------------------- CONTENT

const gameName = "CLICKING TIME";
document.title = gameName;

const buttonContent = "☕";

// ---------------------------------------------- ASSEMBLY

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = buttonContent;
app.append(button);