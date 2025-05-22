import type { SectionData, Statistics, SurveyResponse } from '../types/app'

export function getStatistics(
    responses: SurveyResponse[],
    sections: SectionData[],
) {
    return responses.reduce((acc, response) => {
        sections.forEach((section) => {
            const sectionResponse = response[section.id]

            section.questions.forEach((q) => {
                if (!acc[section.id]) {
                    acc[section.id] = {}
                }

                if (q.type === 'longText') {
                    const value = sectionResponse[q.id] as string
                    const questionData = (acc[section.id][q.id] ??
                        []) as string[]

                    questionData.push(value)
                    acc[section.id][q.id] = questionData
                } else {
                    const values = sectionResponse[q.id] || []
                    const questionData = (acc[section.id][q.id] ??
                        {}) as Record<string, number>

                    ;(Array.isArray(values) ? values : [values]).forEach(
                        (value) => {
                            questionData[value] = (questionData[value] ?? 0) + 1
                        },
                    )
                    acc[section.id][q.id] = questionData
                }
            })
        })
        return acc
    }, {} as Statistics)
}
