import ChartCard from '@/components/ChartCard';
import DataLineChart from '@/components/Charts/DataLineChart';
import SelectField from '@/components/forms/SelectField'
import { annualRevenueProps, datasetProps, monthlyRevenueProps } from '@/types/charts';
import { useState } from 'react'

interface RevenueChartProps {
    monthlyData: datasetProps<monthlyRevenueProps>;
    annualData: datasetProps<annualRevenueProps>;
  }
  

const RevenueChart = ({ monthlyData, annualData }: RevenueChartProps) => {
    const [selectedOption, setSelectedOption] = useState('month')
    console.log(selectedOption);
    const options = [
        {
            id:'month',
            label:'month',
        }, 
        {
            id:'year',
            label:'year',
        }
    ]

  return (
    <ChartCard>
            <div className='flex flex-col sm:flex-row justify-between items-center my-4 gap-2'>
                <h2 className='font-medium text-lg'>Revenue overview</h2>
                <div className='w-64'>
                    <SelectField 
                    options={options} 
                    value={selectedOption} 
                    onValueChange={(v) => setSelectedOption(v)}
                    />
                </div>
        </div>
        {selectedOption === "month" ? (     
            <DataLineChart
            dataset={monthlyData}
            xAxisDataKey="date"
            yAxisDataKey="value"
            xAxisTickFormatter={(label) =>
                new Date(label).toLocaleString("default", { month: "short" })
            }
            yAxisTickFormatter={(value) => `${value}€`}
            />
            ) : (
                <DataLineChart
                dataset={annualData}
                xAxisDataKey="year"
                yAxisDataKey="total"
                xAxisTickFormatter={(label) => label.toString()}
                yAxisTickFormatter={(value) => `${value}€`}
                />
            )}
    </ChartCard>
  )
}

export default RevenueChart
