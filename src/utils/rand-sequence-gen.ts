const COUNT_TO_RANGE_RATIO = 0.1;

export function generateRandomSequence(n: number, min: number, max: number): number[] {
    const ratio = n / (max - min + 1);
    if (ratio < COUNT_TO_RANGE_RATIO) {
        return generateByMemoize(n, min, max);
    }
    return generateBySelect(n, min, max);
}

function random(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateBySelect(n: number, min: number, max: number): number[] {
    const length = max - min + 1;
    const numbers = Array.from({length})
        .map((_, i)=>min + i);
    for (let i = 0; i < n; i++) {
        const randomIndex = random(i, length - 1);
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]]; // all chosen numbers in the beginning
    }
    return numbers.slice(0, n);
}

function generateByMemoize(n: number, min: number, max: number): number[] {
    const nums = new Set<number>();
    while (nums.size < n) {
        const randomNumber = random(min, max);
        if (!nums.has(randomNumber)) {
            nums.add(randomNumber);
        }
    }
    return Array.from(nums.values());
}