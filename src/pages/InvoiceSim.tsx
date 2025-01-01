import InvoicePreview from '@/containers/InvoicePreview';
import InvoiceSimForm from '@/containers/InvoiceSimForm';
import { invoiceSimulationFormSchema } from '@/schemas/invoiceSimulation';
import Page from '@/templates/Page';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const InvoiceSim = () => {
  const [openPreview, setOpenPreview] = useState(false);

  const formMethods = useForm<z.infer<typeof invoiceSimulationFormSchema>>({
     defaultValues: {
       issueDate:'',
       invoiceNumber: '',
       clientNif: '',
       clientName: '',
       clientAddress:'',
       clientEmail: '',
       clientePhoneNumber: '',
       products: [],
       discount:'',
     },
     resolver: zodResolver(invoiceSimulationFormSchema),
     mode:'all',
  });

  const watchForm = formMethods.watch();

  const handleInvoicePreview = () => setOpenPreview(true);

  const mapInvoiceFormToPreview = (formData: z.infer<typeof invoiceSimulationFormSchema>) => {

      const subtotal = formData.products.reduce((acc, product) => {
        return acc + product.quantity * product.unitPrice;
      }, 0);

    // calculate tax (23%)
    const totalTax = subtotal * 0.23;

    const totalDiscount = formData.discount
      ? subtotal * (parseFloat(formData.discount) / 100)
      : 0;

    const total = subtotal + totalTax - totalDiscount;

    return {
      ...formData,
      subtotal,
      tax: totalTax,
      totalDiscount,
      total,
    };
  }

  return (
    <Page title='Invoice Simulation'>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <FormProvider {...formMethods}>
          <InvoiceSimForm onSubmit={handleInvoicePreview}/>
          {openPreview && <InvoicePreview formValues={mapInvoiceFormToPreview(watchForm)}/>}
        </FormProvider>
      </div>
    </Page>
  )
}

export default InvoiceSim;
