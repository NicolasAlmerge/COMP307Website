import { Term } from "./enums/Term";

//////////// CONFIGURATION ////////////

// Year dropdown will start from here
export const START_YEAR = 2000;

// Year dropdown will end here
export const END_YEAR = 2023;

// Year selected by default
export const DEFAULT_YEAR = 2022;

// Term selected by default
export const DEFAULT_TERM = Term.Fall;

//////////// GENERATE ELEMENTS FROM CONSTANTS ABOVE ////////////

// Get all years from start year to end year
export const YEARS = Array.from(
    Array(END_YEAR - START_YEAR + 1).keys(),
    item => item + START_YEAR
);

// Reverse the order of the years
YEARS.reverse();
