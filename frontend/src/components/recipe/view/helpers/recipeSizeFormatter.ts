export default function recipeSizeFormatter(
	unit: string,
	amount: number
): string {
	if (amount > 1) {
		return `${amount} ${unit}s`;
	}
	return `${amount} ${unit}`;
}
