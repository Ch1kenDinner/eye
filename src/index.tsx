import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";
import { GlobalStyles } from "twin.macro";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { store } from "./redux/store";

const Styles = createGlobalStyle`
	svg {
		color: var(--red)
	}
	*::-webkit-scrollbar {
		width: 10px;
	}	
	*::-webkit-scrollbar-thumb {
		background-color: rgba(255, 0, 0, 0.7);
		border-radius: 20px;
	}
	:root {
		--black-10: rgba(255, 255, 255, 0.1);
		--red: #ff0000;
		--white: #fff;
		--black: black;
	}
`;

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <GlobalStyles />
    <Styles />
    <App />
  </Provider>
);

window.addEventListener("keydown", (e) => {
  if (e.key === "n")
    document
      .querySelectorAll("*")
      .forEach((el) => el.setAttribute("style", "outline: 1px solid red"));
});
window.addEventListener("keyup", (e) => {
  if (e.key === "n")
    document
      .querySelectorAll("*")
      .forEach((el) => el.setAttribute("style", ""));
});
