const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
const ops = document.querySelectorAll(".ops");
display.textContent = "0";
let inputstring = "";
//Store first and second number for calculations
let num1;
let num2;
let currentoperator;

/*If number then add to calculation
If operator then save current number, save current operator wait for next operator, save that number, then operate() and update display
If AC then clear inputs
If +/- then multiply current input by -1
If % then multiply current 
*/

//Calculations
function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator == "plus") {
        return a + b;
    } else if (operator == "minus") {
        return a - b;
    } else if (operator == "times") {
        return a * b;
    } else {
        return a / b;
    }
}

//Event listeners for everything except operators because that would be way too long
for (let button of buttons) {
    let buttonid = button.getAttribute("id");
    button.addEventListener("click", function () {
        if (button.getAttribute("class") == "num") {
            //If it's a number, add to input string
            inputstring += button.textContent;
            console.log(inputstring);
        } else if (buttonid == "ac") {
            //Clears input string
            inputstring = "";
            display.textContent = 0;
        } else if (buttonid == "sign") {
            //Changes string to integer to multiply it by -1, then immediately back to string so you can add more digits
            inputstring = -1 * parseInt(inputstring);
            inputstring = inputstring.toString();
        } else if (buttonid == "percent") {
            inputstring = parseInt(inputstring) / 100;
            inputstring = inputstring.toString();
        }
    }) 
}