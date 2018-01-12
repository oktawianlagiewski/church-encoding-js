/*
Church encoding defines numerals as n-times applications of function f()
*/
const ZERO = fn => x => x; //zero can be interpreted as 'false'
const ONE = fn => x => fn(x); //ONE can also be called an identiy function I*
const TWO = fn => x => fn(fn(x));
const THREE = fn => x => fn(fn(fn(x)));
const FOUR = fn => x => fn(fn(fn(fn(x))));
const FIVE = fn => x => fn(fn(fn(fn(fn(x)))));
const SIX = fn => x => fn(fn(fn(fn(fn(fn(x))))));
const SEVEN = fn => x => fn(fn(fn(fn(fn(fn(fn(x)))))));
const EIGHT = fn => x => fn(fn(fn(fn(fn(fn(fn(fn(x))))))));
const NINE = fn => x => fn(fn(fn(fn(fn(fn(fn(fn(fn(x)))))))));
const TEN = fn => x => fn(fn(fn(fn(fn(fn(fn(fn(fn(fn(x))))))))));
/*
The IDENTITY function reflects back the input value
*/
const IDENTITY = x => x;
/*
The T function takes two values and returns the first
*/
const T = thn => els => thn;
/*
The F function takes two values and returns the second
*/
const F = thn => els => els;
/*
The ISZERO function runs the inner function zero times if input is zero and
returns final argument -> T, otherwise it returns the inner argument -> F
*/
const ISZERO = num => num(_ => F)(T);
/*
The K combinator produces a function, ignores its input and returns the
original value
*/
const K = k => _ => k;
/*
The SUCCESSOR function calls n+1 applications of function fn over the value x
*/
const SUCCESSOR = num => fn => x => fn(num(fn)(x));
/*
The ADD function calls SUCCESSOR function A-times over the value B
*/
const ADD = (numA, numB) => numA(SUCCESSOR)(numB);
/*
The MULTIPLY function composes functions
*/
const MULTIPLY = (f, g) => x => f(g(x));
/*
The PREDECESSOR function gives the number that came before, unless it's 0,
in which case it also return 0
*/
const PREDECESSOR = num =>
  num(g => ISZERO(g(SUCCESSOR(ZERO)))(IDENTITY)(MULTIPLY(SUCCESSOR, g)))(
    K(ZERO)
  )(ZERO);
/*
The SUBTRACT function calls PREDECESSOR function b times over the value a
*/
const SUBTRACT = (a, b) => b(PREDECESSOR)(a);
/*
The POWER function multiplies A by itself B-times
*/
const POWER = (numA, numB) => numB(numA);
/*
The to_integer function decodes encoded numerals into integers
*/
function to_integer(c) {
  return c(x => x + 1)(0);
}
/*
The to_integer function encodes integers into church numerals
*/
function church(n) {
  return n === 0 ? ZERO : SUCCESSOR(church(n - 1));
}

const HUNDRED = church(100);

/*
Run the functions below to see the results:
to_integer(ONE)
to_integer(ADD(FIVE, TEN))
to_integer(MULTIPLY(SIX, HUNDRED))
to_integer(POWER(TWO, TEN))
to_integer(POWER(SUBTRACT(THREE, ONE), MULTIPLY(TWO, TEN)))
*/
