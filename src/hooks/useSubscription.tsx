import { useEffect } from 'react';
import documentsCollection from '../utils/documentsCollection';

const useSubscription = (ref: any, dataSetter: any, order = 'asc', dependency = null) => {
  useEffect(() => {
    const unsubscribe = ref.orderBy('createdAt', `${order}`).onSnapshot((snapshot: any) => {
      const dataFromSnaphot = snapshot.docs.map(documentsCollection);
      dataSetter(dataFromSnaphot);
    });
    return () => unsubscribe();
  }, [dependency]);
};
export default useSubscription;
