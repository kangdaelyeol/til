import type { PropsWithChildren } from 'react'

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="w-full min-h-full flex justify-center bg-bg overflow-scroll py-[60px]">
            <main className="max-w-[655px] w-full relative">{children}</main>
        </div>
    )
}
