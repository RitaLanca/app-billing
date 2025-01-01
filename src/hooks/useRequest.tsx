/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';

interface UseFetchResult {
    data: any | null,
    isPending: boolean,
    error: any | null,
    request: () => Promise<any>,
}

 
const useRequest = (request: any, { disabled = false }={}):UseFetchResult =>  {
    const [data, setData] = useState<any | null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<any | null>(null);

    const getData = useCallback(async (...args) => {
        try {
          setIsPending(true);
          const resp = await request(...args);
          setData(resp);
          return resp;
        } catch (err) {
          setError(err);
          throw err; // Retorna o erro para o chamador caso necessário
        } finally {
          setIsPending(false);
        }
      }, [request]);
      
      useEffect(() => {
        if (!disabled) {
          getData();
        }
      }, [disabled, getData]);
    return {
        data, 
        isPending, 
        error, 
        request:getData,
    }
}

export default useRequest;