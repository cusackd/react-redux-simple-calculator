export const calculation = (calcArray, currentResult) => {
  // Get the current calc array 
  // Convert calc array to string
  // Split string based on operators (/ * - +)
  // Loop over array and make calculation
  if (isNaN(calcArray[calcArray.length-1])) {
    return currentResult;
  }

  // Operator functions that are invoked
  // on the loop to calculate the values
  // in calculation array
  const operatorFunctions = {
    '+': (a, b) => {
        return a + b;
    },
    '-': (a, b) => {
        return a - b;
    },
    '*': (a, b) => {
        return a * b;
    },
    '/': (a, b) => {
        return a / b;
    }
  };

  // Join the calc array to create a string
  // I do thos to make it easier to join the numbers
  // so that the calculation loop can be done
  let calcString = calcArray.join('');

  // Split the calc string based on the operators
  // This will allow me to combine the numbers and seperate
  // the operators
  // Example [4,5,'+',2,'/',6] -> '45+2/6' -> ['45','+','2','/','6']
  let calcArrayUpdated = calcString.split(/(\+|-|\*|\/)/g);

  // Set default result to 0
  let result = 0;

  // Set a default operator value
  // I do this as having non assigned vars
  // is bad practice in most companies I have worked for
  let operator = '+';

  // Loop and calculate
  // I do this to ensure that the correct order of operations is achieved
  // If I did standard math on the values it would follow the
  // order of operations as if it was a whole equation
  // Also having it in an array allows us to pop the values if we want to
  // clear just one value, making it future proof
  for (let i = 0; i < calcArrayUpdated.length; i++) {
    // Grab the value;
    let item = calcArrayUpdated[i];
    // Test if the last value is an operator
    let isOperator = /(\+|-|\*|\/)/.test(item);

    // Sets the last operator in the array
    // This allows us to make the calculation in the next loop
    if (isOperator) {
      operator = item;
    } else {
      result = operatorFunctions[operator](result, parseInt(item));
    }
  }
  
  return result;
}

export const addValueToCalculation = (value, currentState) => {
  currentState = [...currentState];
  
  // List of operators to check for 
  let operatorValues = ['*', '/', '+', '-'];

  // If not number or operator then return
  // this is used in the case of adding to calculation with keypresses
  if (typeof value !== 'number' && !operatorValues.includes(value)) {
    return currentState;
  }

  // If the new value is an operator the calculation array is empty
  // Then do nothing
  if (operatorValues.includes(value) && !currentState.length) {
    return currentState;
  }

  // Todo check if operator was last entry
  // Get the previous value so we can check it is an operator
  let lastVal = currentState[currentState.length-1];
  
  // Test is last value is an operator
  let lastValIsOperator = operatorValues.includes(lastVal);
  
  // Test is current value is an operator
  let currentValIsOperator = operatorValues.includes(value);
  
  // Check if last val in array is an operator
  // Then replace it if new value is an operator
  if(lastValIsOperator && currentValIsOperator){
    // Clone the state so we can replace the value
    // Replace last operator with new operator
    currentState[currentState.length-1] = value;
    
    // Break out of the function
    return currentState;
  }
  
  return [...currentState, value];
}
