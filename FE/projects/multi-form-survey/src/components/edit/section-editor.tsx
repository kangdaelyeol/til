import { observer } from 'mobx-react-lite'
import { useSurveyStore } from '../../store'
import QuestionEditor from './question-editor'

const SectionEditor = observer(function () {
    const surveyStore = useSurveyStore()

    return (
        <div className="relative">
            <div className="absolute top-0 right-[-50px]">
                <button onClick={() => surveyStore.addQuestion()}>+</button>
            </div>
            <div>
                {surveyStore.questions.map((question) => (
                    <QuestionEditor key={question.id} question={question} />
                ))}
            </div>
        </div>
    )
})
export default SectionEditor
