import { FormProvider, useForm } from 'react-hook-form'
import type Section from '../../models/section'
import SectionTitleView from './section-title-view'
import QuestionView from './question-view'
import Button from '../common/button'
import type { QuestionData } from '../../types/app'

interface Props {
    section: Section
    last: boolean
    onSave: (data: Record<QuestionData['id'], string | string[]>) => void
    onNext: () => void
}

export default function SectionView({ section, last, onSave, onNext }: Props) {
    const methods = useForm()

    const handleSubmitData = (
        data: Record<QuestionData['id'], string | string[]>,
    ) => {
        onSave(data)
        onNext()
    }

    return (
        <FormProvider {...methods}>
            <form
                className="text-gray900 [&>*]:mb-[24px]"
                onSubmit={methods.handleSubmit(handleSubmitData)}
            >
                <SectionTitleView section={section} />
                {section.questions.map((q) => (
                    <QuestionView key={q.id} question={q} />
                ))}
                <Button type="submit">{last ? '제출' : '다음'}</Button>
            </form>
        </FormProvider>
    )
}
