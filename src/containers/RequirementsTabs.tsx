import CheckList from "@/components/CheckList";
import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { requirementProps, RequirementTabsProps } from "@/types/requirements";
import CreateRequirementsDialog from "./CreateRequirementsDialog";

const RequirementsTabs = <T extends requirementProps,> ({
    tabs, 
    defaultTab,
    handleCreate,
    handleDelete,
    handleCheck,
}: RequirementTabsProps<T>) => {

    return(
        <ShadcnTabs defaultValue={defaultTab || ''} className="w-full">
            <TabsList className="flex justify-between">
                <div>
                    {tabs?.map(tab => <TabsTrigger value={tab.tabId}>{tab.tabName}</TabsTrigger> )}
                </div>
                <CreateRequirementsDialog onCancel={()=>{}} onSubmit={handleCreate} categories={tabs} />  {/* Button and create dialog */}
            </TabsList>
                {tabs?.map(tab =>  (
                    <TabsContent value={tab.tabId}>
                        <CheckList 
                            key={tab.tabName} 
                            list={tab.tabContent} 
                            handleDelete={handleDelete} 
                            handleCheck={handleCheck}
                        />
                    </TabsContent> 
                ))
            }
        </ShadcnTabs>
    );
}

export default RequirementsTabs;