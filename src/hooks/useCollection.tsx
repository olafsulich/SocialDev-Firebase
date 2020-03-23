import { useEffect } from 'react';
import documentsCollection from '../utils/documentsCollection';

const useCollection = (ref: { onSnapshot: any }, dataSetter: any, dependency = null) => {
  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot: any) => {
      const dataFromCollection = documentsCollection(snapshot);
      dataSetter(dataFromCollection);
    });

    return () => {
      unsubscribe();
    };
  }, [dependency]);
};
export default useCollection;
