const AILMENTS = [
  'headache',
  'fever',
  'cough',
  'fatigue',
  'aches',
  'congestion',
];

const tableProperties = [
  'CA',
  'K',
  'FE',
  'ZN',
  'VITA_RAE',
  'VITC',
  'VITB12',
  'VITD',
  'TOCPHA',
  'NIA',
];
const tableHeaders = [
  'Name',
  'Calcium',
  'Potassium',
  'Iron',
  'Zinc',
  'Vitamin A',
  'Vitamin C',
  'Vitamin B-12',
  'Vitamin D',
  'Vitamin E',
  'Niacin',
];

// reference https://www.health.harvard.edu/staying-healthy/listing_of_vitamins
const vitaminDailyDosage = [
  1000, // 'Calcium, Ca': , mg
  4700, // 'Potassium': , mg
  10, // 'Iron': , mg
  10, // 'Zinc': , mg
  800, // 'Vitamin A': , ug
  80, // 'Vitamin C': , mg
  2.4, // 'Vitamin B-12': , ug
  50, // 'Vitamin D': , ug
  15, // 'Vitamin E': , mg
  15, // 'Niacin': , mg
];

const VIEWOPTS = ['CardList', 'Table'];

const UNIT_TYPES = ['Metric', 'Percentage'];

module.exports = {
  tableProperties,
  AILMENTS,
  tableHeaders,
  vitaminDailyDosage,
  VIEWOPTS,
  UNIT_TYPES,
};
