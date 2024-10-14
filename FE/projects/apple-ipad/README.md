# Fastcampus - Apple ipad app Project

### Overview

- fastcampus 강의에서 진행하는 애플 아이패드 웹 사이트 클론코딩 프로젝트를 수행했다.

- 먼저 만들어보고 강의에서 제시하는 구현 방법과 나의 구현 방법을 비교하고, 새로 배우고 개선한 점을 기록한다.

## word-break: keep-all

- width 제한이 있는 container에 text를 입력할 때 줄 바꿈이 단어별로 발생시키기 위해 [word-break: keep-all](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break#keep-all)옵션을 사용한다.

- 기본 옵션은 `word-break: normal`인데, 이는 영어 텍스트를 입력할 때 단어를 기준으로, 즉 띄어쓰기 기준으로 줄 바꿈이 잘 발생하지만, 한국어는 단어를 구분하지 못해 띄어쓰기 기준으로 줄 바꿈이 발생하지 않고, 문자마다 줄 바꿈이 발생한다.

- keep-all 속성값은 `CJK(Chinese/Japanese/Korean) text`를 위한 속성이라고 한다. 알파벳 순으로 나열해서 우리나라가 마지막에 온 것이라고 하더라 **(중국, 일본이 우월하다는 것이 아님.)**

## background-image - alternate text

- 이미지를 삽입할 때 스크린 리더를 사용하는 경우를 생각해 접근성을 강화하는 `IR(image replacement)`기법을 사용한다.

- 보통 img tag에는 alt속성이 있기 때문에 대체 택스트를 입력함으로써 [accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#accessibility)를 보장할 수 있다.

- 하지만 div같은 태그에 background-image로 이미지를 지정한 경우 **alt**를 배치할 수 없는데, 그 대신 해당 태그 안에 alt를 배치하고 `text-indent`속성을 활용해 숨긴다.

```css
header ul.menu > li.apple-logo > a,
header ul.menu > li.search-starter > a,
header ul.menu > li.basket-starter > a {
  text-indent: -9999px;
}

header ul.menu > li.apple-logo {
  background-image: url('../images/header_apple.svg');
  background-repeat: no-repeat;
  background-position: 0 13px;
}

header ul.menu > li.search-starter {
  background-image: url('../images/header_search.svg');
  background-repeat: no-repeat;
  background-position: 0 13px;
}

header ul.menu > li.basket-starter {
  background-image: url('../images/header_bag.svg');
  background-repeat: no-repeat;
  background-position: 0 13px;
}
```

- `9999px`은 일종의 관습이라고 한다. 이 방식으로 텍스트를 숨김으로 써 접근성을 강화할 수 있다.

- 하지만 이 방식은 브라우저의 랜더링 시간을 증가시켜 좋지 않다고 한다.

- `overflow`를 활용해 필요한 만큼만 택스트를 밀어 넣는 방법도 있었다.

```css
.ir-text {
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}
```

- `white-space: nowrap`으로 줄바꿈을 방지하고 container의 width 크기만큼 text를 밀어내고 숨기는 기법이다.

  - **white-space** 속성 외에 `text-wrap: nowrap` 설정으로 같은 결과를 볼 수 있는데, [mdn문서](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)를 보면 white-space로 white-space-collapse, text-wrap 두 속성을 shorthand property로써 한 번에 설정 할 수 있다고 한다. **nowrap** 에 대해선 같은 기능을 수행하는 것 같다.

- 이것 말고 여러 방법이 있기 떄문에 -9999px을 사용하는 방법이 정답은 아닌 것 같다.

## shorthand property - override

- [shorthand property](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)를 사용하는 경우 해당 속성이 override되는 것을 잘 봐야 한다.

- shorthand property에서 설정해주지 않은 값들은 지정하지 않는 것이 아니라 해당 shorthand property에서 default 값으로 자동 설정해주기 때문이다.

```css
header ul.menu > li.search-starter {
  background-image: url('../images/header_search.svg');
  background: 0 13px no-repeat;
}
```

- 이 경우 background shorthand property의 background-image의 default값은 `none`이기 때문에 이미지가 보이지 않게 된다.

```css
header ul.menu > li.search-starter {
  background: url('../images/header_search.svg') 0 13px no-repeat;
}
```

- 따라서 이런 방식으로 한 번에 묶어 주던가 `shorthand property를 가장 상위에 두어야 한다`.

```css
.box {
  border-color: red;
  border: 10px solid;
}
```

- 이 경우도 shorthand property에 의해 border-color 속성이 **override**되어 default값인 `black`으로 설정된다.

- 결론적으로 shorthand property를 사용할 때 신중해야 한다.

## dropdown menu - arrow

- dropdown menu에 arrow 모양을 추가하기 위해 [pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)의 ::before을 사용한다.

- dropdown menu의 content와 별개로 arrow를 위한 box를 생성한다.

```html
<div class="basket">
  <div class="arrow"></div>
  <div class="message">장바구니가 비어 있습니다.</div>
  <ul>
    <li><a href="javascript:void(0)">장바구니</a></li>
    <li><a href="javascript:void(0)">저장된 항목</a></li>
    <li><a href="javascript:void(0)">주문</a></li>
    <li><a href="javascript:void(0)">계정</a></li>
    <li><a href="javascript:void(0)">로그인</a></li>
  </ul>
</div>
```

```css
header .basket > .arrow::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: rotateZ(45deg);
  transform-origin: 0 0;
  background-color: #fff;
  border: 1px solid #d2d2d2;
}
```

- arrow의 ::before element를 rotate로 회전시킨 후 위치 조정을 한다.

- arrow의 가장자리 길이를 정확하게 계산하기 위해서 `box-sizing: border-box`값을 설정했다.

- `transform-origin: 0 0`으로 하고 **top, left**속성으로 정확한 위치를 조정한다. 그렇지 않으면 회전한 사각형을 정확한 위치에 배치하기 위해선 `sqrt` 기능이 필요하게 되며 수학적으로 계산이 필요하기 때문에 복잡하다.

### Example

![arrow example1](./readme_img/image.png)

- 빨간 사각형 변의 길이를 a라고 하면 transform-origin값은 `a/2 a/2`다.

- 여기서 `transform-origin: 0 0`처럼 이동을 하려면 sqrt를 사용한 결과의 값이 필요하다.

  - 검은 사각형 변으로부터 빨간 사각형 꼭지점 까지의 거리 **sqrt(a<sup>2</sup>/2) - (a/2)**

- 결과적으로 두 경우의 수는 같은 결과를 보여준다

  - transform-origin: 0 0;

  - top: **sqrt**(a<sup>2</sup>/2) - (a/2); left: -(a/2); `a = 빨간 사각형의 width라 가정`

- 이는 매우 비효율적이기 때문에 `transform-origin: 0 0`을 사용하는 것이 맞다.

## event.stopPropagation()

- dropdown menu의 특정 아이콘 매뉴가 활성화 될 경우, 이를 비활성화 하기 위해 아무 곳이나 클릭 할 수 있는 기능을 추가 하려면 [event bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling)을 막아야 한다.

```javascript
searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
window.addEventListener('click', hideSearch)
```

- bubbling으로 인해 어떠한 하위 요소를 클릭하더라도 반드시 이 메서드가 실행된다.

- 즉 활성화된 dropdown container를 클릭하더라도 **event bubbling** 에 의해 event가 하위요소로부터 최상위(window)까지 전파되어 window에 대한 Listener가 실행된다.

- 즉 구조상 showSearch가 실행되면 hideSearch는 실행되지 않아야 하므로 showSearch에서 Event전파를 막아주는 `stopPropagation`이 필요하다.

```javascript
const showSearch = (e) => {
  headerEl.classList.add('searching')
  // ... 기능 구현부
  e.stopPropagation()
}
```

- 이러한 방식으로 Event bubbling을 방지하기 위해선 하나의 기능을 목적으로 묶인 모든 box에 대해 bubbling을 방지해 주어야 한다.

```html
<div class="search-wrap">
  <div class="search">
    <div class="shadow"></div>
    <div class="textfield">
      <div class="search-icon"></div>
      <input type="text" placeholder="apple.com 검색" />
      <div class="search-closer"></div>
    </div>
    <div class="autocompletes">
      <h3>빠른 링크</h3>
      <ul>
        <li>
          <a href="javascript:void(0)"
            >Apple Store 임시 휴무 관련 자주하는 질문</a
          >
        </li>
        <li>
          <a href="javascript:void(0)">Apple Store Online에서 쇼핑하기</a>
        </li>
        <li><a href="javascript:void(0)">액세서리</a></li>
        <li><a href="javascript:void(0)">AirPods</a></li>
        <li><a href="javascript:void(0)">AirTag</a></li>
      </ul>
    </div>
  </div>
</div>
```

- search와 관련된 기능은 해당 기능의 최상위 container인 .search-wrap container에 모두 포함되어 있으므로 .search-wrap을 벗어나지 않은 클릭에 대해서는 bubbling이 발생해서는 안된다.

- 따라서 해당 container에 대한 bubbling도 막아준다.

```javascript
searchWrapEl.addEventListener('click', (e) => {
  e.stopPropagation()
})
```

- 하지만 이러한 방식은 코드의 유연성을 떨어뜨리는 단점이 있다.

- 이 경우 search-wrap - window 사이에 다른 section이 끼어 있거나 같은 event action에 대한 window만의 고유 event handling이 필요한 경우 이 방법은 옳지 않다.

- 이를 고안한 다른 방법은 `e.target`에서 특정 element를 구분하는 것이다.

- `e.target.classList.contains()`, `e.target.nodeName`등을 활용한 구별 방법도 있지만 이는 코드가 길어지거나 예외 상황이 많았다.

- 여기서 가장 효율적인 [Element.closest()](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) 메서드를 사용하는 방법을 알 수 있었다.

```javascript
window.addEventListener((e) => {
  if (!e.target.closest('.search-wrap')) {
    hideSearch()
  }
})
```

- `element.closest(Selector)` 메서드는 Selector와 일치하는 가장 가까운 조상 element를 찾는데(자신포함) 여기서 만약 window를 클릭한다면 결과 값은 null이 나오기 때문에 숨기는 기능을 실행할 수 있고, window로 전파된 이벤트를 이어서 handling할 수 있다.

## visibility - interpolation

- 특정 조건에 따라 DOM element가 화면에 표시되어야 하는 경우, 화면에 표시되지 않을 때 browser에 접근성을 보장해주어야 한다.

- 만약 opacity만 변화를 주어 element를 보이지 않게 할 경우 보여지지 않을 뿐 해당 element의 모든 속성은 유지되어 클릭을 할 때 방해를 줄 수 있다.

- 따라서 element가 화면에 표시되지 않을 때 [accessibility tree](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility#accessibility_apis)에서 제거해야 한다.

- `transition`을 활용해서 특정 element의 opacity를 자연스럽게 변환시키는 동시에 `accessibility tree`에서 제거하기 위해 `visibility` 속성을 사용한다.

```css
header .search-wrap {
  opacity: 0;
  visibility: hidden;
  transition: 0.6s;
  /* ... */
}

header.searching .search-wrap {
  opacity: 1;
  visibility: visible;
}
```

- 이렇게 되면 visibility 의 [interpolation](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility#interpolation) 특성에 의해 animation이 있다면, 모두 처리된 후 visible / not-visible 처리가 된다.

### display - block / none animating display

- 이 경우 opacity의 변환의 의도한 대로 보여지지 않는다.

```css
header .search-wrap {
  opacity: 0;
  display: none;
  transition: 0.6s;
  /* ... */
}

header.searching .search-wrap {
  opacity: 1;
  display: block;
}
```

- display속성으로 transition의 특성을 이끌어낼 수 없지만 `animation`으로 일부 효과는 이끌어낼 수 있다.

```css
.box {
  display: none;
  /* ... */
}

.box.show {
  display: block;
  animation: showBox 1s;
}

@keyframes showBox {
  0%: {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

- display속성의 [animating display](https://developer.mozilla.org/en-US/docs/Web/CSS/display#animating_display) 특성상 block -> none으로 변환 할 때 `animation duration`의 초기값은 100%값로 갖는다.

- 반대로 none -> block으로 변환하는 경우 `animation duration`은 0%를 초기값으로 가짐으로, fade-in효과는 구현할 수 있다.

- 하지만 여기서 animation 진행 자체에 display를 설정함으로 써 원하는 fade-out 모션도 구현할 수 있었다.

```css
.hide {
  animation: hideBox 1s;
  display: none;
}

@keyframes hideBox {
  0% {
    display: block;
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

- hideBox animation 부분의 0%에 display:block으로 설정하면 .hide의 display: none과 관계 없이 animation이 진행되는 것을 볼 수 있엇다.

- 즉 show와 hide를 모두 구현한 후 이 둘을 toggle하는 방식으로 DOM을 조작하면 구현할 수 있다.

- 하지만 이 방식은 매우 비효율적이기 때문에 `visibility`를 사용한다.

## html - fixed

- 특정 section이 활성화 될 때 전체 document 페이지가 고정되어야 할 필요가 있다.

- html 자체에 `position: fixed`값을 설정해 page를 고정시키고 `overflow-y: scroll`설정으로 스크롤바가 표시 되도록 한다.

```css
html.fixed {
  position: fixed;
  wtdth: 100%;
  overflow-y: scroll;
}
```

### 'wheel' event

- 다른 방법으로는 `wheel` event를 제어하는 것이다.

```javascript
document.body.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault()
  },
  { passive: false }
)
```

**(`window`, `document.body`에 대해선 preventDefault를 적용시키기 위해 `passive` 옵션이 필요하다)**

- 이 경우 **event bubbling** 에 의해 **wheel event** 가 최상위 element인 body / window까지 전파시킬 수 있으므로, 전파된 event에 대한 기본 동작을 취소시켜 scroll이 되지 않게 할 수 있다. 중요한 점은 하위 element에 대해 **stopPropagation으로 bubbling을 막은경우** wheel을 하게 되면 스크롤이 동작하게 된다.

- 따라서 wheel 이벤트를 제어함으로써 스크롤을 방지하려면 많은 요소에 대해 `preventDefault()`를 설정 해주어야 한다. 이는 매우 복잡하므로 `position: fixed`를 html에 직접 스타일링 해주는 것이 효율적이다.

## figure - figcaption alt

- figure에 포함된 이미지를 설명하는 figcaption이 image로 디자인된 text인 경우 background-url로 이미지 텍스트를 삽입하고, text는 숨긴다.

```html
<figure>
  <img src="./images/hero_ipad.jpg" alt="hero_ipad_image" />
  <figcaption>
    <div class="bgtext caption-camera">
      센터 스테이지 기술이 적용된 새로운 울트라 와이드 전면 카메라
    </div>
    <div class="bgtext caption-chip">A13 BIONIC 칩 전격 탑재</div>
    <div class="bgtext caption-storage">저장 용량은 64GB부터</div>
  </figcaption>
</figure>
```

```css
.bgtext {
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}
```

- [text-indent: 9999px를 사용하게 되는 경우](#background-image---alternate-text)

```html
<figure class="bgtext">
  <img src="./images/hero_ipad.jpg" alt="hero_ipad_image" />
  <figcaption>
    <div class="caption-camera">
      센터 스테이지 기술이 적용된 새로운 울트라 와이드 전면 카메라
    </div>
    <div class="caption-chip">A13 BIONIC 칩 전격 탑재</div>
    <div class="caption-storage">저장 용량은 64GB부터</div>
  </figcaption>
</figure>
```

```css
.bgtext {
  text-indent: -9999px;
}
```

- 최상위 element(figure)에 class를 걸어두어도 하위 요소에 모두 들여쓰기가 적용되어 코드가 간결해지는 결과를 볼 수 있지만, render과정에서 자원소모가 비교적 크다 하고 **(간단히 측정해 봤는데 거의 차이가 없다고 봐도 될 정도)** `-9999px`이라는 표현 자체가 관습적이라고는 하지만 논리적인 측면에서 부적절한 면이 있다고 생각이든다.

- 따라서 `text-indent를 100%`와 `overflow:hidden`을 적용하는 방식으로 대체 택스트를 구현.

## vender prefix - 공급업체 접두사

- css 속성에서 아직 모든 브라우저에서 지원하지 않고 개발중인 속성이 있다.

- 이러한 속성은 부분적으로 기능을 제공하는데, `vender prefix`를 붙힘으로써 속성을 사용할 수 있다.

```css
img {
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}
```

- **user-drag** 속성은 현재 Chrome browser에서 기능 개발이 완료되지 않은 속성(partial support)이기 때문에 `-webkit-` 이라는 vender prefix를 붙힌 속성을 사용할 수 있다.

- 브라우저 지원 현황은 [caniuse 웹 사이트](https://caniuse.com/?search=user-drag)에서 확인 할 수 있다.

## Declaring global CSS variables

- 2개의 dash(--)를 사용해서 CSS안에 [custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)를 선언할 수 있다.

- 보통 **최상위 element** 에 global variables로써 선언하는데, html에 선언 하는 것 보다 `:root` 가상 클래스 안에 선언 한다.

```css
:root {
  /* declaring in :root instead of html */
  --color-white: #fff;
  --color-black: #000;
  --color-font: #1d1d1d;
  --color-font-darkgray: #6e6e6e;
  --color-font-middlegray: #b7b7b7;
  --color-font-lightgray: #f5f5f5;
  --color-link: #0071e3;
  --color-link-focus: #81b9f1;
  --color-border: #d2d2d2;
  --color-header: #3a3a3a;
  --color-section: #f5f5f5;
  --color-shadow: rgba(0, 0, 0, 0.4);
}
```

- [:root pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)는 html을 선택하는 것과 같다.

- 차이점은 브라우저가 CSS 스타일을 결정할 때 가장 관련있는 스타일 선택의 우선순위, 즉 [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)가 다르다.

- 가장 연관있는 CSS 스타일을 선택하는 알고리즘인 **spicificity** 에 의해 `html보다 :root pseudo-class의 스타일이 우선 적용 된다.`

- spicificity algorithm에서 사용되는 [selector weight](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#selector_weight_categories)규칙에 의해 html은 type column에 해당하므로 0-0-1의 **무게 값(weight value)** 을 가지고, :root는 가상 클래스이기 때문에 class column에 해당한다. 따라서 :root는 0-1-0의 weight value를 가진다.
