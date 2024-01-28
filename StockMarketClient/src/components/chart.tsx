import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PreviousClosure {
    open: number;
    low: number;
    high: number;
    close: number;
}

interface ChartProps {
    previousClosure: PreviousClosure;
}

export function Chart({ previousClosure }: ChartProps) {
    const chartData = [
        {
            name: 'Начало торгов',
            value: previousClosure?.open,
            time: '09:30'
        },
        {
            name: 'Наименьшая цена',
            value: previousClosure?.low,
            time: '11:00'
        },
        {
            name: 'Наивысшая цена',
            value: previousClosure?.high,
            time: '13:30'
        },
        {
            name: 'Конец торгов',
            value: previousClosure?.close,
            time: '16:00'
        }
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stopColor={previousClosure.open > previousClosure.low ? 'red' : 'green'} />
                        <stop offset="33.5%" stopColor={previousClosure.open > previousClosure.low ? 'red' : 'green'} />
                        <stop offset="33.5%" stopColor={previousClosure.low > previousClosure.high ? 'red' : 'green'} />
                        <stop offset="66.5%" stopColor={previousClosure.low > previousClosure.high ? 'red' : 'green'} />
                        <stop offset="66.5%" stopColor={previousClosure.high > previousClosure.close ? 'red' : 'green'} />
                        <stop offset="100%" stopColor={previousClosure.high > previousClosure.close ? 'red' : 'green'} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[previousClosure.low - 1, previousClosure.high + 1]} />
                <Tooltip labelStyle={{ color: 'var(--primary-foreground)' }} contentStyle={{ color: 'var(--primary-foreground)', background: 'var(--primary)' }} />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#gradient)"
                    strokeWidth={2}
                    activeDot={{ r: 8, fill: 'green' }}
                    dot={{ stroke: 'green', strokeWidth: 2 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}