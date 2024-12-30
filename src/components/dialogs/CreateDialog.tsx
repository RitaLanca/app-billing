import React from "react";
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button";

interface CreateDialogProps<T extends FieldValues> {
  title?: string,
  trigger: React.ReactNode,
  onSubmit: SubmitHandler<T>
  children: React.ReactNode, // Custom form fields without form library
  onCancel?: () => void,
}

const CreateDialog = <T extends FieldValues>({
  trigger: openDialogTrigger,
  onSubmit,
  children,
  title,
}: CreateDialogProps<T>) => {
    
  const { handleSubmit, formState } = useFormContext<T>();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {openDialogTrigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:bg-opacity-95 rounded-lg dark:text-white">
                <form  onSubmit={handleSubmit(onSubmit, err=> console.log('error', err))} >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                    <DialogFooter className="flex flex-row justify-end gap-4">
                       <DialogClose>
                            <Button 
                                type="submit" 
                                className="min-w-20 dark:bg-violet-700 dark:hover:bg-violet-800 dark:text-white"
                                disabled={!formState.isDirty || !formState.isValid}
                                >
                                    Create
                            </Button>
                        </DialogClose> 
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        );
    }


export default CreateDialog;