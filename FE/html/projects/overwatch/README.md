# Fastcampus_overwatch Project

## Overview

- Fastcampus 강의에서 Overwatch 페이지 예제를 연습해보고 강사의 구현 방식과 비교해서 배운점을 간단히 정리

## Table Of Contents

1. [body -> background](#body---background)

2. [margin: auto](#margin-auto)

3. [transform](#transform)

<hr />

### body -> background

- block element는 특성상 width은 늘어나려고 하고, height은 줄어들려고 한다.

- body 또한 block element의 특성을 가지고 있고, 여기서 width를 주지 않고 height값만 주어 전체 화면에 background를 줄 수 있다.

- 즉 width를 다 포함하려고 css에서 `width: 100%` 또는 `width: 100vw`를 할 필요가 없었던 것.

- background속성은 [shorthand property](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)로 빠르게 적용함.

```css
body {
	height: 100vh;
	background: url(bgUrl) cover/center no-repeat;
	background-attachment: fixed;
}
```

<hr />

### margin: auto

- block element는 특성상 width은 늘어나려고 하고, height은 줄어들려고 한다.

- block element의 width가 정해져있어 나머지 공간이 있는 경우 이 공간을 free space?(정확한 명칭은 잘 모르겠음) 라고 하는데(라고 하겠다), 해당 공간을 margin: auto로 해서 중앙 정렬을 할 수 있다.

- 나는 이제까지 element들을 가로축이든 중앙 정렬을 할 때 flex로만 정렬을 해와서 코드가 비효율적으로 길어지고, 중앙 정렬을 위해 그 요소를 감싸는 wrapper요소까지 추가적으로 생성해 비효율적인 부분이 많았음.

  - 불필요한 flex container 사용

  - 불필요한 wrapper element 사용

  - element 계층 단계가 늘어남에 따라 각 요소의 클래스 이름을 정하는 것에 대한 철학적 고통

- 결과적으로 html, css 코드가 줄어들고, 가독성이 늘었다.

  - HTML element 계층이 간단해졌다.

  - css에서 flex를 사용하지 않게 되어 코드가 매우 줄어듦.

- 또한 block element의 특성을 알게 되어서 `max/min-width/height`에 대한 감각도 어느 정도 얻은 것 같다.

<hr />

### transform

- transform으로 해당 요소의 각각 속성마다 transition duration 다르게 지정하는 효과를 줄 수 있다는 것을 알게 되었다. 이는 내가 디자인 감각에 매우 둔감하다는 것을 내포하고 있다.

```css
.character {
	/* ... style*/
	transition: transform 0.1s, background-color 0.5s;
}
```

- 이제까지 transition의 [shorthand property](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)를 지정할 때 [easing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)까지 지정해서 넣어주었는데, 이는 default값이 없는줄 알고 있었다.

- transition-timing-function의 default값은 [ease](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function#ease)이다. 이제 easing function까지 안 써도 되겠다. 손만 아프다.
