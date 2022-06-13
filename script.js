const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const calculations = document.getElementById("calculations");
const calculationVisuals = document.getElementById("calculation-visuals");
const periodButton = document.getElementById("period");
const buttons = [plusButton, minusButton, divideButton, multiplyButton];
const operators = [" + ", " - ", " ÷ ", " x "];

for (let i = 0; i < 10; i++) {
  const numberButton = document.getElementById(`${i}`);
  numberButton.addEventListener("click", (e) => {
    if (calculations.innerHTML === "0") {
      calculations.innerHTML = `${e.target.innerHTML}`;
    } else {
      if (calculations.innerHTML.length < 8) {
        calculations.innerHTML += `${e.target.innerHTML}`;
      }
    }
  });
}

clearButton.addEventListener("click", (e) => {
  calculations.innerHTML = "0";
  calculationVisuals.innerHTML = "";
});

deleteButton.addEventListener("click", (e) => {
  if (calculations.innerHTML != "0" && calculations.innerHTML.length > 1) {
    calculations.innerHTML = calculations.innerHTML.slice(0, -1);
  } else if (
    calculations.innerHTML.length == 1 &&
    calculations.innerHTML != "0"
  ) {
    calculations.innerHTML = "0";
  } else if (calculations.innerHTML == "0") {
    calculationVisuals.innerHTML = "";
  } else {
    calculations.innerHTML = "0";
  }
});

for (let i = 0; i < 4; i++) {
  buttons[i].addEventListener("click", (e) => {
    const arr = calculationVisuals.innerHTML.split(" ");
    if (arr.length == 3) {
      generateSolution();
    }
    calculationVisuals.innerHTML = calculations.innerHTML + operators[i];
    calculations.innerHTML = "0";
  });
}

periodButton.addEventListener("click", (e) => {
  if (!calculations.innerHTML.includes(".")) {
    calculations.innerHTML = calculations.innerHTML + ".";
  }
});

equalsButton.addEventListener("click", (e) => {
  generateSolution();
});

function generateSolution() {
  const arr = calculationVisuals.innerHTML.split(" ");
  let ans = operator(arr[0], calculations.innerHTML, arr[1]);
  ans = modifyAnswer(ans);
  calculations.innerHTML = ans;
  calculationVisuals.innerHTML = "";
}

function modifyAnswer(ans) {
  const stringAnswer = ans.toString();
  if (stringAnswer.includes(".")) {
    ans = Math.round((ans + Number.EPSILON) * 100) / 100;
  }
  return ans;
}

function operator(a, b, operator) {
  if (a === "") {
    return calculations.innerHTML;
  }
  if (operator == "+") {
    return add(a, b);
  } else if (operator == "-") {
    return subtract(a, b);
  } else if (operator == "÷") {
    return divide(a, b);
  } else {
    return multiply(a, b);
  }
}

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
