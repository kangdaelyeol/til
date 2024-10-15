## Sprite image

- 웹 분야에서 sprite image는 하나의 파일에 여러 이미지를 펼쳐 놓은 것이라고 한다.

- 여러 이미지를 하나의 파일에 합쳐놓음으로써 하나의 이미지로 여러 부분의 디자인에 사용할 수 있다.

- **img** 태그를 사용하지 않고, background-image로 이미지를 브라우저에 표현하는 방식이다.

- 보통 가상 요소(pseudo-element)를 활용하여 사용한다고 한다.

```html
<a href="javascript:void(0)" class="icon1">icon1</a>
<a href="javascript:void(0)" class="icon2">icon2</a>
<a href="javascript:void(0)" class="icon3">icon3</a>
<a href="javascript:void(0)" class="icon4">icon4</a>
```

```css
a::after {
	display: block;
	content: '';
	width: 28px;
	height: 28px;
	background-image: url(img);
}

/* sprite img의 크기가 2 x 2(56px * 56px) 인 경우 */

a.icon1::after {
	background-position: 0 0;
}

a.icon2::after {
	background-position: -28px 0;
}

a.icon3::after {
	background-position: 0 -28px;
}

a.icon4::after {
	background-position: -28px -28px;
}
```

**feature**

1. 자원 요청 속도가 줄어듦

- 여러 요소의 디자인이 필요한 경우, 그 만큼 여러 이미지 자원을 요청하는 것이 일반적이지만 그러한 이미지 자원을 sprite image로 모음으로써 하나의 이미지만을 요청하고 그만큼 브라우저의 로딩 시간을 단축할 수 있다.

2. 하나의 자원만 관리하면 된다.

- 여러 파일을 관리하지 않고 하나의 자원만 관리할 수 있기 때문에 편리하다.

- 하지만 반대로 하나의 파일이 손상되거나 문제가 생기면 전체적으로 문제가 생기기 때문에 위험하다. SPOF같은 느낌이다.

- 이미지의 교체, 삭제, 삽입이 필요한 경우 포지션 전체를 변경해야 하는 경우가 생길 수 있기 떄문에 유지보수적 관점에서 봤을 땐 좋지 않다.
