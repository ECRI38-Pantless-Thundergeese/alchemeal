// const Illness = require('./models/illnessModels');

// const data = [
//   {
//     ailment: 'headache',
//     foods: ['milk', 'yogurt', 'spinach', 'almonds', 'salmon'],
//   },
//   {
//     ailment: 'aches',
//     foods: [
//       'salmon',
//       'tuna',
//       'sardines',
//       'arugula',
//       'bok choy',
//       'collard greens',
//     ],
//   },
//   {
//     ailment: 'fever',
//     foods: ['orange', 'oyster', 'banana', 'tomato', 'cantaloupe'],
//   },
//   {
//     ailment: 'cough',
//     foods: ['orange', 'milk', 'yogurt', 'salmon', 'tuna'],
//   },
//   {
//     ailment: 'fatigue',
//     foods: [
//       'chia seeds',
//       'banana',
//       'quinoa',
//       'green tea',
//       'oatmeal',
//       'almonds',
//     ],
//   },
//   {
//     ailment: 'congestion',
//     foods: ['chicken noodle soup', 'bell pepper', 'chamomile tea'],
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

// ObjectParameterError: Parameter "obj" to Document() must be an object, got {"ailment":"headache","foods":["milk","yogurt","spinach","almonds","salmon"]}
