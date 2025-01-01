

  export interface productProps {
    id: string,
    description: string,
    unitPrice: number,
    quantity: number,
  }

  export interface invoicePreviewProps {
    invoiceNumber: string,
    issueDate:string,
    clientePhoneNumber:string,
    clientNif:string,
    clientAddress:string,
    clientEmail:string,
    products: productProps[],
    discount: number,
    totalDiscount: number,
    tax: number,
    subtotal:number,
    total: number,
  }