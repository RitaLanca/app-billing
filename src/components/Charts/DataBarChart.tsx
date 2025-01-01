import { CartesianGrid, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from 'recharts'
import { chartProps } from '../../types/charts'
import CustomAnnualTooltip from './CustomAnnualTooltip'

const DataBarChart = <T,>({
    dataset,
    xAxisDataKey,
    yAxisDataKey,
    xAxisTickFormatter,
    yAxisTickFormatter
}: chartProps<T>) => {
  return (
    <div className='h-80 w-full'>
        <ResponsiveContainer width="90%" >
            <BarChart data={dataset}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey={xAxisDataKey} tickFormatter={xAxisTickFormatter} />
                <YAxis stroke="#9ca3af" tickFormatter={yAxisTickFormatter} />
                <Tooltip
                    cursor={{ fill:"#1e293b" }} 
                    contentStyle={{
                        backgroundColor:"rgba(31,41,55,0.8)",
                        borderColor: "#4B5563"
                    }}
                    itemStyle={{ color: "#E5E7EB"}}
                    content={<CustomAnnualTooltip/>}
                /> 
                <Legend />
                <Bar 
                    dataKey={yAxisDataKey} 
                    fill='#6d28d9' 
                    barSize={50}
                >
                    {
                        dataset?.map((_, index) => (
                            <Cell key={`cell-${index}`}/>
                        ))
                    }
                </Bar>          
            </BarChart>
        </ResponsiveContainer>
   </div>
  )
}

export default DataBarChart
