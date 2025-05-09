import type { QuestionType } from '../../types/app'
import ShortTextIcon from '../../assets/icons/check_indeterminate_small.svg?react'
import LongTextIcon from '../../assets/icons/subject.svg?react'
import MultipleChoiceIcon from '../../assets/icons/checklist.svg?react'
import CheckBoxIcon from '../../assets/icons/check_circle.svg?react'
import DropdownIcon from '../../assets/icons/arrow_circle_down.svg?react'
import DateIcon from '../../assets/icons/calendar_today.svg?react'
import TimeIcon from '../../assets/icons/schedule.svg?react'
import Dropdown from '../common/dropdown'
import { observer } from 'mobx-react-lite'

interface Props {
    type: QuestionType
    onChange: (type: QuestionType) => void
}
const QuestionTypeEditor = observer(function ({ type, onChange }: Props) {
    return (
        <Dropdown<QuestionType>
            defaultValue={type}
            onChange={(type) => onChange(type)}
            options={[
                {
                    label: (
                        <div>
                            <ShortTextIcon className="inline-block mr-[10px]" />
                            <span>단답형</span>
                        </div>
                    ),
                    value: 'shortText',
                },
                {
                    label: (
                        <div>
                            <LongTextIcon className="inline-block mr-[10px]" />
                            <span>장문형</span>
                        </div>
                    ),
                    value: 'longText',
                },
                {
                    label: (
                        <div>
                            <MultipleChoiceIcon className="inline-block mr-[10px]" />
                            <span>객관식</span>
                        </div>
                    ),
                    value: 'multipleChoice',
                },
                {
                    label: (
                        <div>
                            <CheckBoxIcon className="inline-block mr-[10px]" />
                            <span>체크박스</span>
                        </div>
                    ),
                    value: 'checkbox',
                },
                {
                    label: (
                        <div>
                            <DropdownIcon className="inline-block mr-[10px]" />
                            <span>드롭다운</span>
                        </div>
                    ),
                    value: 'dropdown',
                },
                {
                    label: (
                        <div>
                            <DateIcon className="inline-block mr-[10px]" />
                            <span>날짜</span>
                        </div>
                    ),
                    value: 'date',
                },
                {
                    label: (
                        <div>
                            <TimeIcon className="inline-block mr-[10px]" />
                            <span>시간</span>
                        </div>
                    ),
                    value: 'time',
                },
            ]}
        />
    )
})

export default QuestionTypeEditor
