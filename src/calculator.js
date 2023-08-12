import React, { useState } from 'react';

const Calculator = () => {
  // State for input values and result
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Function to handle input changes
  const handleInputChange = (e, inputType) => {
    const inputValue = e.target.value;
    if (inputType === 'num1') {
      setNum1(inputValue);
    } else if (inputType === 'num2') {
      setNum2(inputValue);
    }
  };

  // Function to handle operation click
  const handleOperation = (op) => {
    // Clear previous error and result
    setError('');
    setResult('');
    setOperation(op);
  };

  // Function to handle calculation
  const calculateResult = () => {
    setError('');
    setResult('');
    
    // Validate input
    if (num1 === '' || num2 === '') {
      setError('Both numbers are required.');
      return;
    }

    if (!/^-?\d*\.?\d+$/.test(num1) || !/^-?\d*\.?\d+$/.test(num2)) {
      setError('Invalid number format.');
      return;
    }

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);

    let calculatedResult;

    // Perform operation based on selected operation
    switch (operation) {
      case '+':
        calculatedResult = parsedNum1 + parsedNum2;
        break;
      case '-':
        calculatedResult = parsedNum1 - parsedNum2;
        break;
      case '*':
        calculatedResult = parsedNum1 * parsedNum2;
        break;
      case '/':
        if (parsedNum2 === 0) {
          setError('Cannot divide by zero.');
          return;
        }
        calculatedResult = parsedNum1 / parsedNum2;
        break;
      default:
        setError('Select an operation.');
        return;
    }

    setResult(calculatedResult);
  };

  return (
    <div>
      <h1>React Calculator</h1>
      <div>
        <input
          type="text"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => handleInputChange(e, 'num1')}
        />
        <input
          type="text"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => handleInputChange(e, 'num2')}
        />
      </div>
      <div>
        <button onClick={() => handleOperation('+')}>+</button>
        <button onClick={() => handleOperation('-')}>-</button>
        <button onClick={() => handleOperation('*')}>*</button>
        <button onClick={() => handleOperation('/')}>/</button>
        <button onClick={calculateResult}>=</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {result && <div style={{ color: 'green' }}>Result: {result}</div>}
    </div>
  );
};

export default Calculator;