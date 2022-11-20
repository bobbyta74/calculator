const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
const ops = document.querySelectorAll(".ops");
display.textContent = "0";
let inputstring = "";
//Store first and second number for calculations
let num1;
let num2;
let currentoperator;

let operatorcount = 0;

/*If number then add to calculation
If operator then save current number, save current operator wait for next operator, save that number, then operate() and update display
If AC then clear inputs
If +/- then multiply current input by -1
If % then multiply current 
*/

//Changes input string into a number
function getinput() {
    if (inputstring % 1 == 0) {
        return parseInt(inputstring);
    } else {
        return parseFloat(inputstring);
    }
}

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
    let result;
    if (operator == "+") {
        result = a + b;
    } else if (operator == "-") {
        result = a - b;
    } else if (operator == "x") {
        result = a * b;
    } else if (operator == "÷") {
        result = a / b;
    } else if (operator == "="){
        //If b doesn't exist (say we put in "5+7=", get 12 and then want to add something to 12), then = just returns a
        //This really shouldn't be an operator but I'm scared I'll break the program otherwise
        if (isNaN(parseFloat(b))) {
            result = a;
        } else {
            result = b;
        }
    }
    if (result.toPrecision(7) != result){
        return result.toPrecision(7);
    } else {
        return result;
    }
}

//Event listeners for everything except operators because that would be way too long
for (let button of buttons) {
    let buttonid = button.getAttribute("id");
    button.addEventListener("click", function () {
        if (button.getAttribute("class") == "num") {
            //If it's a number, add to input string
            if (inputstring == "0") {
                inputstring = "";
            }
            if (buttonid != "dot" || inputstring.indexOf(".") <= -1)
            inputstring += button.textContent;
        } else if (buttonid == "ac") {
            //Clears input string
            inputstring = "0";
            num1 = 0;
            num2 = 0;
            operatorcount = 0;
        } else if (buttonid == "sign") {
            //Changes string to integer to multiply it by -1, then immediately back to string so you can add more digits
            console.log(inputstring[0]);
            if (inputstring[0] != "-") {
                inputstring = "-".concat(inputstring);
            } else {
                inputstring = inputstring.replace("-", "");
            }
        } else if (buttonid == "percent") {
            inputstring = parseInt(inputstring) / 100;
            inputstring = inputstring.toString();
        }
        display.textContent = inputstring;
    }) 
}

for (let button of ops) {
    let buttonid = button.getAttribute("id");
    button.addEventListener("click", function () {
        if (operatorcount >= 1) {
            //Gets 2nd number from input (first is saved already as num1)
            num2 = getinput();
            //The result will be used for further calculations, so num1 is set to the result
            console.log(num1 + currentoperator + num2);
            num1 = operate(currentoperator, num1, num2);
            display.textContent = num1;
        } else {
            num1 = getinput();
            display.textContent = num1;
            console.log(num1);
        }
        //Save first number of operation and make clean slate for second
        //Gets current operator to call the function later
        currentoperator = button.textContent;
        inputstring = "";
        operatorcount += 1;
    })
}