# React

## Table of Contents

[onClick - Node.contains](#onclick---nodecontains)

---

## onClick - Node.contains

### Node.contains

[Node.contains](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains) 메서드로 이벤트 타겟 요소의 자식 요소 여부를 검증할 수 있다.

### 요소 제거 및 검증 동시 문제

자식 요소 여부 검증과 관련된 이벤트 리스너는 일반적으로 전역(document)에 등록한다.

요소 클릭시, 클릭된 요소가 특정 요소의 자식 요소인지 검증을 하는 동시에 제거가 된다면 이벤트 버블링 및 리렌더링 동기화 처리로 인해 **제거가 우선적으로 발생한다.**

**`발생 과정`**

1: 버튼 클릭(onClick) -> setState 호출
2: 리렌더링 -> state 조건에 의해 DOM 요소 제거
3: 이벤트 버블링 -> document 이벤트 핸들러 호출
4: Node.contains 호출 -> DOM에서 제거된 요소에 대한 검증으로 인해 false값 반환(제거된 요소인 e.target객체는 어느 부모요소에도 포함되어 있지 않기 때문)

즉, 이벤트 버블링 과정에서 자식 요소에 발생한 이벤트 핸들러에 의해 이미 자식 요소가 DOM에서 제거된 후 전역 객체에서 click 핸들러가 발생하기 때문에 메커니즘이 꼬이는 것이다.

### 리엑트 합성(Synthetic) 이벤트 리스너 위임

React 17 이상에서는 합성 이벤트 리스너가 document 가 아닌 리액트 루트 컨테이너(Root DOM Container)에 위임되어 등록되기 때문에, 버블링 상 자식의 onClick이 항상 전역(document) 리스너보다 먼저 호출되는 순서가 보장된다.

React 16 이하에서는 리액트 리스너와 전역 리스너가 모두 document에 등록되므로, 둘의 호출 순서가 등록 시점에 따라 달라질 수 있다.

### mousedown 이벤트로 대체

네이티브 이벤트는 mousedown -> mouseup -> click 순으로 발생한다. 즉 mousedown은 항상 click보다 먼저 일어나므로, 자식 요소의 상태 변경(및 그로 인한 DOM 제거)이 아직 일어나지 않은 시점에 검증을 마칠 수 있다.

자식 요소의 onClick을 정의하고, 전역(document)에는 mousedown에 대한 리스너를 정의하여 DOM 제거가 일어나기 전에 우선적으로 검증이 이루어지도록 한다.
