import Panel, { PanelHeader, PanelBody, PanelFooter } from '../common/panel'
import CloseIcon from '../../assets/icons/close.svg?react'
import Dropdown from '../common/dropdown'
import Button from '../common/button'
import callApi from '../../utils/api'

interface Props {
    surveyId: number
    emailCollected: boolean
    onClose: () => void
}

export default function SendModalContent({
    surveyId,
    emailCollected,
    onClose,
}: Props) {
    const path = `${location.host}/survey/${surveyId}`

    const handleCopy = () => {
        navigator.clipboard.writeText(path)
        onClose()
    }

    const handleChangeEmailCollected = (value: boolean) => {
        callApi(`/survey/${surveyId}`, {
            method: 'PATCH',
            body: {
                emailCollected: value,
            },
        })
    }

    return (
        <Panel className="text-gray900">
            <PanelHeader className="flex justify-between items-center py-[19px]">
                <h4 className="text-[20px] font-semibold">설문지 보내기</h4>
                <button onClick={onClose}>
                    <CloseIcon />
                </button>
            </PanelHeader>
            <PanelBody>
                <div className="-mx-[20px] px-[20px] bg-bg flex justify-between items-center py-[13px] mb-[38px]">
                    <span className="text-[16px] font-medium">이메일 수집</span>
                    <Dropdown<boolean>
                        onChange={handleChangeEmailCollected}
                        defaultValue={emailCollected}
                        options={[
                            { label: '수집하지 않음', value: false },
                            { label: '수집함', value: true },
                        ]}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-[17px] font-semibold">링크</span>
                    <p className="pt-[21px] pb-[16px] text-gray800 font-medium text-[16px]">
                        {path}
                    </p>
                </div>
            </PanelBody>
            <PanelFooter className="flex justify-end mt-[26px]">
                <Button variant="tertiary" onClick={onClose}>
                    취소
                </Button>
                <Button variant="secondary" onClick={handleCopy}>
                    복사
                </Button>
            </PanelFooter>
        </Panel>
    )
}
