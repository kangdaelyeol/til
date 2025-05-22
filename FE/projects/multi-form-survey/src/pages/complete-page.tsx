import { useParams } from 'react-router'
import { Link, useSearchParams } from 'react-router-dom'
import Panel, {
    PanelBody,
    PanelCap,
    PanelHeader,
} from '../components/common/panel'

export default function CompletePage() {
    const [searchParams] = useSearchParams()
    const { surveyId } = useParams<{ surveyId: string }>()

    return (
        <div>
            <PanelCap />
            <Panel className="text-gray900">
                <PanelHeader className="text-[24px] mb-[12px] font-semibold">
                    <h5>{searchParams.get('title') ?? '설문 완료'}</h5>
                </PanelHeader>
                <PanelBody>
                    <p className="mb-[17px]">응답이 기록되었습니다.</p>
                    <Link
                        className="border-b-blue-500 text-blue-500"
                        to={`/survey/${surveyId}`}
                    >
                        다른 응답 제출
                    </Link>
                </PanelBody>
            </Panel>
        </div>
    )
}
