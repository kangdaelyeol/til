# Multi Survey Form Project

## Table of Contents

## Project Architecture

### Container / Presentational pattern

해당 프로젝트는 Container / Presentational Pattern 기반의 컴포넌트 아키텍처를 사용했다. `하지만 정확한(pure) Container / Presentational Pattern은 아니다.`

전체적인 레이아웃을 포함하며, 상태와 헨들러를 담당하는 Container Component와 상태와 헨들러를 상위 컴포넌트로부터 받고 UI 구조만을 표현하는 Presentatinal 컴포넌트로 구분된다.

### Compound Component Pattern

`Keywords: Context`

하나의 커다란 UI 요소를 역할에 따라 논리적으로 컴포넌트화하여 작게 분할한다.

각 분할된 하위 컴포넌트는 상태와 로직을 공유하며 독립적으로 존재할 수 있지만 원활한 기능 수행을 위해 의존해야 한다.

상태와 로직을 관리하는 상위 컴포넌트를 Context로 두어, 이를 기반으로 하위 컴포넌트들이 상태와 로직을 공유하는 Compound Component Pattern 또한 사용되었다.

### Mobx

`Keywords: mobx-react-lite`

전역 상태관리 툴로 Mobx를 사용했다.

Mobx패키지는 React에 종속되는 패키지가 아니다. 따라서 Mobx 패키지를 통해 상태 변경이 되었다 해도 리엑트에서 리렌더링 작용이 이루어지지 않는다.

Mobx 상태 변경을 React가 추적할 수 있도록 mobx-react-lite 패키지또한 추가해야 한다.

---

## Project Structure

### Model

`Keywords: makeAutoObservable, autobind`

**상태 관리 모델 생성**

데이터 스키마(model)을 클래스로 구현한다. 클래스 생성자는 mobx의 makeAutoObservable 메서드를 호출하여 관찰 대상에 포함될 수 있다.

makeAutoObservable 메서드의 세 번째 인수로 옵션을 줄 수 있다. 클래스 메서드는 JS 특성상 this 바인딩이 호출자로 되므로 항상 클래스 인스턴스를 가리키지 않는다. 따라서 this 바인딩을 위해 autoBind 옵션을 준다.

```tsx

export default class Question implements QuestionData {
  id: number
  title: string
  // ... Type declaration

  constructor (data: QuestionData = {
    id: Date.now()
    title: ''
    // ... Default Value
  }) {
    makeAutoObservable(this, {}, { autoBind: true})
  }

  setTitlle(title: string) {
    this.title = title
  }

  // Setter ...
}
```

### Store

`Keywords: context, custom hook`

**여러 모델을 Store로 통합하여 관리**

각 데이터 스키마를 기반으로 Model(entitly)을 생성하고, 이를 통합하여 관리할 수 있는 store을 선언한다.

현재 프로젝트에서 데이터 모델 구조는 다음과 같다.

```tsx
export type QuestionData = {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
};

export type SectionData = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};
```

하나의 설문(Survey)는 여러 Section을 포함한다.

하나의 Section은 여러 Question을 포함한다.

**Survey를 관리할 수 있는 Store 생성**

각 Model을 하나의 상태로 통합하여 전역 Context로 공유하여 관리될 수 있도록 Mobx Store 클래스를 선언한다

