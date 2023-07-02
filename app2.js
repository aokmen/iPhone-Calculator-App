let displayTop = document.querySelector(".display-top");
let displayBottom = document.querySelector(".display-bottom");
const buttonsContainer = document.querySelector(".buttons-container");

let operator = "";
let firstNumber = "";
let isPreviousOperator = false;

buttonsContainer.addEventListener("click", (event) => {

  if (!event.target.classList.contains("button")) return;

  let primaryValue = displayBottom.innerHTML;
  let buttonValue = event.target.innerHTML;

  if (event.target.classList.contains("ac")) {
    operator = "";
    displayBottom.innerHTML = "0";
    displayTop.innerHTML = "";
    firstNumber = "";
  }

  if (event.target.classList.contains("number")) {
    if (primaryValue.length < 11) {
      if (primaryValue !== "0") {
        displayBottom.innerHTML += buttonValue;
      } else if (buttonValue !== "0") {
        displayBottom.innerHTML = buttonValue;
      }
    }
  }

  if (event.target.classList.contains("pm")) {
    if (primaryValue[0] === "-") {
      displayBottom.innerHTML = primaryValue.substring(1);
    } else if (primaryValue.length < 11 && primaryValue !== "0") {
      displayBottom.innerHTML = "-" + primaryValue;
    }
  }

  if (event.target.classList.contains("decimal")) {
    if (!primaryValue.includes(".")) {
      displayBottom.innerHTML += ".";
    }
  }

  function calculate(operator) {
    switch (operator) {
      case "+":
        return Number(firstNumber) + Number(displayBottom.innerHTML);
      case "-":
        return Number(firstNumber) - Number(displayBottom.innerHTML);
      case "÷":
        return (Number(firstNumber) / Number(displayBottom.innerHTML));
      case "x":
        return Number(firstNumber) * Number(displayBottom.innerHTML);
    }
  }

  if (event.target.classList.contains("operator")) {
    if (!isPreviousOperator) {
      if (displayTop.innerHTML && operator) {
        firstNumber = calculate(operator);
      } else {
        firstNumber = primaryValue;
      }
      displayBottom.innerHTML = "0";
    }
    operator = buttonValue;
    displayTop.innerHTML = firstNumber + operator;
    isPreviousOperator = true;
  } else {
    isPreviousOperator = false;
  }

  if (event.target.classList.contains("equal")) {
    firstNumber = calculate(operator);
  
    displayTop.innerHTML = firstNumber;
  
    // Rakamların display çerçevesini aşmasını engellemek için boyutlarını küçültme
    if (displayTop.innerHTML.length > 10) {
      displayTop.style.fontSize = "50px";
    } else {
      displayTop.style.fontSize = "60px";
    }
  
    operator = "";
    displayBottom.innerHTML = "0";
    isPreviousOperator = true;
  }

});
