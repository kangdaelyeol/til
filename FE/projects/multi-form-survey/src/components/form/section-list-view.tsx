import { useRef, useState } from 'react'
import { useSurveyStore } from '../../store'
import SectionView from './section-view'
import { observer } from 'mobx-react-lite'
import type { QuestionData, SectionData } from '../../types/app'
import callApi from '../../utils/api'
import { useNavigate, useParams } from 'react-router'

const SectionListView = observer(function () {
    const surveyStore = useSurveyStore()
    const [currentSection, setCurrentSection] = useState(0)
    const data = useRef<
        Record<SectionData['id'], Record<QuestionData['id'], string | string[]>>
    >({})
    const last = currentSection === surveyStore.sections.length - 1
    const { surveyId } = useParams<{ surveyId: string }>()
    const navigate = useNavigate()

    const handleNext = async () => {
        if (last) {
            await callApi(`/survey/${surveyId}/responses`, {
                method: 'POST',
                body: data.current,
            })
            navigate(
                `/survey/${surveyId}/complete?title=${surveyStore.sections[0].title}`,
            )
            
            return
        }
        setCurrentSection(currentSection + 1)
    }

    const saveData = (
        sectionData: Record<QuestionData['id'], string | string[]>,
    ) => {
        data.current[surveyStore.sections[currentSection].id] = sectionData
    }

    return (
        <SectionView
            section={surveyStore.sections[currentSection]}
            last={last}
            onSave={saveData}
            onNext={handleNext}
        />
    )
})
export default SectionListView
