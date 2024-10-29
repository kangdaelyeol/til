import { Component } from './core/core'

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
          ${this.state.fruitList
              .filter(({ price }) => price < 3000)
              .map(
                  ({ name, price }) =>
                      `<li>name: ${name}, price: ${price}</li>`,
              )
              .join('')}
        <ul/>
      `
    }
}
