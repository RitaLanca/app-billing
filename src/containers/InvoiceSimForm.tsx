import { z } from "zod";
import ErrorField from "@/components/forms/ErrorField";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { productSchema, invoiceSimulationFormSchema, productRequestSchema } from "@/schemas/invoiceSimulation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/forms/SelectField";
import useRequest from "@/hooks/useRequest";
import { getProducts } from "@/api/products";
import { useEffect, useState } from "react";

type SelectOption = {
    id: string | number;
    label: string;
};

const InvoiceSimForm = ({
    onSubmit
}: {
    onSubmit:() => void
}) => {
    const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);

    const {data: products} = useRequest(getProducts);

    const { control, register, formState, setValue, watch, handleSubmit } = useFormContext<z.infer<typeof invoiceSimulationFormSchema>>();
   
    const { fields, append, remove } = useFieldArray<z.infer<typeof productSchema>[]>({
        control,
        name: 'products',
      });

      const productsField = watch('products');

    const mapToSelectOptions = (products: z.infer<typeof productRequestSchema>[]): SelectOption[] => products?.map(p => ({id: p.id, label: p.name}));

    const onPreviewClick = () => {
        onSubmit();
    }
    
    useEffect(() => {
        if(products){
            setSelectOptions(mapToSelectOptions(products));
        }
    }, [products]);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onPreviewClick)}>
                <section>
                    <h3>Invoice Details</h3>
                    <div className="border-b my-4 border-gray-400"/>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex flex-col gap-2 my-2 text-sm w-full sm:w-1/2">
                            <label>
                                Document number *
                            </label>
                            <div className='flex flex-col'>
                                <input 
                                    {...register("invoiceNumber")} 
                                    type='text'
                                    className="block h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2  focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                                />
                                <ErrorField msg={formState?.errors?.invoiceNumber?.message}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 my-2 text-sm w-full sm:w-1/2">
                            <label>
                                Issued on *
                            </label>
                            <div className='flex flex-col'>
                                <input 
                                    {...register("issueDate")} 
                                    type='date'
                                    className="block h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2  focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                                />
                                 <ErrorField msg={formState?.errors?.issueDate?.message}/>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Client Details</h3>
                    <div className="border-b my-4 border-gray-400"/>
                    <div className="flex flex-col gap-2 my-2 text-sm w-full">
                        <label>
                            Name * 
                        </label>
                        <div className='flex flex-col'>
                            <input 
                                {...register("clientName")} 
                                type='text'
                                className="block h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2  focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                            />
                            <ErrorField msg={formState?.errors?.clientName?.message}/>
                        </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row justify-between gap-4 w-full">
                        <div className="flex flex-col gap-2 my-2 text-sm w-full">
                            <label>
                                NIF * 
                            </label>
                            <div className='flex flex-col'>
                                <input 
                                    {...register("clientNif")} 
                                    type='number'
                                    className="h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                                />
                                <ErrorField msg={formState?.errors?.clientNif?.message}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2  my-2 text-sm w-full">
                        <label>
                            Phone number
                        </label>
                        <div className='flex flex-col'>
                            <input 
                                {...register("clientePhoneNumber")} 
                                type="number"
                                className="block h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                            />
                            <ErrorField msg={formState?.errors?.clientePhoneNumber?.message}/>
                        </div>
                    </div>
                    </div>
                    <div className="flex flex-col gap-2  my-2 text-sm">
                        <label className=''>
                            Address
                        </label>
                        <div className='w-full flex flex-col'>
                            <input 
                                {...register("clientAddress")} 
                                type='text'
                                className="block h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2  focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                            />
                            <ErrorField msg={formState?.errors?.clientAddress?.message}/>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 my-2 text-sm">
                        <label className='min-w-20'>
                            Email address *
                        </label>
                        <div className='w-full flex flex-col'>
                            <input 
                                type='text'
                                {...register("clientEmail")} 
                                className="block h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2  focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                            />
                            <ErrorField msg={formState?.errors?.clientEmail?.message}/>
                        </div>
                    </div>
                </section>
                <section className="mb-6">
                    <div className="flex items-center justify-between">
                        <h3>Products</h3>
                        <Button variant="outline" size="icon" className="font-medium" onClick={(e) => {
                            e.preventDefault();
                            append({ quantity: 0, unitPrice: 0});
                        }}>
                            <PlusIcon className="size-5" />
                        </Button>
                    </div>
                    <div className="border-b my-4 border-gray-400"/>
                    <Table  className="w-full block sm:table">
                        <TableHeader className="hidden sm:table-row">
                            <TableHead>Description</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead/>
                        </TableHeader>
                            <TableBody >
                                {fields.map((field, index) => (
                                    <TableRow className="block sm:table-row border-b md:border-none align-top">
                                        <TableCell className="block md:table-cell p-2 sm:w-2/5">  
                                            <div className="flex flex-col gap-1 w-full sm:min-w-[140px]">
                                                <Controller 
                                                    name={`products.${index}.id`}
                                                    control={control}
                                                    render={({field: selectField}) => (
                                                        <SelectField 
                                                            {...selectField}
                                                            placeholder="-- Select --" 
                                                            options={selectOptions}
                                                            className="dark:border-b-2 dark:border-b-violet-700 rounded-none"
                                                            onValueChange={(selectedId) => {
                                                                selectField.onChange(selectedId); // Atualiza o ID do produto
                                                                const selectedProduct = products?.find(p => p.id === selectedId);
                                                                if (selectedProduct) {
                                                                setValue(`products.${index}.description`, selectedProduct.name);
                                                                // updates the selected product's price
                                                                setValue(`products.${index}.unitPrice`, parseInt(selectedProduct.price,10));
                                                                }
                                                            }}
                                                            /> 
                                                    )}
                                                />
                                                <span className="px-3 py-2 text-xs text-gray-400 w-full">
                                                {`Price: ${productsField?.[index]?.unitPrice ? `${productsField[index].unitPrice}€` : '--'}`}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="block sm:table-cell p-2 align-top sm:w-1/5">  
                                            <div>
                                                <Input 
                                                {...register(`products.${index}.quantity`, {valueAsNumber: true})}
                                                inputMode="numeric"
                                                placeholder="Quantity"
                                                className="self-start appearance:textfield dark:border-b-2 dark:border-b-violet-700 rounded-none" 
                                                />  
                                            </div>
                                        </TableCell>
                                        <TableCell className="block sm:table-cell p-2 align-top sm:w-1/5  min-w-[140px]"> 
                                            <div className="flex self-center"> 
                                                <Input 
                                                    readOnly
                                                    className="dark:focus:ring-0 border-none shadow-none" 
                                                    value={`${(watch(`products.${index}.quantity`) * watch(`products.${index}.unitPrice`))}€`}/>
                                            </div>
                                        </TableCell>
                                        <TableCell className="block sm:table-cell p-2 align-top sm:w-1/5">
                                            <div className="flex sm:justify-end h-full">
                                                <Button variant="outline" size="icon" className="font-medium" onClick={() => remove(index)}>
                                                    <TrashIcon className="size-5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                </TableRow>

                                )
                                )}
                            </TableBody>
                    </Table>
                </section>
                <section>
                    <div className="flex flex-row gap-2 my-4 text-sm items-center">
                        <label >
                            Discount(%)
                        </label>
                        <Input 
                            {...register("discount")} 
                            type="number"
                            inputMode="numeric"
                            className="block w-16 h-8 text-slate-500 md:text-xs border border-slate-200 rounded-md px-3 py-2 bg-white focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                        />
                    </div>
                </section>
                <div className="mt-14 flex justify-end">
                    <Button 
                        type="submit" 
                        className="min-w-20 dark:bg-violet-700 dark:hover:bg-violet-800 dark:text-white"
                        disabled={!formState.isDirty || !formState.isValid}
                    >
                        Preview
                    </Button>
                </div>
        </form>
        </div>
  )
}

export default InvoiceSimForm;
