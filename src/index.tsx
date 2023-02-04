import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux/es/exports'
import App from './App'
import './index.scss'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);




window.addEventListener("keydown", (e) => {
	if (e.key === 'n') document.querySelectorAll('*').forEach((el) => el.setAttribute('style', 'outline: 1px solid red'))
})
window.addEventListener("keyup", (e) => {
	if (e.key === 'n') document.querySelectorAll('*').forEach((el) => el.setAttribute('style', ''))
})