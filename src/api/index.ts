import axios from "axios";


export const api = axios.create({ baseURL: "https://youtube-v31.p.rapidapi.com" });

api.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers["X-RapidAPI-Key"] = process.env.REACT_APP_RAPID_KEY
	}
	return config
})