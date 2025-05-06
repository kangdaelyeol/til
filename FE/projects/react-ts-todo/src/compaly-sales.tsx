import { lazy, Suspense, useState } from 'react';

const LineChart = lazy(() => import('./line-chart'));

export default function CompanySales() {
	const [shown, setShown] = useState(false);
	return (
		<button onClick={() => setShown((prev) => !prev)}>
			show company sales
			{shown && (
				<Suspense fallback={'loading...'}>
					<LineChart data={data} xKey='month' yKeys={['sales']} />
				</Suspense>
			)}
		</button>
	);
}

const data: { month: string; sales: number }[] = [
	{ month: 'jan', sales: 100 },
	{ month: 'fan', sales: 200 },
	{ month: 'man', sales: 300 },
	{ month: 'apan', sales: 400 },
	{ month: 'jun', sales: 500 },
	{ month: 'jul', sales: 600 },
	{ month: 'augn', sales: 700 },
	{ month: 'sep', sales: 800 },
	{ month: 'oct', sales: 900 },
	{ month: 'nov', sales: 1000 },
];
