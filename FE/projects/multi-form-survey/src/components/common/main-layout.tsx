import type { PropsWithChildren } from 'react'

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="w-full h-full flex justify-center bg-bg">
            <main className="max-w-[655px] w-full">{children}</main>
        </div>
    )
}
