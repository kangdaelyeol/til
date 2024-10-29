import App from './App'

// index 생략 가능 (routes/index)
import router from './routes'

const root = document.querySelector('#root')
root.append(new App().el)
router()
