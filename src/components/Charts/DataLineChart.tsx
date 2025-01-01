import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { chartProps } from '../../types/charts'
import CustomMonthlyTooltip from './CustomMonthlyTooltip';

const DataLineChart = <T,>({
    dataset,
    xAxisDataKey,
    yAxisDataKey,
    xAxisTickFormatter,
    yAxisTickFormatter,
}: chartProps<T>) => {
  return (
    <div className='h-80'>
        <ResponsiveContainer width={'100%'}>
            <LineChart data={dataset}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis 
                dataKey={xAxisDataKey}
                tickFormatter={xAxisTickFormatter} 
                interval='preserveStartEnd'
                minTickGap={-5}
                tickMargin={10}
                tick={{fontSize:12}}
                />
                <YAxis 
                stroke="#9ca3af" 
                tickFormatter={yAxisTickFormatter} 
                tick={{fontSize:12}}
                    />
                <Tooltip
                    contentStyle={{
                        backgroundColor:"rgba(31,41,55,0.8)",
                        borderColor: "#4B5563"
                    }}
                    itemStyle={{ color: "#E5E7EB"}}
                    content={<CustomMonthlyTooltip/>}
                /> 
                <Line
                    type='monotone'
                    dataKey={yAxisDataKey}
                    stroke='#6366F1'
                    strokeWidth={3}
                    dot={{fill:"#6366F1", strokeWidth: 2, r: 5}}
                    activeDot={{ r:6, strokeWidth: 2}}   
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default DataLineChart
