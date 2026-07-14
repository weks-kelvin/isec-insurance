export function nextIndex(currentIndex: number, itemCount: number) {
	if (itemCount <= 0) return 0;
	return (currentIndex + 1) % itemCount;
}

export function previousIndex(currentIndex: number, itemCount: number) {
	if (itemCount <= 0) return 0;
	return (currentIndex + itemCount - 1) % itemCount;
}

export function boundedIndex(index: number, itemCount: number) {
	if (itemCount <= 0) return 0;
	return Math.min(Math.max(index, 0), itemCount - 1);
}
