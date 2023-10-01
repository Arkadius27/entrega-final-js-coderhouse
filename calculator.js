let result = '';
const resultField = document.getElementById('result');
const digitButtons = document.querySelectorAll('.digit');
const operationButtons = document.querySelectorAll('.operation');

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendToResult(button.dataset.value);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendToResult(button.dataset.value);
    });
});

document.getElementById('clear').addEventListener('click', clearResult);
document.getElementById('calculate').addEventListener('click', calculateResult);
document.getElementById('fetchExpression').addEventListener('click', fetchExpression);

function clearResult() {
    result = '';
    resultField.value = result;
}

function appendToResult(val) {
    result += val;
    resultField.value = result;
}

function calculateResult() {
    try {
        result = math.evaluate(result);
        resultField.value = result;
    } catch (error) {
        console.error(error);
        result = '';
        resultField.value = 'Error';
    }
}

function fetchExpression() {
    fetch('expressions.json')
        .then(response => response.json())
        .then(data => {
            const expressions = data.expressions;
            const randomIndex = Math.floor(Math.random() * expressions.length);
            const randomExpression = expressions[randomIndex];

            const expression = randomExpression.expression;
            clearResult(); // Clear the result before appending a new expression
            appendToResult(expression);

            setTimeout(() => {
                calculateResult();
            }, 1000);
        })
        .catch(error => {
            console.error(error);
            result = '';
            resultField.value = 'Error fetching data';
        });
}

