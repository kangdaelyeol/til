import type { PropsWithChildren } from 'react'
import cn from 'classnames'

export default function Panel({ className, children }: PropsWithChildren<Cn>) {
    return (
        <div
            className={cn(
                className,
                'flex flex-col p-[20px] pt-[26px] bg-white rounded-[10px]',
            )}
        >
            {children}
        </div>
    )
}

export function PanelHeader({ children, className }: PropsWithChildren<Cn>) {
    return <div className={className}>{children}</div>
}

export function PanelBody({ className, children }: PropsWithChildren<Cn>) {
    return <div className={className}>{children}</div>
}
export function PanelFooter({ className, children }: PropsWithChildren<Cn>) {
    return (
        <>
            <hr className="border-gray100" />
            <div className={className}>{children}</div>
        </>
    )
}

export function PanelCap({ children }: PropsWithChildren) {
    return (
        <div className="-mb-[10px] relative">
            <div className="inline-block px-[14px] pt-[10px] pb-[6px] bg-main rounded-t-[10px] text-[15px] text-[white]">
                {children}
            </div>
            <div className="bg-main h-[9px]" />
        </div>
    )
}
