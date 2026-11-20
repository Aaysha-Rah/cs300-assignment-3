// Assignment 3: JavaScript Data Toolkit
//
// Write and export your seven functions in this file. You may use these names:
//
//   validateRecord(record)            returns useful error information for one record
//   normalizeRecord(record)           returns a cleaned copy; never changes the original record
//   filterRecords(records, condition) returns the records that match a condition you pass in
//   searchRecords(records, query)     matches 2+ properties, ignoring capitalization
//   sortRecords(records, property)    returns a new sorted array; never changes the original array
//   summarizeRecords(records)         returns a summary, such as a count, total, or average
//   buildReport(records, query)       combines at least two of the functions above
//
// Above each function, write a short comment: what it takes, what it returns,
// and whether it changes its input. Decide your tie rule for equal values
// and the shape of your validation errors before you write the code.

export function validateRecord(record) {
    const errors = [];

    if (typeof record.minutes !== "number") {
        errors.push("minutes must be a number");
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// Takes one book record and returns a cleaned copy.
// Does not change the original record.
export function normalizeRecord(record) {
    return {
        ...record,
        title: record.title?.trim(),
        creator: record.creator?.trim()
    };
}
// Takes an array of books and a condition.
// Returns a new array of matching books.
// Does not change the original array.
export function filterRecords(records, condition) {
    return records.filter(condition);
}

// Takes an array of books and a search query.
// Returns matching books without changing the original array.
export function searchRecords(records, query) {
    const searchText = query.toLowerCase();

    return records.filter(book =>
        book.title.toLowerCase().includes(searchText) ||
        book.creator.toLowerCase().includes(searchText)
    );
}

// Takes an array of books and a property.
// Returns a new sorted array without changing the original.
export function sortRecords(records, property) {
    return [...records].sort((a, b) => {
        if (a[property] === b[property]) {
            return a.title.localeCompare(b.title);
        }

        return a[property] - b[property];
    });
}