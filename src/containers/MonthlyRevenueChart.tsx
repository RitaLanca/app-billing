import DataLineChart from '../components/Charts/DataLineChart'
import { datasetProps, monthlyRevenueProps } from '../types/charts'

interface monthlyRevenuePageProps {
  data: datasetProps<monthlyRevenueProps>
}

const MonthlyRevenueChart = ({
  data,
}: monthlyRevenuePageProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-lg font-medium md-4 text-gray-100'>Monthly Revenue</h2>
      <DataLineChart 
        dataset={data} 
        xAxisDataKey="date" 
        yAxisDataKey='value'
        xAxisTickFormatter={(label) => new Date(label).toLocaleString('default',{ month:'short'})}
        yAxisTickFormatter={(value) => `${value}€`}
        />
    </div>
  )
}

export default MonthlyRevenueChart
