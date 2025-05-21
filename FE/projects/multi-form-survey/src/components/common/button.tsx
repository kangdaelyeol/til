import type { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary'
}

export default function Button({
    variant = 'primary',
    className,
    ...props
}: Props) {
    return (
        <button
            className={classNames(
                'py-[14px] px-[28px] text-[16px] font-medium rounded-[10px] border',
                classes[variant],
                className,
            )}
            {...props}
        />
    )
}

const classes: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-main border-main text-white',
    secondary: 'border-main bg-white text-main',
    tertiary: 'border-transparent bg-transparent text-gray700',
}
