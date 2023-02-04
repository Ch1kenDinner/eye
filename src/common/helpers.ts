
export const formatInt = (str: string) => str.replaceAll(/\B(?=(\d{3})+(?!\d))/g, '.');

export const debounce = (fn: any, delay: number) => {
	let timer: NodeJS.Timeout | undefined;
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => fn(...args), delay);
	}
}