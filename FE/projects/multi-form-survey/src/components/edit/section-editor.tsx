import { observer } from 'mobx-react-lite'
import QuestionEditor from './question-editor'
import type Section from '../../models/section'

interface Props {
    section: Section
}

const SectionEditor = observer(function ({ section }: Props) {
    return (
        <div>
            {section.questions.map((question) => (
                <QuestionEditor key={question.id} question={question} />
            ))}
        </div>
    )
})
export default SectionEditor
