import { useEffect } from 'react';
import documentsCollection from '../utils/documentsCollection';

const useSubscription = (ref, dataSetter, order = 'asc', dependency = null) => {
  let unsubscribe = null;
  useEffect(() => {
    unsubscribe = ref.orderBy('createdAt', `${order}`).onSnapshot(snapshot => {
      const dataFromSnaphot = snapshot.docs.map(documentsCollection);
      dataSetter(dataFromSnaphot);
    });
    return () => unsubscribe();
  }, [dependency]);
};
export default useSubscription;
