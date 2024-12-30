/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form"

export interface requirementProps {
    id: string,
    name: string,
    category: string,
    done: boolean,
    deadline: string,
}

export interface TabContentProps<T> {
    tabId: string,    
    tabName: string,    
    tabContent: T[],
}

export interface RequirementTabsProps<T> {
    tabs: TabContentProps<T>[],
    defaultTab?: string,
    handleCreate: (body:any) => Promise<void>,
    handleDelete: (id:string) => Promise<void>,
    handleCheck: (id:string, isChecked:boolean) => Promise<void>,
};

export interface CreateRequirementDialogProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>,
    onCancel?: () => void,
    categories: TabContentProps<T>[]
  }
