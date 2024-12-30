/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell,TableHead, TableHeader, TableRow } from "./ui/table"
import { TrashIcon } from '@heroicons/react/24/solid'
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"


const CheckList = ({
    list,
    handleDelete,
    handleCheck,
}: {
    list: any[],
    handleDelete: (id:string) => void
    handleCheck: (id:string, value: boolean) => void
}) => {
    const [requirements, setRequirements] = useState<any[]>([]);

    useEffect(()=> {
        setRequirements([...list]);
    }, [list]);

  return (
        <div className="transition-all duration-500">
             <Table className="w-full ">
             <TableHeader>
                     <TableRow>
                         <TableHead/>
                         <TableHead>Name</TableHead>
                         <TableHead>Deadline</TableHead>
                         <TableHead/>
                     </TableRow>
             </TableHeader>
             <TableBody>
                     {requirements.map((item) => (
                         <TableRow key={item.id}>
                             <TableCell>
                                 <Checkbox className="size-5" checked={item.done} onCheckedChange={(value:boolean) => handleCheck(item.id, value)}/> 
                             </TableCell>
                             <TableCell className={`font-medium w-fit ${item.done ? "line-through text-gray-500" : ""}`}>
                                {item.name}
                            </TableCell>
                             <TableCell className={item.done ? "line-through text-gray-500" : ""}>
                                {item.deadline}
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" size="icon" className="font-medium" onClick={() => handleDelete(item.id)}>
                                    <TrashIcon className="size-5" />
                                </Button>
                            </TableCell>
                         </TableRow>
                     ))}
             </TableBody>      
         </Table>              
        </div>
    );
}
export default CheckList;
