const InvoicePreview = ({
    formValues,
}) => {

  return (
    <div className="max-w-3xl m-4 p-4 bg-white shadow-lg rounded-md text-gray-900">
        <div className="text-left mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{`Invoice #${formValues?.invoiceNumber}`}</h1>
        </div>
        <div className="flex justify-between">
            <div className="w-1/3 text-xs">
                <h2 className="text-sm font-medium">TechBilling</h2>
                <p>Rua das Flores, 123, Lisboa, Portugal</p>
                <address>
                <p>(+351)123456769</p>  
                <p>techbilling@email.com</p>
                </address>    
            </div>
            <div className="w-1/3 flex flex-col gap-4">
                <div className="text-xs mt-8">
                    <h2 className="text-sm font-medium bg-gray-300 border border-gray-900 px-1">Issue Date</h2>
                    <div className="p-1">
                        <p>{formValues.issueDate}</p>          
                    </div>
                </div>
                <div className="text-xs ">
                    <h2 className="text-sm font-medium bg-gray-300 border border-gray-900 px-1">Billed To</h2>
                    <div className="p-1">
                        <p>{formValues.clientName}</p>
                        <p>{formValues.clientAddress}</p>
                        <p>{formValues.clientNif}</p>
                        <address>
                            <p>{formValues.clientePhoneNumber}</p>  
                            <p>{formValues.clientEmail}</p>  
                        </address>               
                    </div>
                </div>
            </div>
        </div>
    <div className="overflow-x-auto mt-6">
      <table className="w-full table-auto text-sm sm:text-base">
        <thead className="bg-gray-300 border border-gray-900">
          <tr >
            <th className="py-2 px-2 text-left">Descrição</th>
            <th className="py-2 text-center">Quantidade</th>
            <th className="py-2 text-right">Preço Unitário</th>
            <th className="py-2 px-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {formValues?.products?.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-2">{item.description}</td>
              <td className="py-2 text-center">{item.quantity}</td>
              <td className="py-2 text-center">{item.unitPrice}€</td>
              <td className="py-2 px-2 text-right">
                {(item.quantity * item.unitPrice) || 0}€
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 text-sm sm:text-base">
      <div className="flex justify-between py-2">
        <span>Subtotal:</span>
        <span>{formValues.subtotal.toFixed(2)}€</span>
      </div>
      <div className="flex justify-between py-2">
        <span>Discount({formValues.discount}%):</span>
        <span>{formValues.totalDiscount.toFixed(2)}€</span>
      </div>
      <div className="flex justify-between py-2">
        <span>Tax (23%):</span>
        <span>{formValues.tax.toFixed(2)}€</span>
      </div>
      <div className="flex justify-between font-bold py-2">
        <span>Total:</span>
        <span>{formValues.total.toFixed(2)}€</span>
      </div>
    </div>
  </div>
  )
}

export default InvoicePreview
