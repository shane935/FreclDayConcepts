/**
 * Created by shane on 11/10/2016.
 */

function add(a, b) {
  return a + b
}
function multiply(a) {
  return a * a
}
function add3(a) {
  return add(3, a);
}

const compose = (...funcs) => {
  const lastFunc = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args) => {
    console.log('Calling', lastFunc.name, 'with', ...args);
    return rest.reduceRight((reduction, func) => {
      console.log('Calling', func.name, 'with', reduction);
      return func(reduction);
    }, lastFunc(...args));
  }
};

const addSquare = compose(multiply, add3, add);

const addSquareUncomposed = (a, b) => {
  return multiply(add3(add(a, b)))
};

console.log('Composed: ' + addSquare(1, 2));
console.log('Uncomposed: ' + addSquareUncomposed(1, 2));
console.log('Composed: ' + addSquare(3, 2));
console.log('Uncomposed: ' + addSquareUncomposed(3, 2));
