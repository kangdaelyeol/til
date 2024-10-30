import { Component } from '../core/core'
import messageStore from '../store/message'

export default class Message extends Component {
    constructor() {
        super()
        // 데이터 상태 관리에 대한 Store class instance의 구현된 기능을 간단히 사용함으로써 기능의 구현부를 고려하지 않고, 데이터 처리를 위한 모듈 사이의(Component - Store Class) 논리적 상호관계에 집중
        // 따라서 모듈 간의 관계에 논리적 추상화가 되어 있음.
        messageStore.subscribe('message', () => {
            this.render() // 해당 component를 갱신
        })
    }
    render() {
        this.el.innerHTML = /* html */ `
      <h2>${messageStore.state.message}</h2>
      `
    }
}