```tsx
import Section from "./models/section";

export default class SurveyStore {
  emailCollected: boolean;
  sections: Section[];
  // Section 수정시 현재 포커스된 Section을 구분하기 위한 필드
  focusedSectionId: number | null;

  // Survey 모델 자체는 클래스 인스턴스 생성시 기존 내부 데이터로부터 초기화하지 않으므로 생성자 매개변수를 입력받지 않는다.
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.sections = [new Section()];
    this.focusedSectionId = this.sections[0].id;
    this.emailCollected = false;
  }

  addSection() {
    const section = new Section();
    this.sections.push(section);
    this.focusedSectionId = section.id;
  }

  addQuestion() {
    // 현재 포커스된 Section에 새로운 Question을 추가한다.
    const focusedSection = this.sections.find(
      (section) => section.id === this.focusedSectionId
    );

    if (focusedSection) {
      // Section 클래스에 구현된 Setter 호출
      focusedSection.addQuestion();
    }
  }

  // Setter ...

  // Survey 데이터 자체 컬럼에 고유값인 id를 포함하지 않는다.
  // 고유 Id는 데이터베이스의 키값으로 저장되며, URL param에서 id값을 받아와 특정 survey를 외부로부터 조회한다.
  fetchSurvey(id: number) {
    callApi<{ sections: SectionData[]; emailCollected: boolean }>(
      `/survey/${id}`
    ).then(({ sections, emailCollected }) => {
      // 가져온 데이터를 관찰 가능하게 만들기 위해 기존 section 데이터를 클래스 인스턴스로 새로 생성한다.
      this.sections = sections.map((section) => new Section(section));
      this.emailCollected = emailCollected ?? false;
    });
  }
}

const surveyStore = new SurveyStore();

const SurveyStoreContext = createContext(surveyStore);

// Context 데이터를 가져오는 것을 Hook으로 생성
export const useSurveyStore = () => useContext(SurveyContext);
export const SurveyStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <SurveyStoreContext.Provider value={surveyStore}>
      {children}
    </SurveyStoreContext.Provider>
  );
};
```

**리엑트 컴포넌트를 mobx 관찰 가능하게 하기**

mobx 상태변경을 리엑트 컴포넌트에서 추적하여 상태변경시 컴포넌트가 리렌더링 되도록 하기 위해선 mobx-react-lite패키지에서 제공하는 observer HOC를 사용해야 한다.

```tsx
import {observer} from 'mobx-react-lite'

// observer 메서드는 새로운 컴포넌트를 반환하므로 HOC라고 할 수 있다.
const SectionListEditor = observer(function () {
  const surveyStore = useSurveyStore()

  // survey 데이터가 변경되면 UI상에서 리렌더링 되어야 하므로 observer HOC로부터 반환된 컴포넌트를 생성한다.
  return (
    <div>
      {surveyStore.sections.map((section, index) => (
        // TSX ...
      ))}
    </div>
  )

})

export default SectionListEditor
```

**상태변경 관찰이 필요 없는 경우**

mobx 상태는 변경되지만 UI 리렌더링이 필요 없는 경우는 observer HOC를 사용할 필요가 없다

```tsx
import { toJS } from "mobx";

// CreatePage는 Store 데이터가 변경되어도 UI 업데이트가 필요하지 않다. 따라서 observer를 사용하게 되면 불필요한 리렌더링이 발생한다.
export default function CreatePage() {
  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    callApi<{ id: number }>("/survey", {
      method: "POST",
      // toJS 메서드는 mobx를 통해 관찰대상인 객체 형태를 기본 JS 형태로 변경하기 위한 API다.
      // surveyStore 데이터는 observer를 사용하지 않더라도 내부적으로 상태가 변경된다. 마치 useRef를 통한 내부 데이터 관리와 같은 방식이라 볼 수 있다.
      body: toJS({ sections: surveyStore.sections }),
    }).then(({ id }) => {
      navigate(`/survey/${id}/edit#send`);
    });
  };
  return (
    <>
      <Button onClick={handleSubmit} className="absolute -top-[30px] right-0">
        보내기
      </Button>
      <SectionListEditor />
    </>
  );
}
```

### 컴포넌트 디렉터리 구조

**common**

- 공통적으로 사용되는 컴포넌트를 'common' 디렉터리에 모아 구분한다.

- 공통적으로 사용된다는 것은 특정 레이아웃에 종속되지 않는다는 의미도 내포한다.

**edit, form, stastistics**

- 각 페이지(edit page, form page, statististics page)에 종속되어 특정 레이아웃을 표현하는 컴포넌트이며, 이를 구분하기 위해 각 디렉터리로 그룹화하여 구분함

- 각 디렉터리 안에 Container Component와 Presentational Component가 섞여있다. 이를 구분하기 위해선 pages 디렉터리부터 확인해야 한다.

- 강의에서는 컴포넌트 이름을 강의자 스타일대로 지어졌기 때문에 사실상 컴포넌트 이름만을 보면 정확히 역할을 추측하기 힘들었다.

**pages**

- component 디렉터리와 구분된다 직접적으로 React Router와 연결되어, URL 경로마다 렌더링되는 페이지 UI를 결정하기 위해서다.

- 구조적으로 보아 Page 디렉터리에 포함된 컴포넌트는 한 경로의 최상위 컴포넌트이기 때문에 Container Component라고 간주할 수 있다.

---

### UI 레이아웃 구조

`BrowserRouter > MainLayout > ContextProvider > Routes > Route > pages(component)`

**Main Layout**

프로젝트 전체에서 공통적으로 사용되는 MainLayout 컴포넌트를 구현한다.

MainLayout 컴포넌트는 사실상 최상위 UI 컴포넌트이며 Wrapper Component로 사용한다

```tsx
// tsx에서 children을 받는 Wrapper Component를 선언하기 위해 PropsWithChildren 타입을 사용한다.
import type { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full min-h-full flex justify-center bg-bg overflow-scroll py-[60px]">
      <main className="max-w-[655px] w-full relative">{children}</main>
    </div>
  );
}
```

### Util

**JsonStorage**

테스트용 서버 스토리지를 위해 JsonStorage를 구현함.

JsonStorage는 데이터를 json형식으로 내부 스토리지에 파일로 저장하고 읽어들인다.

```tsx
type Key = string | number;

