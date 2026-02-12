# Postfix-calculator-js


A stack-based arithmetical calculator implemented in Node.js. This project interprets Postfix++, a language designed for evaluating postfix expressions with support for variables.

Features
- **Stack-Based Evaluation**: Uses a custom Stack class for processing tokens.
- **Variable Support**: Assign values to variables using the `=` operator (e.g., `A 10 =`).
- **Symbol Table**: Efficiently manages variable names and their associated values.
- **Extra Functionality**: Includes a `DELETE` command to remove variables from the symbol table.
