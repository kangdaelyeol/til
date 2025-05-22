import type Section from '../../models/section'
import type { Statistics } from '../../types/app'
import SectionStatistics from './section-statistics'

interface Props {
    count: number
    sections: Section[]
    statistics: Statistics
}

export default function SectionListStatistics({ sections, statistics }: Props) {
    return sections.map((section, index) => (
        <SectionStatistics
            key={section.id}
            section={section}
            statistics={statistics[section.id]}
            capTitle={`${sections.length}개 중 ${index + 1}섹션`}
        />
    ))
}
