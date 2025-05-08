import type { InputHTMLAttributes, RefObject } from 'react'
import cn from 'classnames'

export default function Input({
    className,
    ref,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    ref?: RefObject<HTMLInputElement | null>
}) {
    return (
        <input
            ref={ref}
            className={cn(
                'border-b-[1px] border-gray200 py-[17px] pl-[9px] pr-[21px]',
                'focus:border-b-gray600 focus:bg-bg2 focus:rounded-t-[6px]',
                className,
            )}
            {...props}
        />
    )
}
