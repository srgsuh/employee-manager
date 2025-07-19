import {generateRandomSequence} from "./rand-sequence-gen.ts";
import _ from "lodash";

export function getAgeFromDate(dateStr: string): number {
    const bDate = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bDateThisYear = new Date(today.getFullYear(), bDate.getMonth(), bDate.getDate());
    return (today.getFullYear() - bDate.getFullYear()) +
        (today.valueOf() > bDateThisYear.valueOf() ? 0 : -1);
}

export function randomSubarray<T>(array: T[], length: number): T[] {
    const indices = generateRandomSequence(length, 0, array.length - 1);
    return indices.map(i => array[i]);
}

export function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

