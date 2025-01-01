 
 
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Option {
    id: string|number,
    label: string,
}

interface SelectFieldProps extends React.ComponentProps<typeof Select> {
    placeholder: string; // Placeholder para o SelectValue
    options: Option[];   // Lista de opções
    className?: string,
  }

const SelectField = ({
    placeholder,
    options,
    className,
    ...props
}: SelectFieldProps) => {
  return (
    <Select {...props}>
        <SelectTrigger className={cn('w-full', className)}>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {options.map(op => <SelectItem key={op.id} value={op.id.toString()}>{op.label}</SelectItem>)}
        </SelectContent>
        </Select>
    );
}

export default SelectField
