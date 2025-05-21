import { type ReactNode } from 'react'
import type { QuestionType } from '../../types/app'
import Input from '../common/input'
import RadioIcon from '../../assets/icons/radio_button_unchecked.svg?react'
import CheckboxIcon from '../../assets/icons/check_box_outline_blank.svg?react'
import type Question from '../../models/question'
import { observer } from 'mobx-react-lite'

interface OptionEditorProps {
    question: Question
}
const OptionEditor = observer(function ({
    question: { options = [], type, setOptions, setOption },
}: OptionEditorProps) {
    return (
        <div>
            {options.map((option, index) => (
                <div key={index} className="flex items-center">
                    {icons[type]}
                    <Input
                        value={option}
                        onChange={(e) => {
                            setOption(index, e.currentTarget.value)
                        }}
                    />
                </div>
            ))}
            <div className="flex items-center mt-[28px]">
                {icons[type]}
                <button
                    className="text-gray500 text-[16px]"
                    onClick={() => {
                        setOptions([...options, `옵션 ${options.length + 1}`])
                    }}
                >
                    옵션추가
                </button>
            </div>
        </div>
    )
})

const icons: Partial<Record<QuestionType, ReactNode>> = {
    multipleChoice: <RadioIcon className="mr-[14px]" />,
    checkbox: <CheckboxIcon className="mr-[14px]" />,
    dropdown: <RadioIcon className="mr-[14px]" />,
}
export default OptionEditor
