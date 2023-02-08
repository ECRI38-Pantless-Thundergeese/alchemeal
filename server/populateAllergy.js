// const Allergy = require('./models/allergyModels');

// const data = [
//   {
//     allergy: 'dairy',
//     foods: ['DAIRY_FREE'],
//   },
//   {
//     allergy: 'gluten',
//     foods: ['GLUTEN_FREE'],
//   },
//   {
//     allergy: 'wheat',
//     foods: ['WHEAT_FREE'],
//   },
//   {
//     allergy: 'peanut',
//     foods: ['PEANUT_FREE'],
//   },
//   {
//     allergy: 'soy',
//     foods: ['SOY_FREE'],
//   },
//   {
//     allergy: 'shellfish',
//     foods: ['SHELLFISH_FREE'],
//   },
//   {
//     allergy: 'lupine',
//     foods: ['LUPINE_FREE'],
//   },
// ];


// const populateDB = () => {
//   data.forEach((ailment) => {
//     const chunk = JSON.stringify(ailment);
//     Illness.create(chunk, (err, illness) => {
//       if (err) {
//         console.log(err);
//       } else console.log(illness);
//     });
//   });
// };

// // populateDB();


// // ObjectParameterError: Parameter "obj" to Document() must be an object, got {"ailment":"headache","foods":["milk","yogurt","spinach","almonds","salmon"]}
