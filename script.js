let outputScreen = document.getElementById('screen-text');
function append(value)
{
outputScreen.innerHTML += value;
}
function result() {
    let expression = outputScreen.innerHTML;
        let result = evaluateExpression(expression);
        outputScreen.innerHTML = result;
}

function evaluateExpression(expression) {
    let tokens = tokenize(expression);
    let postfix = infixtopostfix(tokens);
    return evaluatePostfix(postfix);
}

function tokenize(expression) {
    let tokens = [];
    let currentToken = '';

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (isOperator(char)) {
            if (currentToken !== '') {
                tokens.push(currentToken);
                currentToken = '';
            }
            tokens.push(char);
        } else if (!isNaN(parseInt(char)) || char === '.') {
            currentToken += char;
        }
    }

    if (currentToken !== '') {
        tokens.push(currentToken);
    }

    return tokens;
}

function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}

function infixtopostfix(infixtokens)
{
    let precedence = {
       "+" : 1,
       "-" : 1,
       "*" : 2,
       "/" : 2

     };
     let outputqueue = [];
     let operatorstack = [];
     for(let i =0;i<infixtokens.length ; i++)
     {
      let token = infixtokens[i];
      if(!isNaN(parseInt(token)))
      {
        outputqueue.push(token);
      }
      else if(isOperator(token))
      {
        while(operatorstack.length > 0 && precedence[operatorstack[operatorstack.length-1]]> precedence[token])
        {
           outputqueue.push(operatorstack.pop());
        }
        operatorstack.push(token);
      }
     }
     while (operatorstack.length > 0) {
        outputqueue.push(operatorstack.pop());
    }

    return outputqueue;
}



function evaluatePostfix(postfixTokens) {
    let operandStack = [];

    for (let i = 0; i < postfixTokens.length; i++) {
        let token = postfixTokens[i];

        if (!isNaN(parseFloat(token))) {
            
            operandStack.push(parseFloat(token));
        } else if (isOperator(token)) {
            
            let operand2 = operandStack.pop();
            let operand1 = operandStack.pop();

            if (token === '+') {
                operandStack.push(operand1 + operand2);
            } else if (token === '-') {
                operandStack.push(operand1 - operand2);
            } else if (token === '*') {
                operandStack.push(operand1 * operand2);
            } else if (token === '/') {
                operandStack.push(operand1 / operand2);
            }
        }
    }

    return operandStack.pop();
}


function clearScreen()
{
    outputScreen.innerHTML = "";
}

function backtext()
{
    outputScreen.innerHTML 
}