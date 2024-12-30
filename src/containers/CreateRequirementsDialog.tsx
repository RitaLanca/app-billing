import { FormProvider, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from '@hookform/resolvers/zod';
import { requirementsFormSchema } from '@/schemas/requirements';
import { z } from 'zod';
import CreateDialog from '@/components/dialogs/CreateDialog';
import { CreateRequirementDialogProps, requirementProps } from '@/types/requirements';
import { useEffect } from 'react';
import { convertToYYYYMMDD } from '@/helpers/dates';
import ErrorField from '@/components/forms/ErrorField';

const CreateRequirementsDialog =({
   categories,
   onCancel,
   onSubmit,
} : CreateRequirementDialogProps<requirementProps>) => {

    const openDialogButton = ( 
        <Button variant="outline" size="icon" className="font-medium">
            <PlusIcon className="size-4"/>
        </Button>
    );

    const formMethods = useForm<z.infer<typeof requirementsFormSchema>>({
        resolver: zodResolver(requirementsFormSchema),
        defaultValues: {
            name: '',
            category: '',
            deadline:convertToYYYYMMDD(new Date().toLocaleDateString()),
        },
        mode: 'onChange',
    })


    const { register, control, reset, formState, trigger} = formMethods;

    useEffect(() => {
        reset({
            ...formState.defaultValues,
            category: categories[0].tabName,
        })
        trigger();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])

  return (
    <FormProvider {...formMethods} >
      <CreateDialog 
            trigger={openDialogButton}
            title='Create requirement'
            onSubmit={onSubmit}
            onCancel={onCancel} 
            
            >
            <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className='min-w-20'>
                        Name
                    </label>
                    <div className='w-full flex flex-col'>
                        <input 
                            type='text' {...register("name")} 
                            className="block h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-2  focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                        />
                        <ErrorField msg={formMethods.formState?.errors?.name?.message}/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className='min-w-20'>
                        Category
                    </label>
                    <div className='w-full flex flex-col'>
                        <select 
                            {...register("category")} 
                            className="h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-1 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                            >
                            {categories?.map(category => ( <option key={category.tabId} value={category.tabName}>{category.tabName}</option>))}
                        </select>
                        <ErrorField msg={formMethods.formState?.errors?.category?.message}/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label className='min-w-20'>
                        Deadline
                    </label>  
                    <div className='w-full  flex flex-col'>
                        <input 
                            type='date' {...register("deadline")} 
                            className="h-8 text-slate-500 text-xs border border-slate-200 rounded-md px-3 py-1 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                        />
                        <ErrorField msg={formMethods.formState?.errors?.deadline?.message}/>
                    </div>
                </div>
            </div>
    </CreateDialog>
  </FormProvider>
  )
}

export default CreateRequirementsDialog
