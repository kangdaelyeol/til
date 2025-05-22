import { Cell, Legend, Pie, PieChart, type PieLabel } from 'recharts'
import type Question from '../../models/question'
import type { QuestionData, SectionData, Statistics } from '../../types/app'
import Panel, { PanelBody, PanelHeader } from '../common/panel'

interface Props {
    question: Question
    statistics: Statistics[SectionData['id']][QuestionData['id']] // 뭐임?
}

export default function QuestionStatistics({ question, statistics }: Props) {
    if (question.type === 'longText') {
        const typedStatistics = statistics as string[]

        return (
            <Panel>
                <PanelHeader>
                    <h6 className="text-[17px] font-medium mb-[18px]">
                        {question.title}
                    </h6>
                    <p className="text-gray800 text-[16px] mb-[21px]">
                        응답 {typedStatistics.length}개
                    </p>
                </PanelHeader>
                <PanelBody className="flex flex-col gap-y-[9px]">
                    {typedStatistics.map((response, index) =>
                        response ? (
                            <p
                                key={index}
                                className="text-[15px] text-black font-medium p-[17px] rounded-[10px] bg-bg"
                            >
                                {response}
                            </p>
                        ) : null,
                    )}
                </PanelBody>
            </Panel>
        )
    } else {
        const typedStatistics = statistics as Record<string, number>
        const entries = Object.entries(typedStatistics)
        const total = entries.reduce((acc, [, count]) => acc + count, 0)
        return (
            <Panel className="text-gray900">
                <PanelHeader>
                    <h6 className="text-[17px] font-medium mb-[18px]">
                        {question.title}
                    </h6>
                    <p className="text-gray800 text-[16px] mb-[21px]">
                        응답 {total}개
                    </p>
                </PanelHeader>
                <PanelBody className="flex flex-col gap-y-[9px] items-center">
                    <PieChart width={410} height={250}>
                        <Pie
                            cx="35%"
                            data={entries}
                            nameKey={0}
                            dataKey={1}
                            label={renderCustomizedLable}
                            labelLine={false}
                        >
                            {entries.map(([key], index) => (
                                <Cell
                                    key={key}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend
                            align="right"
                            layout="vertical"
                            verticalAlign="middle"
                            iconType="circle"
                            iconSize={16}
                        />
                    </PieChart>
                </PanelBody>
            </Panel>
        )
    }
}

const COLORS = ['#0D00A4', '#0D00A4CC', '#0D00A499', '#0D00A466', '#0D00A433']

const RADIAN = Math.PI / 180

const renderCustomizedLable: PieLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    innerRadius,
    percent,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            className="text-[14px]"
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}
