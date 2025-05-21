import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useSurveyStore } from '../store'
import SectionListView from '../components/form/section-list-view'

export default function FormPage() {
    const surveyStore = useSurveyStore()
    const { surveyId = '' } = useParams<{ surveyId: string }>()

    useEffect(() => {
        const id = parseInt(surveyId, 10)
        if (id) {
            surveyStore.fetchSurvey(id)
        }
    }, [surveyId, surveyStore])

    return <SectionListView />
}
