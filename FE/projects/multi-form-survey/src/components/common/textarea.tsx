import type { HTMLAttributes, RefObject, TextareaHTMLAttributes } from 'react'
import { useWatch, type RefCallBack } from 'react-hook-form'
import cn from 'classnames'

export default function Textarea({
    className,
    ref,
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: RefObject<HTMLTextAreaElement | null> | RefCallBack
}) {
    return (
        <textarea
            ref={ref}
            className={cn(
                'border-b-[1px] border-gray200 pb-[16px] outline-none resize-none',
                'focus:border-b-gray600 focus:bg-bg2 focus:rounded-t-[6px]',
                className,
            )}
            {...props}
        />
    )
}

export function AutoGrow({
    className,
    value,
    forTextarea = '',
    ...props
}: HTMLAttributes<HTMLDivElement> & { value?: string; forTextarea?: string }) {
    const valueFromWatch = useWatch({ name: forTextarea })

    return (
        <div
            className={cn(
                'grid',
                'after:content-[attr(data-replicated-value)] after:whitespace-pre-wrap after:invisible pb-[16px] after:auto-grow',
                '[&>textarea]:auto-grow',
                className,
            )}
            {...props}
            data-replicated-value={value ?? valueFromWatch}
        />
    )
}
