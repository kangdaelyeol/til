import { observer } from 'mobx-react-lite'
import QuestionEditor from './question-editor'
import type Section from '../../models/section'
import SectionTitleEditor from './section-title-editor'

interface Props {
    section: Section
}

const SectionEditor = observer(function ({ section }: Props) {
    return (
        <div className="[&>*]:mb-[24px]">
            <SectionTitleEditor section={section} capTitle="2개중 1섹션" />
            {section.questions.map((question) => (
                <QuestionEditor
                    onCopy={section.copyQuestion}
                    onDelete={section.removeQuestion}
                    key={question.id}
                    question={question}
                />
            ))}
        </div>
    )
})
export default SectionEditor
