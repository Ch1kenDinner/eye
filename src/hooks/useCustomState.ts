import {useState} from 'react'

export const useCustomState = <T extends Required<Record<string, any>>,>(initState: T) => {
	const [data, setData] = useState<T>(initState)

	const result = {};

	Object.entries(initState).forEach(([field, value]) => {
		Object.defineProperty(result, field, {
			get() {return data[field]},
			set(newValue) {
				return setData((prev) => ({...prev, [field]: newValue}))
			}
		})
	})

	return result as T
}