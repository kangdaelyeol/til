import type { InputHTMLAttributes, RefObject } from 'react'
import CheckedIcon from '../../assets/icons/check_box.svg?react'
import UnCheckedIcon from '../../assets/icons/check_box_outline_blank.svg?react'
import type { RefCallBack } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function Checkbox({
    label,
    ref,
    ...props
}: Props & { ref: RefObject<HTMLInputElement> | null | RefCallBack }) {
    return (
        <label className="relative h-[26px] flex items-center">
            <input
                ref={ref}
                className="opacity-0 w-[26px] h-[26px] peer"
                type="checkbox"
                {...props}
            />
            <CheckedIcon className="absolute top-0 left-0 opacity-0 peer-checked:opacity-100 transition-opacity" />
            <UnCheckedIcon className="absolute top-0 left-0 opacity-100 peer-checked:opacity-0 transition-opacity" />
            <span className="pl-[14px]">{label}</span>
        </label>
    )
}
