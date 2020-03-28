import { useEffect } from 'react';
import documentsCollection from '../utils/documentsCollection';

const useCollection = (
  ref: firebase.firestore.DocumentReference,
  dataSetter: React.Dispatch<React.SetStateAction<any>>,
  dependency?: object | null,
) => {
  useEffect(() => {
    const unsubscribe = ref.onSnapshot((snapshot: {}) => {
      const dataFromCollection: object[] = documentsCollection(snapshot);
      dataSetter(dataFromCollection);
    });

    return () => {
      unsubscribe();
    };
  }, [dependency]);
};
export default useCollection;
