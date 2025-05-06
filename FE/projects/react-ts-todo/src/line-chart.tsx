import { LineChart as RechartsLineChart, XAxis, Line } from 'recharts';

interface LineChartProps<Data> {
	data: Data[];
	xKey: Extract<keyof Data, string>;
	yKeys: Extract<keyof Data, string>[];
	width?: number;
	height?: number;
}

export default function LineChart<Data extends Record<string, any>>({
	data,
	xKey,
	yKeys,
	width = 800,
	height = 400,
}: LineChartProps<Data>) {
	return (
		<RechartsLineChart data={data} width={width} height={height}>
			<XAxis dataKey={xKey} />
			{yKeys.map((ykey, index) => (
				<Line
					type='monotone'
					dataKey={ykey}
					key={ykey}
					stroke={COLORS[index % COLORS.length]}
				/>
			))}
		</RechartsLineChart>
	);
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
