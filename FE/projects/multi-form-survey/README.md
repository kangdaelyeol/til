# Multi Survey Form Project

## Table of Contents

## Project Structure

### Container / Presentational pattern

해당 프로젝트는 Container / Presentational Pattern 기반의 컴포넌트 아키텍처를 사용했다. `하지만 정확한(pure) Container / Presentational Pattern은 아니다.`

전체적인 레이아웃을 포함하며, 상태와 헨들러를 담당하는 Container Component와 상태와 헨들러를 상위 컴포넌트로부터 받고 UI 구조만을 표현하는 Presentatinal 컴포넌트로 구분된다.

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

#### MainLayout

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

### 컴포넌트 구조 디자인

#### Panel

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

#### Button

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

#### Dropdown

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

## Questions

### Too much Component drilling

#### Dropdown Menu

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
