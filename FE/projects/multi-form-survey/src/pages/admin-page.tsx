import { NavLink, Outlet, useParams } from 'react-router'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'

export default function AdminPage() {
    const params = useParams()

    return (
        <div className="flex flex-col">
            <div className="flex justify-center gap-x-[20px]">
                <Tab path={`/survey/${params.surveyId}/edit`}>질문</Tab>
                <Tab path={`/survey/${params.surveyId}/responses`}>응답</Tab>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}

function Tab({ children, path }: PropsWithChildren<{ path: string }>) {
    return (
        <NavLink
            className={({ isActive }) =>
                classNames('border-b-[3px] p-[14px]', {
                    'text-main border-main': isActive,
                    'border-transparent text-gray-500': !isActive,
                })
            }
            to={{
                pathname: path,
            }}
        >
            {children}
        </NavLink>
    )
}
