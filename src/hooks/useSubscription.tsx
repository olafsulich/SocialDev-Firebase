import { useEffect } from 'react';
import documentsCollection from '../utils/documentsCollection';

const useSubscription = (
  ref: firebase.firestore.CollectionReference,
  dataSetter: React.Dispatch<React.SetStateAction<any>>,
  order?: 'desc' | 'asc' | undefined,
  dependency?: object | null,
) => {
  useEffect(() => {
    const unsubscribe = ref
      .orderBy('createdAt', order)
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
        const dataFromSnapshot = snapshot.docs.map(documentsCollection);
        dataSetter(dataFromSnapshot);
      });
    return () => unsubscribe();
  }, [dependency]);
};
export default useSubscription;
