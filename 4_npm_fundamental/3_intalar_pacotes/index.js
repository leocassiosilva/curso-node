const _ = require('lodash');

const a = [1, 2, 3];
const b = [2, 5, 6];


const difference = _.difference(a, b);
console.log(difference); // Output: [1, 3]