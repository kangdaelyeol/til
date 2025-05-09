import classNames from 'classnames'

interface Props {
    id: string
    checked: boolean
    onChange: (checked: boolean) => void
}
export default function Switch({ id, checked, onChange }: Props) {
    return (
        <>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.currentTarget.checked)}
                className="opacity-0 w-0 peer"
            />
            <label
                htmlFor={id}
                className={classNames(
                    'flex rounded-full items-center h-[15px] w-[27px] bg-gray400 px-[3px]',
                    'before:inline-block before:h-[10px] before:w-[10px] before:content-[] before:rounded-full before:bg-white',
                    'peer-checked:bg-main peer-checked:before:translate-x-[11px]',
                    'transition-colors duration-300 before:transition-transform duartion-300',
                )}
            ></label>
        </>
    )
}
