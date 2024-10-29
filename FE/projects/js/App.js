import { Component } from './core/core'
import FruitItem from './components/FruitItem'
/* declarative rendering: UI Rendering -> UI DOM structure(view)(How to show), DOM Element value(state)(What to show) 두 개념으로 분리
 어떤 값(상태)를 보여줘야 되는지에 따른 상태 분리 -> JS state
 UI상에 어떻게 표현(render)되어야 하는지 분리  -> HTML CSS structure
*/

/* component 조건문(coditional statement)과 반복분(iteration statement / repetitive statement)
  * 선언된 state를 동적으로 rendering 한다.
    - template literal: 직접적인 HTML 문법을 element에 적용
    - filter(), map(): array type의 state를 가져와 html 문법구조의 string으로 생성
    - join(): 최종 변경된 array state를 하나의 html string으로 통합하기 위해 사용
 */

/* child component 생성 및 데이터 전달
  * 반복되는 요소를 'child component로써 정의하고, state를 props로써 전달한다.'
    - 자식 컴포넌트에 대해 정의 - 보여야할 HTML, Text구조를 정의
    - 보여줘야할 데이터(state)를 자식 컴포넌트에게 전달(props)
    - element.append의 다중 파라미터 특성을 활용해 array 타입의 state를 spread operator를 활용해 인수 전달
    - 자식 컴포넌트는 각각의 독립된 객체(요소) 로써 독립된 event handling이 가능함.
*/

export default class App extends Component {
    constructor() {
        super({
            state: {
                fruitList: [
                    {
                        name: 'apple',
                        price: 1000,
                    },
                    {
                        name: 'banana',
                        price: 2000,
                    },
                    {
                        name: 'grape',
                        price: 3000,
                    },
                ],
            },
        })
    }

    render() {
        this.el.innerHTML = /* html */ `
        <h1>fruit List</h1>
        <ul>
        <ul/>
      `

        const ulEl = this.el.querySelector('ul')

        this.state.fruitList.forEach((item) => {
            ulEl.append(new FruitItem({ props: { ...item } }).el)
        })

        ulEl.append(
            // spread operator
            ...this.state.fruitList.map(
                (item) =>
                    new FruitItem({
                        props: {
                            // spread operator
                            ...item,
                        },
                    }).el,
            ),
        )
    }
}
