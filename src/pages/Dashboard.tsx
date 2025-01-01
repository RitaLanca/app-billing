import KpiCard from '../components/KpiCard';
import { UsersIcon, ArrowTrendingUpIcon, BanknotesIcon, DocumentTextIcon} from '@heroicons/react/24/solid';
import { getActiveClientsByMonth, getAnnualClientGrowth } from '../api/activeClients';
import { getAnnualInvoices, getAnnualRevenue, getMonthlyRevenue } from '../api/billing';
import useRequest from '../hooks/useRequest';
import AnnualRevenueChart from '../containers/AnnualRevenueChart';
import { annualRevenueProps, datasetProps } from '../types/charts';
import MonthlyRevenueChart from '../containers/MonthlyRevenueChart';
import Page from '../templates/Page';
import RevenueChart from '@/containers/RevenueChart';



const Dashboard = () => {
  const {data: activeClients} = useRequest(getActiveClientsByMonth)
  const {data: annualGrowth} = useRequest(getAnnualClientGrowth);
  const {data: annualInvoices} = useRequest(getAnnualInvoices);
  const {data: annualRevenue} = useRequest(getAnnualRevenue);
  const {data: monthlyRevenue} = useRequest(getMonthlyRevenue);

 const totalAnnualRevenue = annualRevenue?.map(d => ({
    year: d.year,
    total: d.total,
 })) as datasetProps<annualRevenueProps>;


 return (
    <Page title='Dashboard'>
           {/* STATS */}
            <div className='grid gap-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-8'>
                <KpiCard 
                    name='Total Revenue'
                    icon={BanknotesIcon}
                    value={`${annualInvoices?.totalRevenue}€`}
                />
                <KpiCard 
                        name='Total Invoices'
                        icon={DocumentTextIcon}
                        value={annualInvoices?.totalInvoicesIssued}
                    />
                <KpiCard 
                    name='Current active clients'
                    icon={UsersIcon}
                    value={activeClients}
                />
                <KpiCard 
                    name='Annual Client Growth'
                    icon={ArrowTrendingUpIcon}
                    value={`${annualGrowth}%`}
                />
            </div>
            {/* CHARTS */}
            <div>
                <RevenueChart annualData={totalAnnualRevenue} monthlyData={monthlyRevenue}/>
            </div>
    </Page>
 );
}

export default Dashboard; 