const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const copyEl = document.getElementById('copy');
const generateEl = document.getElementById('generate');

// Generating random characters
const getLowerCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getUpperCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const getNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);
const getSymbol = () => "!@#$%^&*()_+-=[]{}|;:.<>?/".charAt(Math.floor(Math.random() * 26));

const randomFunction = {
    lower: getLowerCase,
    upper: getUpperCase,
    number: getNumber,
    symbol: getSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.textContent = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

const generatePassword = (lower, upper, number, symbol, length) => {
    let generatedPassword = '';
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    if (typesArr.length === 0) return '';

    typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunction[funcName]();
    });

    for (let i = typesArr.length; i < length; i++) {
        const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
        const funcName = Object.keys(randomType)[0];
        generatedPassword += randomFunction[funcName]();
    }

    return shufflePassword(generatedPassword);
};

const shufflePassword = password => password.split('').sort(() => Math.random() - 0.5).join('');

copyEl.addEventListener('click', () => {
    const passwordText = resultEl.textContent;
    navigator.clipboard.writeText(passwordText).then(() => {
        resultEl.textContent = "Copied!";
        setTimeout(() => (resultEl.textContent = passwordText), 1000);
    }).catch(err => console.error("Error copying text: ", err));
});