export default class JsonStorage<Data> {
  // Storage는 스트링 또는 넘버타입의 키값을 가지며 특정 데이터 구조를 가진 데이터를 Value 값으로 가진다.
  #values: Record<Key, Data>;

  constructor(private readonly filename: string) {
    this.load();
  }

  // 타이밍 이슈, 레이스 컨디션을 해결하기 위해 파일 처리를 동기적으로 수행
  load() {
    try {
      const data = fs.readFilySync(this.filename, "utf-8");
      this.#values = JSON.parse(data) ?? {};
    } catch (e) {
      console.error(e);
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.#values));
    } catch (e) {
      console.error(e);
    }
  }

  get(key: Key): Data | undefined {
    return this.#values[key];
  }

  set(key: Key, value: data) {
    this.#values[key] = value;
    this.save();
  }

  getAll() {
    return this.#values;
  }
}
```

---

## 컴포넌트 디자인

### Panel

`Keywords: PropsWithChildren<T>, Cn<T = NonNullable<unknown>> = T & {className?: string}`

```tsx
// components/common/panel.tsx
export default function Panel({ className, children }: PropsWithChildren<Cn>) {
  return (
    <div
      className={cn(
        className,
        "flex flex-col p-[20px] pt-[26px] bg-white rounded-[10px]"
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({ children, className }: PropsWithChildren<Cn>) {
  return <div className={className}>{children}</div>;
}

export function PanelBody({ className, children }: PropsWithChildren<Cn>) {
  return <div className={className}>{children}</div>;
}
export function PanelFooter({ className, children }: PropsWithChildren<Cn>) {
  return (
    <>
      <hr className="border-gray100" />
      <div className={className}>{children}</div>
    </>
  );
}

export function PanelCap({ children }: PropsWithChildren) {
  return (
    <div className="-mb-[10px] relative">
      {children && (
        <div className="inline-block px-[14px] pt-[10px] pb-[6px] bg-main rounded-t-[10px] text-[15px] text-[white]">
          {children}
        </div>
      )}
      <div className="bg-main h-[9px]" />
    </div>
  );
}
```

**겉보기에는 불필요해 보인다**

해당 Panel을 보면 div를 쓸데없이 기능없이 디자인해 묶어서 가독성과 추적성을 해친다고 생각할 수 있다. 컴포넌트 깊이가 깊어지는 것은 `context-switching` 비용을 증가시키기 때문이다.

**왜 Panel이 필요한가?**

중장기적 유지보수성을 보았을 때 커스터마이징된 시멘틱 컴포넌트(sementic Component)가 유리할 수 있다.

- **재사용성**

  - Panel 이라는 단위 레이아웃을 결정하고, 해당 컴포넌트를 여러 UI 부분에 사용한 경우, Panel에 대한 부분의 변경사항 존재시 여러 UI 컴포넌트를 일일히 수정할 필요 없이 Panel 부분만 수정하면 된다.

- **가독성**

  - 협업시, 여러 부분으로 나뉘어진 div 태그를 보는 대신, Panel의 개념을 익힐 경우 HTML 구조를 파악하기 수월하다.

### Button

```tsx
import type { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      className={classNames(
        "py-[14px] px-[28px] text-[16px] font-medium rounded-[10px] border",
        classes[variant],
        className
      )}
      {...props}
    />
  );
}

const classes: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-main border-main text-white",
  secondary: "border-main bg-white text-main",
  tertiary: "border-transparent bg-transparent text-gray700",
};
```

**유연한 공통 커스터마이징 Presentational Component**

- 현재 프로젝트에서 사용되는 버튼의 디자인은 총 세 가지 타입이므로, 이를 구분하기 위해 `variant` 타입을 선언함.

- button의 prop중 variant라는 커스터마이징 prop을 받을 수 있게 하고, prop에 따라 특정 UI 디자인을 적용할 수 있게 `classes` 객체를 선언하여 모듈화함.

  - 해당 classes 모듈화는 일반적으로 함수 또는 파일단위 분리에 따른 모듈화가 아닌, 스타일 결정 로직을 객체로 모아 분리(모듈화)한 것이라 볼 수 있다.

  - 개념적으로 생각해보면 모듈화는 재사용을 위해 특정로직을 분리하는 것인데, 이 경우 classes로 디자인 결정 로직을 구분하는 것은 재사용성을 고려하지 않았으므로 명확한 모듈화라고 할 수 없다. 오히려 역할별로 처리되어야 할 로직을 구분하여 분리한 것이 옳으므로, **관심사 분리(separation of concern)** 에 더욱 가깝다고 볼 수 있다.

### Dropdown

드롭다운 메뉴는 Context 기반의 `Compound Component` 패턴을 사용하여 구현되었다.

```tsx
export default function Dropdown<T>({
  defaultValue,
  options,
  onChange,
  placeholder,
}: PropsWithChildren<DropdownProps<T>>) {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(
    defaultValue !== undefined
      ? options.findIndex((option) => option.value === defaultValue)
      : -1
  );

  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);

  const handleChange = useCallback(
    (index: number) => {
      setSelected(index);
      onChange?.(options[index].value);
      close();
    },
    [close, onChange, options]
  );

  return (
    <DropdownContext.Provider
      value={{
        opened,
        open,
        close,
        options,
        selected,
        onChange: handleChange,
      }}
    >
      <div className="text-left inline-block relative">
        <DropdownButton placeholder={placeholder} />
        <DropdownMenu />
      </div>
    </DropdownContext.Provider>
  );
}
```

**UI 구성요소 분리**

Dropdown 컴포넌트의 UI요소는 각 책임에 따라 하위 컴포넌트로 분리되었다.

**Context 기반의 상태 공유**

각 컴포넌트는 상태를 Context를 기반으로 공유한다. 따라서 props drilling 문제를 해결할 수 있다.

---

## New Skills

### Mobx

mobx 상태관리 라이브러리는 js 기반이지만 mobx-react-lite 패키지와 함께 사용하여 리엑트의 컴포넌트 라이프사이클과 함께 상태가 관리될 수 있음

Redux의 slice 처럼 데이터 스키마(모델)을 정의한 후, 이를 클래스로 선언한다

**왜 생성자 함수로 선언하지 않고 클래스로 선언하는가**

- mobx store를 생성자 함수로 선언하는 경우 TypeScript는 this에 대한 타입 추론이 잘 되지 않는다.

- 또한 new 키워드 사용시에만 this바인딩이 진행되므로, 생성자 함수 자체에 대한 인터페이스가 필요하다.

- this에 직접적으로 타입 선언시, 생성자 함수에 직접적으로 this를 선언하고 타입을 주어야 한다.

```tsx
function SurveyStore(this: SurveyStoreType) {
    this.sections = [new Section()]
    this.focusedSectionId = this.sections[0].id
    this.emailCollected = false

    this.addSection = () => {
        const section = new Section()
        this.sections.push(section)
        this.focusedSectionId = section.id
    }

    // initializing ...
```

**TS의 생성자 함수의 new 키워드 추론**

- 함수가 생성자로 호출되면 암묵적으로 this에 객체가 할당되며 this를 반환한다.

- TS는 암묵적으로 할당된 this의 타입을 정확히 추론하지 못한다. 따라서 명시적으로 파라미터에 this를 할당하며 타입을 정확히 주어야 한다.

- 하지만 생성자 함수에 new 키워드에 대한 타입을 정의하면 아무런 인수를 받지 않는다.

```tsx
interface SurveyStoreConstructor {
  new (): SurveyStoreType;
}
```

- 함수 자체는 this 파라미터가 선언되었지만, 생성자 함수 인터페이스의 new 키워드 선언시 인수는 비어있기 때문에 TS 타입 추론이 꼬인다!

- 따라서 생성자 함수에 as 키워드를 사용해서 타입 강제 단언을 해야 한다. 무적의 unknown 변환 후 다시 타입 단언하기.

```tsx
interface SurveyStoreConstructor {
  new (): SurveyStoreType;
}

// Declare SurveyStore

const store = new (SurveyStore as unknown as SurveyStoreConstructor)();
```

- 물론 팩토리 또는 싱글톤을 사용하는 것도 방법이 될 수 있지만. 클래스형으로 선언하는 것이 가독성이 좋다.

**클래스형 mobx store**

- 클래스로 mobx store를 선언하는 것이 가장 편리하다.

- 클래스 필드에 프로퍼티 타입을 선언할 수 있으며 메서드 타입을 선언하지 않아도 된다.

```tsx
class SurveyStore {
    sections: Section[]
    focusedSectionId: number | null
    emailCollected: boolean
    constructor() {
        this.sections = [new Section()]
        this.focusedSectionId = this.sections[0].id
        this.emailCollected = false

        makeAutoObservable(this)
    }

    addSection() {
        const section = new Section()
        this.sections.push(section)
        this.focusedSectionId = section.id
    }

    // Methods ...
```

- 클래스로 선언하여 mobx의 makeAutoObservable API는 클래스 필드와 메서드를 보며 상태관리에 관한 역할을 안정적으로 파악한다.

---

## Questions

### Dropdown Menu - Too much Component drilling

```tsx
function DropdownMenu() {
  const { close, opened, options, onChange } = useContext(DropdownContext)!;
  const containerRef = useOutsideClick(close);

  return opened ? (
    <div
      ref={containerRef as RefObject<HTMLDivElement>}
      // styles ...
    >
      {options.map((option, index) => (
        <DropdownMenuItem
          key={`${option.value}`}
          label={option.label}
          onSelect={() => onChange(index)}
        />
      ))}
    </div>
  ) : null;
}

function DropdownMenuItem({
  label,
  onSelect,
}: {
  label: ReactNode;
  onSelect: () => void;
}) {
  return (
    <button
      // styles ...
      onClick={onSelect}
    >
      {label}
    </button>
  );
}
```

**DropdownMenuItem?**

- DropdownMenuItem 컴포넌트를 정의함으로써, 메뉴에 대한 레이아웃 변경시, Dropdown -> DropdownMenu -> DropdownMenuItem 경로로 이동하는 context switching 비용이 든다.

- DropdownMenuItem 컴포넌트는 컴포넌트로 분리해야할 만큼의 규모인지는 모르겠다. 시멘틱 의미를 부여하려는 목적을 고려하더라도, 분리되는 규모가 현저히 적기 때문에 분리하지 않는 것이 가독성에 더욱 좋지 않을까? 의문이 든다.
