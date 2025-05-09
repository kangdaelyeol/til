import { observer } from 'mobx-react-lite'
import QuestionEditor from './question-editor'
import type Section from '../../models/section'
import SectionTitleEditor from './section-title-editor'

interface Props {
    section: Section
    onChangeFocus: (id: number) => void
    capTitle: string
}

const SectionEditor = observer(function ({
    section,
    onChangeFocus,
    capTitle,
}: Props) {
    const handleClickContainer = () => {
        onChangeFocus(section.id)
    }
    return (
        <div className="[&>*]:mb-[24px]" onClick={handleClickContainer}>
            <SectionTitleEditor section={section} capTitle={capTitle} />
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
