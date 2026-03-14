import { useCallback, useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequest';
import Page from '../templates/Page';
import RequirementsTabs from '@/containers/RequirementsTabs';
import { createNewComplianceRequirement, deleteComplianceRequirement, getComplianceRequirements, updateComplianceRequirement } from '@/api/requirements';
import { requirementProps, TabContentProps } from '@/types/requirements';
import { toCamelCase } from '@/helpers/strings';
import { FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import useDeadlineNotifications from '@/hooks/useDeadlineNotifications';
import { SearchInput } from '@/components/Search';

const Requirements = () => {
  const { data, request:refreshRequirements, isPending } = useRequest(getComplianceRequirements, {disabled:true});
  const { refreshNotifications } = useDeadlineNotifications();
  const [tabs, setTabs] = useState<TabContentProps<requirementProps>[]>([]);

  const defaultTab = tabs?.length > 0 ? tabs[0].tabId : undefined; 
  console.log("default", defaultTab);

  const groupRequirementsByCategory = arr =>  arr?.reduce((acc, currRequirement) => {
    const {category} = currRequirement;
    if(!acc[category]){ 
      acc[category] = [];
    }
    acc[category].push(currRequirement);
    return acc;
  }, []);


  const buildTabsInfo = ():TabContentProps<requirementProps>[] => {
    const requirementGroups = groupRequirementsByCategory(data);
    return Object.entries(requirementGroups)?.map(([category, requirements]) => ({
      tabId: toCamelCase(category),
      tabName: category,
      tabContent: requirements as requirementProps[],
    }));
  } 

  const createNewRequirement = async (formData: FieldValues ): Promise<void> => {
    const newRequirement = {
      id: uuidv4(),
      name: formData.name,
      category: formData.category,
      deadline: formData.deadline,
      done:false,
    } as requirementProps
    await createNewComplianceRequirement(newRequirement);
    await refreshRequirements(); // to update table list
    refreshNotifications(); // to update notification list
  }

  const deleteRequirement = async(requirementId: string): Promise<void> => {
    await deleteComplianceRequirement(requirementId);
    await refreshRequirements();
    refreshNotifications();
  }

  const checkRequirement = async(requirementId: string, checkStatus: boolean): Promise<void> => {
    const updatedRequirement = {
      done:checkStatus,
    }
    await updateComplianceRequirement(requirementId, updatedRequirement);
    await refreshRequirements();
    refreshNotifications();
  }
  
  const searchRequirements = useCallback((value: string) => {
    if (value && value.trim().length > 0) {
      refreshRequirements(value.trim());
    } else {
      refreshRequirements();
    }
  }, [refreshRequirements]);

  useEffect(() => {
    refreshRequirements();
  }, [refreshRequirements]);

  useEffect(() => {
      const result = data && buildTabsInfo();
      setTabs(result);
  }, [data]);

  
  return (
    <Page title='Requirements'>
      <div className='my-8'>
        <SearchInput onSearch={searchRequirements} />
      </div>
      <RequirementsTabs 
        tabs={tabs} 
        defaultTab={defaultTab} 
        handleCreate={createNewRequirement}
        handleDelete={deleteRequirement}  
        handleCheck={checkRequirement}
      />
     </Page>
  )
}

export default Requirements
