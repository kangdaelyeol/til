import classNames from 'classnames'

interface Props {
    direction?: 'horizontal' | 'vertical'
}
export default function Divider({
    className,
    direction = 'horizontal',
}: Cn<Props>) {
    if (direction === 'horizontal') {
        return (
            <hr
                className={classNames(
                    'border-t-[1px] border-gray100 w-full',
                    className,
                )}
            />
        )
    }

    return (
        <hr
            className={classNames(
                'border-l-[1px] border-gray100 h-full',
                className,
            )}
        />
    )
}
