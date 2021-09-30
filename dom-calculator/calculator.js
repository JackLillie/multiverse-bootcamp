window.onload = function () {
  const button = document.getElementById("calculate");
  const operatorSelector = document.getElementById("operator");

  const result = document.getElementById("result");

  button.addEventListener("click", () => {
    let answer;
    const numOne = parseFloat(document.getElementById("numOne").value);
    const numTwo = parseFloat(document.getElementById("numTwo").value);
    const operator =
      operatorSelector.options[operatorSelector.selectedIndex].value;
    if (operator === "add") {
      answer = numOne + numTwo;
    } else if (operator === "subtract") {
      answer = numOne - numTwo;
    } else if (operator === "multiply") {
      answer = numOne * numTwo;
    } else if (operator === "divide") {
      answer = numOne / numTwo;
    }
    result.innerText = answer.toString();
  });
};
