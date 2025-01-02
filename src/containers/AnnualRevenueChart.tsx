import DataBarChart from '../components/Charts/DataBarChart';
import { datasetProps, annualRevenueProps } from '../types/charts';

interface annualRevenuePageProps {
  data: datasetProps<annualRevenueProps>
}

const AnnualRevenueChart = ({
  data,
}: annualRevenuePageProps) => {

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-lg font-medium md-4 text-gray-100'>Annual Revenue</h2>
      <DataBarChart 
        dataset={data} 
        xAxisDataKey="year" 
        yAxisDataKey='total'
        yAxisTickFormatter={(value) => `${value}€`}
        />
    </div>
  )
}

export default AnnualRevenueChart;
