import { toJS } from 'mobx'
import SectionEditorList from '../components/edit/section-editor-list'
import { useSurveyStore } from '../store'
import callApi from '../utils/api'
import { useParams } from 'react-router'
import { useEffect } from 'react'

export default function EditPage() {
    const surveyStore = useSurveyStore()
    const { surveyId } = useParams<{ surveyId: string }>()

    useEffect(() => {
        const id = parseInt(surveyId ?? '', 10)
        if (id) {
            surveyStore.fetchSurvey(id)
        }
    }, [surveyId, surveyStore])

    const handleSubmit = () => {
        callApi(`/survey/${surveyId}`, {
            method: 'PUT',
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
