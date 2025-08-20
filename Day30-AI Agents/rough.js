const readlineSync = require("readline-sync");
const username = readlineSync.question("can you tell me yourname? ");
console.log(username);

// output
// can you tell me yourname? savi
// savi

// ```json
// {
// "weather_details_needed": true,
// "location": [{"city": "delhi", "date": "today"}]
// }


// {
//   "weather_details_needed": true,
//   "location": [
//     {
//       "city": "delhi",
//       "date": "today"
//     },
//     {
//       "city": "mumbai",
//       "date": "2024-04-12"
//     }
//   ]
// }
// ``

// {
//   weather_details_needed: true,
//   location: [ { city: 'delhi', date: 'today' } ]
// }