var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

calculator.setExpression({
id: 'func',
latex: '',
color: Desmos.Colors.ORANGE
});


calculator.updateSettings({
expressions: false,
settingsMenu:false,
keypad:false,
invertedColors:true,
zoomButtons:false
});


let input = document.getElementById("inputField");
const handleKeyDown = (e) => {
  // Check if the pressed key is "Enter"
  if (e.key === "Enter") {
    e.preventDefault(); // Prevents the default behavior of the Enter key (form submission)
    
    let inputValue = input.value;

    // Replace "sin(x)" with "\sin\left(x\right)"
    inputValue = inputValue.replace(/sin\(([^)]+)\)/g, '\\sin\\left($1\\right)');

    // Replace "cos(x)" with "\cos\left(x\right)"
    inputValue = inputValue.replace(/cos\(([^)]+)\)/g, '\\cos\\left($1\\right)');

    // Replace "tan(x)" with "\tan\left(x\right)"
    inputValue = inputValue.replace(/tan\(([^)]+)\)/g, '\\tan\\left($1\\right)');

    // Replace "cot(x)" with "\cot\left(x\right)"
    inputValue = inputValue.replace(/cot\(([^)]+)\)/g, '\\cot\\left($1\\right)');

    // Replace "sec(x)" with "\sec\left(x\right)"
    inputValue = inputValue.replace(/sec\(([^)]+)\)/g, '\\sec\\left($1\\right)');

    // Replace "csc(x)" with "\csc\left(x\right)"
    inputValue = inputValue.replace(/csc\(([^)]+)\)/g, '\\csc\\left($1\\right)');

    calculator.setExpression({
      id: 'func',
      latex: `${inputValue}`,
      color: Desmos.Colors.ORANGE
    });
  }
};
input.addEventListener("keydown", handleKeyDown);
