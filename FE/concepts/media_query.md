## Media query

- media query는 다양한 환경에서 웹 환경에 요구사항을 모든 사용자 관점에서 접근 가능하도록 하기 위한 다자인 기술이다.

### necessity - universality

[Tim Berners-Lee once noted, "The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.](https://en.wikipedia.org/wiki/World_Wide_Web#Accessibility)

- device differences: 현대 사회에는 다양한 미디어 기기가 있으며, 기기마다 화면 크기, 종류 등 환경이 다르기 때문에, 모든 기기 환경에서 웹 환경에 접근 가능하도록 디자인을 해야 한다.

- accessibility: 모든 사용자에게 일관되고 최적화된 경험, 동일한 정보을 제공하기 위한 디자인으로써 최적화할 필요가 있다.

### syntax

- css media query 적용 조건의 구분은 크게 두 부분으로 나뉜다

```css
@media all /* <type> */ and (max-width: 1000px /* break point */) {
	/* styles... */
}
```

- 타입(type) - 사용자의 환경(가로/세로 너비, 디바이스 환경 등)타입에 따라 적용시킬 스타일을 결정할 수 있다. `기본 값은 'all' 이며 생략할 수 있다.`

- 중단점(breakpoint) - 사용자 환경의 크기를 조건으로 두어 스타일을 적용시킬 수 있다.

### 접근법(approach)

- `desktop(tablet)-first approach` : 기본 CSS스타일을 가장 큰 환경인 desktop(tablet)환경을 기준으로 작성하고, 이후 media query를 사용해 작은 환경(mobile mode)에 맞추어 CSS 스타일을 작성하는 방법이다. 이 경우 breakpoint 조건에 `max-width 속성`을 적용하여 크기를 낮추어 간다.

- `mobile-first approach` : desktop(tablet)-first approach와 반대로 기본 CSS 스타일을 mobile 관점에 맞추어 작성하고, breakpoint 조건에 `min-width 속성`을 적용하여 점진적으로 큰 사용자 환경에 맞춘 디자인을 작성하는 방법이다.

### breakpoint

- 중단점의 기준(px)과 개수는 표준적인 정확한 값이 없다.

- 따라서 웹 환경, 디자인 요구사항에 따라 여러 중단점을 둘 수 있고, 적은 중단점을 둘 수 있다.

- [bootstrap docs](https://getbootstrap.com/docs/5.3/layout/breakpoints/#available-breakpoints)의 breakpoints는 총 6개로 구성되어 있다.

- [tailwind css dock](https://tailwindcss.com/docs/responsive-design#targeting-a-breakpoint-range)의 breakpoints는 총 5개로 구성되어 있다.
