import type Section from '../../models/section'
import type { SectionData, Statistics } from '../../types/app'
import QuestionStatistics from './question-statistics'
import SectionTitleView from './section-title-view'

interface Props {
    capTitle: string
    section: Section
    statistics: Statistics[SectionData['id']]
}
export default function SectionStatistics({
    capTitle,
    section,
    statistics,
}: Props) {
    return (
        <div className="[&>*]:mb-[24px]">
            <SectionTitleView section={section} capTitle={capTitle} />
            {section.questions.map((q) => (
                <QuestionStatistics
                    key={q.id}
                    question={q}
                    statistics={statistics[q.id]}
                />
            ))}
        </div>
    )
}
