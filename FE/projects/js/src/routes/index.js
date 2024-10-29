import { createRouter } from '../core/core'

// case sensitive와 관련된 문제: 파일 변경사항 실시간 반영이 안됨, OS 자체의 FS에 관한 문제.
// webpack --watch 와 유사한 버그라는데, 왜 이런지 모르겠다.
// 따라서 파일 명을 Pascal case -> lowercase로 수정함.import About from './about.js'
import Home from './home.js'

/* Route 생성 index - Routing modularization
 core에서 가져온 createRouter를 호출하며 생성된 Router를 export
 router 생성 로직은 core에서 구현, 각 route 정보(path, component)설정을 별로 모듈화(modularization)
*/

export default createRouter([
    { path: '#/', component: Home },
    { path: '#/about', component: About },
])
