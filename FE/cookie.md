# Cookie

## Table of Contents

[UTM - Urchin Tracking Module](#utm---urchin-tracking-module)

[UTM과 쿠키](#utm과-쿠키)

---

## UTM - Urchin Tracking Module

UTM은 링크 끝에 붙이는 추적용 꼬리표(쿼리 파라미터)다. 핵심 역할은 어떤 링크를 통해 사이트에 들어왔는지 분석 도구가 알 수 있게 해주는 것이다.

```text
https://example.com/landing?utm_source=facebook&utm_medium=paid_social&utm_campaign=f2_launch
```

UTM은 링크를 제작하는 사람이 직접 출처를 적어 넣는 방식으로, 세부적인 유입 경로를 추적할 수 있게 해준다.

- 브라우저가 자동으로 붙여주는 정보가 아니므로, 링크를 만들 때 UTM을 붙이지 않으면 추적되지 않는다.

**`Urchin`**

Urchin은 구글이 2005년에 인수한 웹 분석 회사 이름이다.

Urchin 회사 제품이 구글 애널리틱스(현재 버전은 GA4)의 전신이라서 이름이 그대로 남아있다.

### UTM이 필요한 이유

**`브라우저 헤더의 한계`**

브라우저는 요청을 보낼 때 Referer 헤더에 이전 페이지 주소를 담아 어디서 왔는지 알려주지만 한계가 있다.

- HTTP 헤더 이름은 초기 표준 문서의 오타가 그대로 굳어져 `Referer`(r 하나)로 쓴다. 관련 정책 헤더는 `Referrer-Policy`(r 둘)로 표기가 다르다.

| 문제           | 설명                                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 유입 경로 한계 | 카카오톡, 문자, 이메일, 앱, PDF에서 누른 링크는 Referer가 전송되지 않아 출처가 남지 않고 '직접 유입(direct)'으로 잡힌다.                                                                             |
| 상세 경로 한계 | 브라우저 기본 정책(`strict-origin-when-cross-origin`)상 다른 사이트로 이동할 때는 전체 URL이 아니라 도메인(origin)만 전달된다. 유입 사이트를 알더라도 어느 광고인지, 어느 캠페인인지 파악할 수 없다. |

### 기본 UTM 파라미터 종류(컨벤션)

| 파라미터     | 의미        | 질문                 | 예시                               |
| ------------ | ----------- | -------------------- | ---------------------------------- |
| utm_source   | 유입 출처   | 어디서?              | facebook, naver, kakao, newsletter |
| utm_medium   | 매체 유형   | 어떤 방식으로?       | paid_social, cpc, email, blog      |
| utm_campaign | 캠페인 이름 | 무슨 목적으로?       | f2_launch, black_friday_2026       |
| utm_content  | 소재 구분   | 어떤 광고 또는 버튼? | video_a, banner_top                |
| utm_term     | 키워드      | 어떤 검색어로?       | 레이저 각인기                      |

**`특징`**

| 특징                  | 설명                                                                                                                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 일반적 사용법         | 일반적으로 `utm_source`, `utm_medium`, `utm_campaign` 세 개는 항상 채우고, `utm_content`, `utm_term`은 필요할 때 추가한다                                                                                             |
| 대소문자 구분         | 값은 대소문자를 구분한다. `Facebook`과 `facebook`은 서로 다른 출처로 집계되므로, 소문자와 `_` 같은 규칙을 정해 일관되게 쓴다                                                                                          |
| GA4 채널 자동 분류    | GA4는 `utm_medium` 값을 보고 채널(Paid Social, Email 등)을 자동 분류한다. `cpc`, `email`처럼 널리 쓰는 값을 사용해야 채널이 올바르게 잡힌다                                                                           |
| 한글 또는 공백 인코딩 | 한글이나 공백은 URL에 그대로 넣을 수 없어 퍼센트 인코딩된다. (예: `레이저 각인기` → `%EB%A0%88%EC%9D%B4%EC%A0%80%20%EA%B0%81%EC%9D%B8%EA%B8%B0`) 링크를 직접 조합할 때는 `encodeURIComponent()`나 URL 빌더를 사용한다 |

### First touch / Last touch

UTM으로 수집한 유입 경로 데이터를 전환(신청, 구매 등)에 연결할 때, 어떤 채널에 성과를 돌릴지에 따라 first touch / last touch 방식으로 나뉜다. 이처럼 성과를 채널에 나눠 주는 규칙을 기여 모델(attribution model)이라고 한다.

| 방식        | 설명                                             |
| ----------- | ------------------------------------------------ |
| first touch | 처음 데려온 채널에 공을 돌리는 방식              |
| last touch  | 신청(전환) 직전에 들어온 채널에 공을 돌리는 방식 |

예: 사용자가 페이스북 광고로 처음 방문하고, 일주일 뒤 네이버 검색 광고로 다시 들어와 신청했다면

- first touch → 페이스북의 성과
- last touch → 네이버의 성과
- first touch는 "어떤 채널이 새로운 고객을 발견하게 했는가", last touch는 "어떤 채널이 최종 결정을 이끌었는가"를 보는 데 적합하다.

first / last touch 방식을 둘 다 사용할 경우 first_utm\_... / last_utm\_... 방식의 네이밍 컨벤션을 사용한다.

- (예: `first_utm_source`, `last_utm_source`)

### 실무에서 자주하는 실수

**`사이트 내부 링크에 utm을 붙이는 것`**

메인 배너에서 상품 페이지로 가는 링크에 utm을 붙이는 경우, 원래 광고 출처가 내부 링크의 utm 값으로 덮어써진다.

- 이전 버전인 유니버설 애널리틱스(UA)에서는 utm 값이 바뀌면 새로운 세션이 시작되어, 세션 수가 부풀고 광고 출처가 덮어써졌다.
- GA4에서는 utm이 바뀌어도 새 세션이 시작되지는 않는 것으로 알려져 있다. (자료마다 설명이 엇갈리는 부분이다) 하지만 세션 수와 관계없이, 이후 일어난 전환의 성과가 내부 링크의 utm(예: `utm_source=main_banner`)에 돌아가 실제로 고객을 데려온 광고의 성과가 줄어드는 문제는 그대로다.
- 직접 구현한 last touch 저장 로직(아래 UTM과 쿠키 참고)도 내부 링크의 utm으로 덮어써진다.

따라서 내부 클릭 추적은 utm 대신 이벤트로 해야 한다. (예: GA4의 `select_promotion` 이벤트나 직접 정의한 클릭 이벤트)

**`redirect에서 utm이 사라지는 것`**

단축 URL, 또는 http -> https, www 유무 리다이렉트를 거치면서 쿼리가 누락되는 경우가 있다.

- 리다이렉트 자체가 쿼리를 지우는 것이 아니라, 서버의 리다이렉트 규칙이 원래 쿼리를 새 주소에 붙여주지 않게 설정되어 있으면 사라진다.

링크 생성시 실제로 테스트하여 최종 주소에 utm이 남는지 확인하는 것이 좋다.

**`utm을 # 뒤에 붙이는 것`**

`https://example.com/#/landing?utm_source=naver`처럼 해시(`#`) 뒤에 붙은 값은 쿼리 파라미터가 아니라 프래그먼트다. 서버로 전송되지 않고, GA4도 기본 설정으로는 읽지 않는다.

- utm은 `https://example.com/landing?utm_source=naver#section`처럼 `#` 앞의 쿼리 영역에 붙여야 한다.
- 해시 라우팅을 쓰는 SPA에서 링크를 만들 때 자주 발생한다.

### UTM과 쿠키

UTM은 처음 들어온 페이지의 URL에만 붙어 있다. 사용자가 다른 페이지로 이동하거나 며칠 뒤 다시 방문하면 URL에서 UTM이 사라진다.

그래서 신청 폼처럼 나중에 일어나는 전환에 UTM을 연결하려면, 처음 들어왔을 때 UTM 값을 쿠키(또는 localStorage)에 저장해 두었다가 전환 시점에 꺼내 써야 한다.

| 방식        | 저장 규칙                                                             |
| ----------- | --------------------------------------------------------------------- |
| first touch | 저장된 값이 **없을 때만** 저장한다. 이미 값이 있으면 덮어쓰지 않는다. |
| last touch  | UTM이 붙은 링크로 들어올 때마다 **덮어쓴다.**                         |

- last touch에서 UTM 없이 들어온 방문(직접 유입)까지 덮어쓰면, 대부분의 전환이 '직접 유입'으로 잡힌다. 그래서 보통 UTM이 있을 때만 덮어쓴다.

**`Safari 브라우저 정책 주의`**

Safari는 추적 방지 기능(ITP, Intelligent Tracking Prevention) 때문에 JavaScript(`document.cookie`)로 만든 쿠키의 유효기간을 최대 7일로 제한한다.

따라서 쿠키의 만료 기간(`expires`)을 90일로 설정해도 Safari에서는 7일 뒤 사라질 수 있으므로, 오래 보관해야 한다면 서버에서 `Set-Cookie` 헤더로 쿠키를 설정하는 방법을 고려한다.

- localStorage도 이 제한에서 자유롭지 않다. Safari는 사용자가 Safari를 사용한 7일 동안 해당 사이트를 방문(상호작용)하지 않으면 localStorage, IndexedDB 등 JavaScript로 저장한 데이터를 삭제한다. (Safari 13.1부터 적용)
- 차이점: 쿠키는 "만든 시점부터 7일"이 지나면 만료되고, localStorage는 "마지막 방문부터 7일" 동안 방문이 없으면 삭제된다. 그래서 자주 방문하는 사용자라면 localStorage가 더 오래 남는다.
- Safari 17(iOS 17)부터는 링크 추적 보호(Link Tracking Protection) 기능으로, 개인정보 보호 브라우징과 메일·메시지 앱에서 연 링크의 `gclid`, `fbclid` 같은 광고 클릭 ID를 URL에서 제거한다. utm 파라미터는 제거되지 않는 것으로 확인되지만, Apple이 제거 대상 목록을 공개하지 않으므로 직접 테스트해 보는 것이 좋다.

**`저장 방식 - localstorage`**

```text
// key: touchpoint_info

// value
[{"touchpoint_url":
"https://nsprotein.com/product/detail.html
?product_no=335
&cate_no=213
&display_group=1
&utm_source=google
&utm_medium=pmax
&utm_campaign=260910_g_pmax_qwp_ndet3
&utm_content=
&utm_term=
&nbsrc=adwords_x
&nbkw=
&gad_source=1
&gad_campaignid=24241093378
&gbraid=0AAAAACVCmSQCVB5kJ8-xxxxxxxxxx
&gclid=EAIaIQobChMI_xxxx_ZlwMVSKlmAh3xXDA7EAMYASAAEgKsBfD_BwE",
"touchpoint_time":1793079952585}]
```

- 저장 구조: 방문할 때마다 `{ 유입 URL, 방문 시각 }` 객체를 배열에 쌓는 방식이다. 배열의 첫 번째 항목을 보면 first touch, 마지막 항목을 보면 last touch가 되고, 중간 경로까지 모두 남으므로 여러 접점을 함께 분석(멀티 터치)할 수도 있다.
- `touchpoint_time`: 1970년 1월 1일부터 지난 시간을 밀리초로 나타낸 Unix timestamp(`Date.now()` 값)다. `1793079952585`는 한국 시간으로 2026-10-27 14:45:52이다.
- utm 값을 따로 뽑지 않고 URL 전체를 저장한다. 그래서 utm 외의 파라미터도 함께 남는다.

| 파라미터                       | 의미                                                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `utm_medium=pmax`              | 구글 실적 최대화(Performance Max) 캠페인을 뜻하도록 광고주가 정한 값                                                 |
| `utm_content=`, `utm_term=`    | 값이 비어 있다. 링크 템플릿에 파라미터만 넣고 값을 채우지 않은 경우로, 분석 시 빈 값으로 집계된다.                   |
| `gclid`                        | 구글 광고 클릭 ID. 구글 광고의 자동 태그 기능이 클릭마다 붙이며, 구글 애즈와 GA4가 클릭과 전환을 연결할 때 사용한다. |
| `gbraid`                       | iOS 환경 등에서 `gclid` 대신 쓰이는 구글 광고 클릭 측정용 파라미터                                                   |
| `gad_source`, `gad_campaignid` | 구글 광고가 자동으로 붙이는 파라미터로, 광고 출처와 캠페인 ID를 담는다.                                              |
| `nbsrc`, `nbkw`                | utm이나 구글 표준 파라미터가 아니라, 사이트나 사용하는 분석 도구가 따로 정의한 파라미터로 보인다.                    |
