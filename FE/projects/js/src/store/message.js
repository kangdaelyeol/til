import { Store } from '../core/core'

// 데이터의 상태를 저장하는 Store 저장소를 정의
// key, value를 초기화 하는 설정부로써 논리적 모듈화
export default new Store({
    message: 'hello~',
})
