import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import callApi from '../utils/api'
import type { Statistics } from '../types/app'
import { useSurveyStore } from '../store'
import SectionListStatistics from '../components/statistics/section-list-statistics'

export default function StatisticsPage() {
    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [count, setCount] = useState(0)
    const surveyStore = useSurveyStore()
    const { surveyId = '' } = useParams<{ surveyId: string }>()
    useEffect(() => {
        const fetchStatistics = async () => {
            const { statistics, count } = await callApi<{
                statistics: Statistics
                count: number
            }>(`/survey/${surveyId}/statistics`)

            setStatistics(statistics)
            setCount(count)
        }

        fetchStatistics()
        surveyStore.fetchSurvey(parseInt(surveyId, 10))
    }, [surveyId, surveyStore])

    return statistics ? (
        <SectionListStatistics
            statistics={statistics}
            count={count}
            sections={surveyStore.sections}
        />
    ) : (
        <div>Loading...</div>
    )
}
