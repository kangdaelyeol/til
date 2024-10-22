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

- 만약 opacity만 변화를 주어 element를 보이지 않게 할 경우 보여지지 않을 뿐 해당 element의 모든 속성은 유지되어 클릭 등 `focus` 접근을 할 때 방해를 줄 수 있다.

- [visibility hidden 특성](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility#hidden)상 **hidden** 값을 가지게 되면 `focus`를 받을 수 없는 상태가 되므로 사용자와 상호작용 할 수 없는 상태가 된다.

- 또한 hidden 옵션은 [accessibility tree](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility#accessibility_apis)로부터 제거된다.

  - 접근성 트리에서 제거되면 접근성 측면에 관한 요소 접근이 불가능해진다 **(e.g., 스크린 리더 접근)**

  - `accessbility tree에서 요소가 제거 되었다 해서 focus를 받을 수 없는 상태가 되는 것은 아니다`: DOM tree(render tree)에는 남아있어 해당 요소의 크기만큼 layout이 유지된다.

- `transition`을 활용해서 특정 element의 opacity를 자연스럽게 변환시키는 동시에 focus를 받을 수 없는 상태로 만들기 위해 `visibility` 속성을 사용한다.

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

- transition을 활용해 display속성의 연속적인 전환을 이끌어낼 수 없지만 `animation`으로 일부 효과는 이끌어낼 수 있다.

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

### difference between display:none

- [visibility: hidden](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility#hidden)은 `display:none`과 달리 `layout`에는 자신의 크기만큼 영향을 미친다.

- selector에 그대로 적용하는 경우 display가 우선적으로 적용되기 때문에 fade-out은 이끌어 낼 수 없다.

- display속성의 [animating display](https://developer.mozilla.org/en-US/docs/Web/CSS/display#animating_display) 특성상 block -> none으로 변환 할 때 none은 `animation duration`이 100% 진행도가 되었을때 변한다.

- 반대로 none -> block으로 변환하는 경우 `display: block`스타일이 `animation duration`진행도가 0%부터 적용되기 때문에 fade-in효과를 구현할 수 있다.

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

- 즉 show와 hide를 모두 구현한 후 이 둘을 js로 toggle하는 방식으로 DOM을 조작하면 구현할 수 있다.

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

## margin positioning - absolutely positioned box

- [absolutely positioned box](https://developer.mozilla.org/en-US/docs/Web/CSS/position#absolute) 특성상 margin은 서로 겹치지 않는다.

- absolute를 사용해 **이미지 요소** 를 배치할 때 이미지 요소 주변 약간의 공백(white space) 또는 여백(margin)이 있어 positioning에 약간의 오차가 발생할 수 있다.

- 이 때 top, left등의 속성으로 미세한 조정을 할 수 있지만, margin을 사용해 2차적으로 세부 위치 조정을 할 수 있다.

```css
.box {
  position: absolute;
  top: 100px;
  left: 100px;
  margin-left: -100px;
  margin-top: -100px;
}
```

- 이 경우 `top:0; left: 0;`과 같은 결과가 보여진다.

- margin을 음수, 양수값을 자유롭게 사용하며 positioning이 가능하다.

### lab: padding을 이용하는 것은 어떨까

- 결론적으로 padding을 활용한 positioning은 불가능하다.

- `box-sizing: content-box(default)`인 경우 요소의 크기가 늘어나며, top, left같은 기준 위치를 벗어나지 않는다.

- [css padding syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/padding#syntax)상으로도 padding에 negative value는 입력할 수 없다.

```css
.box1 {
  position: absolute;
  top: 100px;
  left: 100px;
  padding-top: 100px;
}

.box2 {
  position: absolute;
  top: 100px;
  left: 100px;
  padding-bottom: 100px;
}
```

- 이 경우 각 box안에 content가 없다면 같은 결과를 볼 수 있다.

- padding-top이라 해서 box가 위쪽으로 100px이 늘어나는 것이 아닌 `top: 100px`위치 밑에서 부터 padding이 생겨나 결과적으로 height가 밑으로 커지는 효과를 볼 수 있다.

- `box-sizing: border;` 인 경우, 지정된 width, height를 초과한 padding에 대해서만 box의 크기가 커진다.

```css
.box1 {
  position: absolute;
  width: 100px;
  height: 100px
  padding: 50px;
}

.box2 {
  position: absolute;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 50px;
}
```

- **box1** 의 크기는 padding에 의해 width, height크기가 각각 100px씩 증가될 것이다.

- **box2** 는 크기가 커지지 않는다. padding이 가로 세로로 100px씩 box의 크기만큼 딱 차지 되었기 때문이다.

## animation-fill-mode

- [animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode) 속성을 활용해서 animation 실행 전후 스타일을 제어할수 있다.

- 보통 이 속성은 animation-delay와 함께 상호작용을 할 수 있고, 또한 animation 완료 이후 상태를 유지할 수 있게 해준다는 점이 매력적인 것 같다.

- animation-fill-mode 속성을 통해 fade-in, fade-out을 더욱 간략히 구현 할 수 있었다.

```css
.box {
  width: 100px;
  height: 100px;
  background-color: black;
  animation: show 1s both;
}

.hide {
  animation: hide 1s both;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    display: none;
    opacity: 0;
  }
}
```

- `animation-fill-mode: both`를 적용해서 시작 전, 후를 항상 animation에 의존한 스타일로 설정했다. **(사실상 animation-delay 속성이 없기 때문에 forwards옵션을 적용해도 결과는 같다.)**

- box에 show animation을 default로 두어 hide적용시 override될 수 있도록 한다.

```javascript
btnEl.addEventListener('click', () => {
  boxEl.classList.toggle('hide')
})
```

- toggle을 사용함으로써 간단히 override를 적용시킬 수 있었고, if-else문을 사용하지 않아 코드가 간결해졌다.

- 하지만 이 또한 처음 페이지 랜더링 완료시 show 애니매이션이 실행되어 브라우저상 표현이 어색해 비효율적이다.

## animation-timing-function - steps

- CSS animation 진행 과정을 제어하기 위해 [animaion-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) 속성을 설정한다.

![sprite_img_example](./readme_img/sprite_image_example.png)

- sprite image에 여러 이미지가 있고, 그 이미지를 순차적으로 보여줌으로써 하나의 작은 애니매이션을 형성하려 할 때 `steps()`를 활용할 수 있다.

- sprite에 포함된 여러 이미지를 차례대로 보여주기 위해 translate속성을 변환시키는데, animaion은 기본적으로 linear속성을 가지므로 이미지의 위치가 변하는 과정이 연속적으로 보여 이는 자연스럽지 않다.

- 이미지 위치가 연속적(linear)으로 변하는 모션을 보여주지 않고 **이산적(discrete)으로** 변환하는 모션을 보여주려 할 때 `steps-easing-function` 을 활용할 수 있다.

- steps는 **animation-timing-function** 속성에 설정할 수 있는 [easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#step-easing-function)의 하위 옵션이다.

- `step-easing-function` 은 animation의 각 step, 즉 animation에서 설정한 이전, 이후 두 상태의 간격에 대해 `스타일 상태를 몇 번에 걸쳐 변환할 것인가`에 대해 결정하는 함수다.

```css
.box1 {
  animation: sample_animation 1s steps(2);
}

@keyframes sample_animation {
  from: {
    width: 100px;
  }
  to: {
    width: 200px;
  }
}
```

- 이 경우 animation의 스타일 변화는 두 개의 step 사이 단 한 번 일어나브로 1개의 변화 과정을 두 개의 step으로 표현한다. `i. e., (100px -> 150px -> 200px)`

- 하지만 여기서 2개의 상태값은 1개의 간격을 가지므로, `애니매이션의 진행도가 100%에 도달했다는 것은 시각적으로 0%진행도에 도달했다는 의미`이므로 **두 진행도(0% duration / 100% duration)는 시각적으로 겹치게 된다.**

- 따라서 0%진행도의 상태와 100%진행도의 상태 스타일이 다르다면 둘 중 하나의 스타일을 적용시켜야 한다.

![step_function_progress_image](./readme_img/step_function_progress.png)

- 각 스타일 변환 기준점(step)에서 다음 기준점으로 애니매이션을 진행하는 동안 이전 기준점(from)의 스타일을 사용할지, 다음 기준점(to)의 스타일을 사용할 지 결정해야 한다.

- 결국 2개의 steps을 가진 애니매이션에 steps(1)값을 설정할 경우, 이는 step-end와 같은 효과를 내므로 from의 스타일만 지속적으로 보여주게 될 것이다.

- 결론적으로 step-easing-function을 사용할 경우, **처음 step(from)** 의 스타일과 **마지막 step(to)** 의 스타일이 일치하지 않다면, `두 스타일 중 하나는 포기해야 한다.`

## mask image

- css의 [mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image) 속성으로 `mask layer` 에 사용될 이미지를 설정함으로써 요소의 표현 범위를 설정할 수 있다.

- video의 기울기 표현을 디자인 하기 위해 미리 기울어진 video source와, 기울 어진 video를 표현할 범위의 mask image가 필요하다.

---

<img src="./readme_img/mask-default-picture.png" width="250"/> <img src="./readme_img/mask-image.png" width="250"/> <img src="./readme_img/mask-video.png" width="250"/>

- 기본 이미지로 아이패드의 모서리를 표현하고, 마스크 이미지, 동영상 세 자원을 겹쳐 아이패드의 기울어진 각도에 자연스럽게 맞추어 배치할 수 있다.

- css의 **transform** 속성으로 기울기를 조절한 것이 아닌, 이미지 자체가 기본적으로 기울어져 디자인 되어 있다.

- 또한 해상도가 같은 크기로 되어 있기 때문에 이미지를 겹쳐 표현하기도 매우 수월했다.

---

### Lab - mask-image속성을 js를 통해 조작함으로써 스크롤에 따른 인터렉티브한 이미지 표현도 구현해볼 수 있었다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        height: 300vh;
        margin: 0;
        padding: 0;
      }

      .bg {
        position: sticky;
        top: 0;
        height: 100vh;
        background: url('./sample.png') center/cover no-repeat;
        mask-image: linear-gradient(black, black);
        mask-size: 100% 100%;
        mask-position: -100vw 0;
        mask-repeat: no-repeat;
      }
    </style>
  </head>
  <body>
    <div class="bg"></div>
    <script>
      const bgEl = document.querySelector('.bg')
      window.onload = () => {
        window.addEventListener('scroll', () => {
          const scrollRatio = 3 * (scrollY / document.body.offsetHeight)
          bgEl.style.maskPosition = `${(scrollRatio - 1) * 100}vw`
        })
      }
    </script>
  </body>
</html>
```

- `position: sticky` 옵션과 scroll 비율에 따른 `mask-position` 이동으로 이미지를 원하는 부분만큼 표현할 수 있다.

- transform-origin처럼 [mask-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-origin) 위치를 임의로 설정하고, mask-size 크기를 줄이는 방법을 사용할 수 없기 때문에, position을 사용하지 않으면 box의 왼쪽 위 모서리의 mask-image 시작점이 고정되어버린다.

- `따라서 이런 기법은 background-attachment: fixed 옵션을 사용하는 것이 더욱 수월해 보인다.`

## textContent - innerHTML / innerText

- 요소의 text 부분을 수정할 때 `textContent` 를 사용하는 것이 효율적이다.

### Node.textContent

- Node interface의 속성으로, 요소의 text를 그대로 설정한다.

- setter로 사용할 때 HTML문법에 맞추어 설정해도 브라우저에는 text로써 표현이 된다. 따라서 `XSS` 공격에 안전하다.

### innerHTML

- innerHTML속성은 `HTMLElement` interface의 속성으로, 요소의 HTML부분까지 모두 포함한다.

- setter로 사용할 때 브라우저는 HTML 문법에 따라 parsing 과정을 거치며, CSS, JS가 포함될시, 기능을 모두 수행할 수 있다. 따라서 `XSS` 공격에 취약하다.

```javascript
const divEl = document.createElement('div')

divEl.innerHTML = '<img src="xxxx" onerror="XSS" />'
```

- 이 경우 divEl 요소가 브라우저에 삽입이 될 경우 img 요소가 parsing되어 onerror부분이 실행된다.

#### textContent vs innerHTML

- textContent 속성값은 브라우저에서 [HTML parsing등 어떠한 해석 과정도 거치지 않고 표현하기 때문에](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innerhtml) innerHTML과 비교해서 매우 효율적이다.

- innerHTML은 요소의 text부분을 설정하는 것이 아닌, JS에서 동적으로 HTML요소를 삽입할 때 사용하는 것이 목적에 맞다.

### innerText

- HTMLElement interface의 속성인 innerText는 `브라우저 상에 표현된, 즉 브라우저상에서 표현된(rendered) 텍스트 값만을 포함한다.`

- 또한 innerText는 `style` 에 영향을 받는다. 요소의 스타일이 `display: none, visibility: hidden처럼 브라우저에서 보이지 않게하는 스타일`을 적용받는 요소의 텍스트 값은 포함하지 않는다. `(opacity: 0 스타일은 innerText에 포함된다)`

  - [요소 자체가 render되지 않은 경우는 textContent와 같은 값을 포함하고 있다.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText#value)

- [또한 요소안에 style이 포함된 경우 이를 parsing하며 text에 적용시켜 포함한다.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText#html)

#### textContent vs innerText

- innerText는 style을 parsing 과정을 거치므로, layout 해석과정에서 textContent와 비교했을 때 성능적인 차이가 있기 때문에 이를 고려해야 한다. `(물론 요소 안에 style을 삽입하는 경우는 없을 것이다.)`

## toLocaleString

- 숫자 데이터를 가격 표시를 위한 형태로 변경하기 위해 [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) 메서드를 사용한다.

  - 각 나라마다 숫자 데이터의 자릿수 구분, 표현 방식이 다르기 때문에 이를 국제화(internationalization)해줄 필요가 있다.

- argument로 주어지는 값은 [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) 표준을 따른다.

- Number.prototype.toLocaleString은 [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 객체의 구현여부에 따라 기능을 의존한다.

  - Intl.NumberFormat API가 구현되어 있다면, toLocaleString 메서드의 argument값인 **BCP 47 language tag** 는 유효한 값으로 사용되며, `결과적으로 Intl.NumberFormat의 기능을 사용하게 된다.`

  - 만약 Intl.NumberFormat API가 구현되어 있지 않으면 `시스템 내부 설정 값`에 의존한 지역에 맞추어 설정된 형태의 값을 반환한다.

### Date.prototype.toLocaleString

- Number.prototype.toLocaleString외에 **Date** 타입을 위한 toLocaleString 메서드도 존재한다.

- **Date.prototype.toLocaleString** 메서드는 [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) 객체 구현에 의존하여 **Number.prototype.toLocaleString** 과 같은 메커니즘으로 동작한다.

### 성능 최적화

```text/plain

Every time toLocaleString is called, it has to perform a search in a big database of localization strings, which is potentially inefficient. When the method is called many times with the same arguments, it is better to create a Intl.NumberFormat object and use its format() method, because a NumberFormat object remembers the arguments passed to it and may decide to cache a slice of the database, so future format calls can search for localization strings within a more constrained context.

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
```

- 문서에 따르면 Number.prototype.toLocaleString 기준으로 보았을 때, toLocaleString과 Intl.NumberFormat().format()은 같은 값을 반환하더라도, 성능적면에서 차이가 발생한다고 한다.

- toLocaleString 호출 마다 브라우저 Js엔진 내에 구현되어 있는 `big database of localization strings`, 즉 CLDR(Common Locale Data Repository) 데이터베이스에 접근하고, 탐색하여 formatting 기능을 수행한다. 따라서 반복 호출시 성능 저하가 발생할 수 있다.

- 하지만 Intl.NumberFormat 객체를 통한 formatting은 객체가 `arguments값을 내부적으로 cache하기 때문에`, 최적화된 기능을 제공한다.

- 따라서 Intl.NumberFormat등 Intl관련된 객체를 생성해서 API를 반복호출 하는 것이 좋다.

`이 외에도 Intl.ListFormat / DurationFormat등 다양한 표준화를 위한 format들이 존재한다.`

## footnotes

- 제품 설명의 부가적인 설명을 덧붙이기 위해 [footnote]() 를 사용한다.

### sup tag로 윗 첨자 추가

- `sup(superscript)` 태그로 윗첨자를 추가하고 `a` 태그의 href속성을 설정해 해당 부분을 클릭시 footnote로 이동할 수 있게 한다.

- sup 태그가 문장에서 글씨 윗 부분에 고정될 수 있는 이유는 브라우저에서 제공하는 기본 스타일중 `vertical-align: super` 스타일이 설정되어있는데, `reset.css` 등 스타일을 모두 초기화하는 스타일을 적용시킨 경우, 다시 스타일을 설정해주어야 한다.

```css
sup {
  vertical-align: super;
  font-size: 0.8em;
}
```

- font-size 크기도 조절해 footnote를 구현한다.

- pixel 값보단 em등 상대단위를 사용하는 것이 반응형 디자인에 더욱 유리하다.

### ol tag로 순서 정렬

![footnotes](./readme_img/footnotes.png)

- 페이지 맨 마지막에 표현된 footnote의 순서를 부여하기 위해 ol 태그를 사용한다.

- ol태그 또한 reset.css 스타일이 적용된 경우 기본 스타일이 적용되지 않았으므로 `list-style` 속성을 설정해야 한다.

```css
ol {
  list-style: decimal;
}

ol li::marker {
  font-size: 5px;
}
```

- `list-style: decimal` 스타일을 적용함으로써 해당 리스트에 포함된 li 들은 `marker`를 가지게 되며, `li::marker`로써 가상요소가 생성된다.

- marker는 각 li안에 자식요소로 써 생성 되기 때문에 ol또는 li의 font 관련 스타일 변경시 marker에도 같이 적용 되지만, marker에 대해 따로 적용하고 싶을 땐, li::marker 가상 요소를 선택하여 따로 스타일을 변경할 수 있다.

- ::marker는 가상요소이지만, ::after, ::before과 다르게 스타일을 적용시킬 수 있는 범위가 한정되어있다. 즉 `::marker` 가상요소는 스타일 적용 범위가 제한적이다.

## breadcrumb

![bread crumb example](./readme_img/breadcrumb.png)

- breadcrumb은 웹 서비스 내에서 자신이 현재 어느 페이지 경로에 있는지 알려주는 역할을 한다.

- 또한 검색 엔진에도 노출될 수 있기 때문에 `SEO(Search Enging Optimization)` 관점에서도 중요하게 작용한다.

- breadcrumb은 웹 페이지상 자신의 경로를 알려주기 때문에 사용자 관점에서 페이지를 바로 나가지 않고 뒤로가기를 유도해 [이탈율(bounce rate)](https://en.wikipedia.org/wiki/Bounce_rate)을 줄일 수 있다.

- breadcrumb item 사이에 간격을 두고 separator를 삽입하는데, flex 속성과 gap 속상을 활용할 수 있다.

```css
.footer .breadcrumbs {
  display: flex;
  align-items: center;
  gap: 30px;
}

.breadcrumbs::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 18px;
  top: 0;
  bottom: 0;
  right: -19px;
  margin: auto;
  background-image: url('../images/path_div.svg');
}
```

- separator를 이미지로써 사용하는 경우 이미지의 width크기와 breadcrumb items 사이 gap 크기를 계산해 중앙에 배치하도록 한다.

  - **separator의 left / right 각 여백 = gap(30px) - width(8px) / 2 = 11px**

  - 즉 right값을 separator의 width크기값(8px)를 포함해 총 -19px만큼 이동시키면 separator를 중앙에 배치할 수 있다.

## flex-box - remaining space(positive free space)

- flex container의 height 크기가 고정되어 있고, `flex-wrap: wrap` 스타일을 가지고 있는 경우, cross-axis line이 나누어진다.

- 나누어진 각 cross-axis의 크기는 유효한 content크기를 제외한 positive free space 크기를 분배하여 결정 된다.

  - cross-axis line 크기 = (remaining space 크기 / cross-axis line 총 개수) + 자신의 content 크기

  - content에 포함되는 속성 - width / height(cross-axis 방향에 따라 다름), padding, height, text등 size값을 가지는 모든 요소

```css
.flex-box {
  display: flex;
  flex-wrap: wrap;
  height: 600px;
  width: 1000px;
}

.box {
  width: 400px;
}

.b1 {
  background-color: #222222;
}

.b2 {
  background-color: #444444;
}

.b3 {
  background-color: #666666;
}

.b4 {
  background-color: #888888;
}

.b5 {
  background-color: #aaaaaa;
}
```

`flex-box 요소 안에 b1부터 b5까지 스타일이 각각 적용된 box요소가 5개 포함되어 있다 가정`

### content영역이 없는 box가 포함된 경우

![flex example](./readme_img/flexbox__no-content-box5.png)

- 여기서 box요소가 5개 있다면, cross-axis는 3개의 line으로 나누어지고, 각 box에는 content가 없으므로 각 cross-axis line은 200px 영역만큼 가지게 된다.

### box에 margin, padding 영역이 있다면

![flex example](./readme_img/flexbox__with-margin-padding.png)

```css
.b1 {
  background-color: #222222;
  margin-top: 20px;
}

.b3 {
  background-color: #666666;
  padding-top: 40px;
}
```

- 첫 번째 cross-axis line 영역에 포함된 b1의 margin 20px 크기와, 두 번째 cross-axis line 영역에 포함된 b3의 padding 40px 크기는 content영역이 된다.

  - remaining space = 600px - (20px(margin) + 40px(padding)) = 540px

- remaining space 540px 크기는 각 cross-axis가 정확히 나누어 가지게 된다.

  - 첫 번쨰 cross-axis line 크기 = 20px(margin) + 540/3px(remaining space) = 200px

  - 두 번쨰 cross-axis line 크기 = 40px(padding) + 540/3px(remaining space) = 220px

  - 세 번쨰 cross-axis line 크기 = 540/3px(remaining space) = 180px

### box요소 자체가 크기를 가지는 경우

![flex example](./readme_img/flexbox__with-dimension.png)

```css
.b3 {
  background-color: #666666;
  height: 200px;
}

.b5 {
  background-color: #aaaaaa;
  height: 300px;
}
```

- cross-axis 방향으로 요소 자체가 크기를 가지는 경우, content크기에 포함되어 remaining space 크기가 줄어든다.

  - remaining space = 600px - (200px(b2-height) + 300px(b5-height)) = 100px

- remaining space 100px 크기는 각 cross-axis line이 정확히 나누어 가지게 된다.

  - 첫 번쨰 cross-axis line 크기 = 100/3px(remaining space) = 33.33px

  - 두 번쨰 cross-axis line 크기 = 200px(b2-height) + 100/3px(remaining space) = 233.33px

  - 세 번쨰 cross-axis line 크기 = 300px(b5-height) + 100/3px(remaining space) = 333.33px

### align-items - align-contents

- `align-items` 속성은 각각의 cross-axis line상에서 배치된 요소의 정렬 방식을 결정하므로, 결과적으로 `cross-axis자체의 크기, 레이아웃`은 유지된다.

  ```css
  .flex-box {
    display: flex;
    flex-wrap: wrap;
    height: 600px;
    width: 1000px;
    border: 1px solid;
    align-items: flex-start;
  }
  ```

  - [위 예제](#box요소-자체가-크기를-가지는-경우)에서 추가적으로 .flex-box 요소 스타일의 `align-items: flex-start` 스타일을 추가해준다.

  ![flex example](./readme_img/flexbox__with-align-items.png)

  - 첫 번째 cross-axis line의 box는 아무런 content도 없으므로 box 자체 크기를 가지지 않아 보이지 않지만, remaining space 분배에 의한 cross-axis크기는 유지가 되는 것을 확인 할 수 있다.

- `align-contents` 속성은 각 cross-axis line들을 배치하는 방법을 결정한다. 즉 `flex-wrap: wrap`스타일이 적용되어 wrap이 발생해 cross axis가 여러개의 line으로 나누어 졌을 때 유효한 속성이다.
