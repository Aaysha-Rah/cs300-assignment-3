// Assignment 3: verification harness. Run it with: node harness.js
//
import { readFileSync } from "node:fs";

const books = JSON.parse(
    readFileSync("data/books.json", "utf8")
);
import { validateRecord, normalizeRecord, filterRecords, searchRecords, sortRecords, summarizeRecords, buildReport } from "./toolkit.js";
// 1. Import your functions from "./toolkit.js" and load your scenario's dataset from data/.
// 2. Write at least 12 named cases: normal inputs plus the five edge cases
//    (empty array, missing property, invalid number or wrong type,
//    different capitalization, equal values when sorting) and a nonmutation check.
// 3. Each case prints its name, the expected result, the actual result,
//    and the word PASS or FAIL, for example:
function runTest(name, expected, actual) {
    const passed =
        JSON.stringify(expected) === JSON.stringify(actual);

    console.log(
        `${passed ? "PASS" : "FAIL"} ${name} | expected: ${JSON.stringify(expected)} | actual: ${JSON.stringify(actual)}`
    );
}
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
console.log("Empty summary:", summarizeRecords([]));
console.log("Full book summary:", summarizeRecords(books));
console.log("Book report:", buildReport(books, "robot"));

console.log("Missing title:", validateRecord({
    creator: "Mina Reed",
    minutes: 240
})
);

// Check that normalization does not change the original book
const bookBefore = JSON.stringify(originalBook);

normalizeRecord(originalBook);

const bookAfter = JSON.stringify(originalBook);

console.log(
    "PASS normalize does not mutate:",
    bookBefore === bookAfter
);

// Check that sorting does not change the original array
const arrayBefore = JSON.stringify(booksToSort);

sortRecords(booksToSort, "minutes");

const arrayAfter = JSON.stringify(booksToSort);

console.log(
    "PASS sort does not mutate:",
    arrayBefore === arrayAfter
);

runTest(
    "Empty array summary",
    { count: 0, totalMinutes: 0 },
    summarizeRecords([])
);

runTest(
    "Missing title validation",
    { valid: false, errors: ["title is required"] },
    validateRecord({ creator: "Mina Reed", minutes: 240 })
);

runTest(
    "Invalid minutes validation",
    { valid: false, errors: ["minutes must be a number"] },
    validateRecord({ title: "Test Book", minutes: "thirty" })
);

runTest(
    "Search lowercase robot",
    1,
    searchRecords(books, "robot").length
);

runTest(
    "Search uppercase ROBOT",
    1,
    searchRecords(books, "ROBOT").length
);

runTest(
    "Search by creator",
    1,
    searchRecords(books, "mina").length
);

runTest(
    "Full book summary",
    { count: 8, totalMinutes: 1410 },
    summarizeRecords(books)
);

runTest(
    "Equal minutes alphabetical order",
    ["Quiet Satellites", "Robot Garden"],
    sortRecords(
        [
            { title: "Robot Garden", minutes: 240 },
            { title: "Quiet Satellites", minutes: 240 }
        ],
        "minutes"
    ).map(book => book.title)
);

runTest(
    "Normalize trims spaces",
    "Robot Garden",
    normalizeRecord({ title: "  Robot Garden  " }).title
);

runTest(
    "Filter art books",
    2,
    filterRecords(books, book => book.category === "Art").length
);

runTest(
    "Combined report search",
    ["Robot Garden"],
    buildReport(books, "robot").books.map(book => book.title)
);

runTest(
    "Sorting does not mutate",
    true,
    arrayBefore === arrayAfter
);