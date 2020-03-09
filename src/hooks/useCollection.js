import { useEffect } from 'react';
import documentsCollection from '../utils/documentsCollection';

const useCollection = (ref, dataSetter, dependency = null) => {
  let unsubscribe = null;
  useEffect(() => {
    unsubscribe = ref.onSnapshot(snapshot => {
      const dataFromCollection = documentsCollection(snapshot);
      dataSetter(dataFromCollection);
    });

    return () => {
      unsubscribe();
    };
  }, [dependency]);
};
export default useCollection;
