import { toJS } from 'mobx'
import SectionEditorList from '../components/edit/section-editor-list'
import { useSurveyStore } from '../store'
import callApi from '../utils/api'

export default function CreatePage() {
    const surveyStore = useSurveyStore()

    const handleSubmit = () => {
        callApi('/survey', {
            method: 'POST',
            body: toJS({ sections: surveyStore.sections }),
        })
    }
    return (
        <>
            <div>
                <button onClick={handleSubmit}>보내기</button>
            </div>
            <SectionEditorList />
        </>
    )
}
