
//ES 5
// const city=require('./math-util').city;
// const country = requires('./math-util').country;

// console.log(city);
// console.log(country);




//ES 6
const {city : cityName, country, details, state='karnataka'} = require('./math-util');
console.log(cityName, country, state);