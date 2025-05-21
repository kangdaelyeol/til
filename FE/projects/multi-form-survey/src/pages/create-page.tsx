import { toJS } from 'mobx'
import SectionListEditor from '../components/edit/section-list-editor'
import { useSurveyStore } from '../store'
import callApi from '../utils/api'
import Button from '../components/common/button'
import { useNavigate } from 'react-router'

export default function CreatePage() {
    const surveyStore = useSurveyStore()
    const navigate = useNavigate()

    const handleSubmit = () => {
        callApi<{ id: number }>('/survey', {
            method: 'POST',
            body: toJS({ sections: surveyStore.sections }),
        }).then(({ id }) => {
            navigate(`/survey/${id}/edit#send`)
        })
    }
    return (
        <>
            <Button
                onClick={handleSubmit}
                className="absolute -top-[30px] right-0"
            >
                보내기
            </Button>
            <SectionListEditor />
        </>
    )
}
