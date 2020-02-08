//currying
//not curried
function addThree(a,b,c) {
 return a + b + c;
};

console.log(addThree(1,2,3));

//curried
function addThreeCurried(a) {
  return function inner1(b) {
    return function inner2(c) {
      return a + b + c;
    };
  };
};

console.log(addThreeCurried(1)(2)(3));

//curried + using anonymous functions and conscise lambda syntax
const addThreeArrow = a => b => c => a + b + c;

console.log(addThreeArrow(1)(2)(3));

// Why is Javascript a good language for functional programming?
// 1. first class functions
function calcSalesTax(price) {
  return price * 0.05;
};

function calcTotal(price, salesTaxFunc) {
  return price + salesTaxFunc(price);
};
// a. pass a function as an argument
console.log(calcTotal(100,calcSalesTax))

// b. return a function
function otherCalcTotal(price) {
  return function inner(salesTaxFunc) {
    return price + salesTaxFunc(price);
  };
};

const addSalesTaxToTotal = otherCalcTotal(100);

console.log(addSalesTaxToTotal(calcSalesTax));

// c. assign functions to variables and object properties

const functionInVariable = addSalesTaxToTotal;

const obj = { functionInProperty: calcSalesTax };

console.log(functionInVariable(obj.functionInProperty))

// 2. anonymous functions and conscise lambda syntax

function getUrlWithId(baseUrl, id) {
  return `${baseURL}?id=${id}`;
};

function curriedGetUrlWithId(baseUrl) {
  return function whatShouldThisBeNamed(id) {
    return `${baseUrl}?id=${id}`;
  };
};

const getTransmitUrlWithId = curriedGetUrlWithId('sovos.com/transmit');

console.log(getTransmitUrlWithId(21));
console.log(getTransmitUrlWithId(23));

const arrowGetUrlWithId = baseUrl => id => `${baseUrl}?id=${id}`;

const getPrintUrlWithId = arrowGetUrlWithId('sovos.com/print');

console.log(getPrintUrlWithId(83));
console.log(getPrintUrlWithId(210));

// 3. Closures (see lexical scope above and closure.js)