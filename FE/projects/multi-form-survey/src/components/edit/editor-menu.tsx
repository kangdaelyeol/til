import PlusIcon from '../../assets/icons/add_circle.svg?react'
import SectionPlusIcon from '../../assets/icons/view_comfy.svg?react'
import { useSurveyStore } from '../../store'
import classNames from 'classnames'

export default function EditorMenu({ className }: Cn) {
    const surveyStore = useSurveyStore()

    return (
        <div
            className={classNames(
                'bg-white rounded-[10px] px-[13px] py-[26px] flex flex-col gap-y-[26px] shadow-sm',
                className,
            )}
        >
            <button onClick={() => surveyStore.addQuestion()}>
                <PlusIcon />
            </button>
            <button onClick={() => surveyStore.addSection()}>
                <SectionPlusIcon />
            </button>
        </div>
    )
}
