import {
    createContext,
    useCallback,
    useContext,
    useState,
    type PropsWithChildren,
    type ReactNode,
    type RefObject,
} from 'react'

import ArrowIcon from '../../assets/icons/arrow_drop_down.svg?react'
import useOutsideClick from '../../hooks/common/use-outside-click'

interface DropdownContextType<T = unknown> {
    opened: boolean
    open: () => void
    close: () => void
    options: DropdownOption<T>[]
    selected: number
    onChange: (index: number) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

type DropdownOption<T> = {
    label: ReactNode
    value: T
}

interface DropdownProps<T> {
    defaultValue?: T
    placeholder?: string
    options: DropdownOption<T>[]
    onChange?: (value: T) => void
}

export default function Dropdown<T>({
    defaultValue,
    options,
    onChange,
    placeholder,
}: PropsWithChildren<DropdownProps<T>>) {
    const [opened, setOpened] = useState(false)
    const [selected, setSelected] = useState(
        defaultValue !== undefined
            ? options.findIndex((option) => option.value === defaultValue)
            : -1,
    )

    const open = useCallback(() => setOpened(true), [])
    const close = useCallback(() => setOpened(false), [])

    const handleChange = useCallback(
        (index: number) => {
            setSelected(index)
            onChange?.(options[index].value)
            close()
        },
        [close, onChange, options],
    )

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
    )
}

export function DropdownButton({ placeholder }: { placeholder?: string }) {
    const { open, options, selected } = useContext(DropdownContext)!

    return (
        <button
            type="button"
            className="border border-gray300 rounded-[10px] min-w-[197px] p-[14px] pr-[36px] relative text-left"
            onClick={open}
        >
            {selected >= 0 ? options[selected].label : placeholder ?? 'select'}
            <span className="absolute right-[12px] top-1/2 -translate-y-1/2">
                <ArrowIcon />
            </span>
        </button>
    )
}

function DropdownMenu() {
    const { close, opened, options, onChange } = useContext(DropdownContext)!
    const containerRef = useOutsideClick(close)

    return opened ? (
        <div
            ref={containerRef as RefObject<HTMLDivElement>}
            className="absolute left-0 top-[62px] border border-gray300 rounded-[10px] flex flex-col min-w-[197px] bg-white z-10"
        >
            {options.map((option, index) => (
                <DropdownMenuItem
                    key={`${option.value}`}
                    label={option.label}
                    onSelect={() => onChange(index)}
                />
            ))}
        </div>
    ) : null
}

function DropdownMenuItem({
    label,
    onSelect,
}: {
    label: ReactNode
    onSelect: () => void
}) {
    return (
        <button
            className="text-left p-[14px] border-b-1 border-gray300 last:border-b-0"
            onClick={onSelect}
        >
            {label}
        </button>
    )
}
