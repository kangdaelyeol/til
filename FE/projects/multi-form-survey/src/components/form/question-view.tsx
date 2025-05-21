import { useFormContext } from 'react-hook-form'
import type Question from '../../models/question'
import Panel, { PanelBody, PanelHeader } from '../common/panel'
import QuestionForm from './question-form'
import classNames from 'classnames'

interface Props {
    question: Question
}

export default function QuestionView({ question }: Props) {
    const {
        formState: { errors },
    } = useFormContext()

    return (
        <Panel
            className={classNames({
                'border-red-500 border': errors[question.id],
            })}
        >
            <PanelHeader className="flex mb-[31px]">
                <h6 className="text-[16px] text-gray900 font-medium">
                    {question.title}
                </h6>
            </PanelHeader>
            <PanelBody>
                <QuestionForm question={question} />
                {errors[question.id] && (
                    <p className="text-red-500 text-[14px] mt-[10px]">
                        {errors[question.id]?.message?.toString() ||
                            '필수 항목 입니다'}
                    </p>
                )}
            </PanelBody>
        </Panel>
    )
}
