// Assignment 3: verification harness. Run it with: node harness.js
//
import { validateRecord, normalizeRecord, filterRecords, searchRecords, sortRecords } from "./toolkit.js";
// 1. Import your functions from "./toolkit.js" and load your scenario's dataset from data/.
// 2. Write at least 12 named cases: normal inputs plus the five edge cases
//    (empty array, missing property, invalid number or wrong type,
//    different capitalization, equal values when sorting) and a nonmutation check.
// 3. Each case prints its name, the expected result, the actual result,
//    and the word PASS or FAIL, for example:
//    PASS  search ignores capitalization  expected: 1  actual: 1
// 4. Work out each expected result from the data before you run the case.
console.log(validateRecord({ title: "Test Book", minutes: "thirty" }));

const originalBook = {
    title: "  Robot Garden  ",
    creator: "  Mina Reed  ",
    minutes: 240
};

const cleanedBook = normalizeRecord(originalBook);

console.log("Cleaned book:", cleanedBook);
console.log("Original book:", originalBook);

const booksToFilter = [
    { title: "Robot Garden", category: "Science fiction" },
    { title: "River Sketches", category: "Art" }
];

const artBooks = filterRecords(
    booksToFilter,
    book => book.category === "Art"
);

console.log("Art books:", artBooks);

const searchBooks = [
    { title: "Robot Garden", creator: "Mina Reed" },
    { title: "River Sketches", creator: "Leo Park" }
];

console.log("Search robot:", searchRecords(searchBooks, "robot"));
console.log("Search ROBOT:", searchRecords(searchBooks, "ROBOT"));
console.log("Search mina:", searchRecords(searchBooks, "mina"));

const booksToSort = [
    { title: "Robot Garden", minutes: 240 },
    { title: "Trail Notes", minutes: 120 },
    { title: "Quiet Satellites", minutes: 240 }
];

console.log("Sorted books:", sortRecords(booksToSort, "minutes"));
console.log("Original order:", booksToSort);

