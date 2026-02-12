const readline = require("readline");

//stack class to handle all stack operations
class Stack {
    constructor() {
        this.values = [];
    }

    push(item) {
        this.values.push(item);
    }

    pop() {
        if (this.values.length === 0) {
            throw new Error("Oops! not enough values in this operation");
        }
        return this.values.pop();
    }

    peek() {
        return this.values[this.values.length - 1] || null;
    }
}

//calculator class to evaluate expressions
class Calculator {
    constructor() {
        this.stack = new Stack(); //initializing stack
        this.symbolTable = {};     //symbol table to store key value pairs
    }

    evaluate(expression) {
        let units = expression.split(" ");  //splitting expressions 

        for (let i = 0; i < units.length; i++) {
            let unit = units[i];

            if (!isNaN(unit)) {          //if unit is a number push it in stack as float  
                this.stack.push(parseFloat(unit));
            }
            else if ("+-*/".includes(unit)) {     //if unit is an operator pop operands & calculate
                let b = this.stack.pop();
                let a = this.stack.pop();
                this.stack.push(this.compute(a, b, unit));
            }
            else if (unit.match(/^[A-Z]$/)) {   // If unit is a variable, push its value or store name
                if (this.symbolTable[unit] !== undefined) {
                    this.stack.push(this.symbolTable[unit]);
                } else {
                    this.stack.push(unit);
                }
            }
            else if (unit === "=") {      
                let value = this.stack.pop();
                let variable = this.stack.pop();

                // ensure that the variable is a proper name 
                if (typeof variable !== "string" || !variable.match(/^[A-Z]$/)) {
                    throw new Error("Invalid variable name");
                }

                this.symbolTable[variable] = value;
            }
            // Delete Operation
            else if (unit.toUpperCase() === "DELETE") {
                // Expect variable name next
                let variable = units[++i];  // Read next token directly
                if (!variable || !/^[A-Z]$/.test(variable)) {
                    throw new Error("Invalid variable name for deletion");
                }
                if (this.symbolTable[variable] !== undefined) {
                    delete this.symbolTable[variable];
                    console.log(`Variable ${variable} deleted.`);
                } else {
                    console.log(`Variable ${variable} not found.`);
                }
            }
            else {
                throw new Error("Unknown unit: " + unit);
            }
        }
        // Return the current top value of the stack
        return this.stack.peek();
    }

    // Perform arithmetic operation between two operands
    compute(a, b, operator) {
        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            default: throw new Error("Invalid Operator");
        }
    }
    displaysymbolTable() {
        console.log("Symbol Table:", this.symbolTable);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//a new instance of calculator
const calc = new Calculator();

console.log("Welcome to the postfix calculator!");
console.log("Enter postfix expressions with a space between elements.");
console.log("Type '1' to exit.");
console.log("To delete a variable: type 'DELETE VAR' (e.g. DELETE A)");

// get user input constantly
function getUserInput() {
    rl.question("Enter Postfix Expression: ", (input) => {
        if (input.toLowerCase() === "1") {
            console.log("The Calculator is quitting. Thankyou!");
            rl.close();
            return;
        }

        try {
            let result = calc.evaluate(input);
            console.log("Result:", result);
            calc.displaysymbolTable();
        } catch (error) {
            console.log("Error:", error.message);
        }
        getUserInput();
    });
}
getUserInput();