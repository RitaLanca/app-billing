import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../templates/Layout';
import {
    Dashboard,
    InvoiceSim,
    Requirements,
} from '../pages';

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='invoice-simulator' element={<InvoiceSim />}  />
          <Route path='requirements' element={<Requirements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterComponent;
