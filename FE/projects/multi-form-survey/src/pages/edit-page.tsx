import { toJS } from 'mobx'
import SectionListEditor from '../components/edit/section-list-editor'
import { useSurveyStore } from '../store'
import callApi from '../utils/api'
import { useLocation, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Button from '../components/common/button'
import Modal from '../components/common/modal'
import SendModalContent from '../components/edit/send-modal-content'

export default function EditPage() {
    const surveyStore = useSurveyStore()
    const { surveyId = '' } = useParams<{ surveyId: string }>()
    const { hash } = useLocation()
    const [opened, setOpened] = useState<boolean>(hash === '#send')

    useEffect(() => {
        const id = parseInt(surveyId, 10)
        if (id) {
            surveyStore.fetchSurvey(id)
        }
    }, [surveyId, surveyStore])

    const handleSubmit = () => {
        callApi(`/survey/${surveyId}`, {
            method: 'PUT',
            body: toJS({ sections: surveyStore.sections }),
        }).then(() => {
            setOpened(true)
        })
    }
    return (
        <>
            <Button onClick={handleSubmit} className="absolute top-0 right-0">
                보내기
            </Button>
            <SectionListEditor />
            <Modal opened={opened}>
                <SendModalContent
                    emailCollected={surveyStore.emailCollected}
                    surveyId={parseInt(surveyId, 10)}
                    onClose={() => setOpened(false)}
                />
            </Modal>
        </>
    )
}
