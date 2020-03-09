import { useEffect } from 'react';
import documentsCollection from '../utils/documentsCollection';

const useSubscription = (ref, dataSetter, dependency = null) => {
  let unsubscribe = null;
  useEffect(() => {
    unsubscribe = ref.orderBy('createdAt', 'asc').onSnapshot(snapshot => {
      const dataFromSnaphot = snapshot.docs.map(documentsCollection);
      dataSetter(dataFromSnaphot);
    });
    return () => unsubscribe();
  }, [dependency]);
};
export default useSubscription;
