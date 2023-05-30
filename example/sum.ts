export default function sum(a: number, b: number) {
	return a + b;
}

export function sumArray(a: number[]) {
	return a.reduce((partialSum, current) => partialSum + current, 0);
}
