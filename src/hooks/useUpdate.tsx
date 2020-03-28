import { useEffect } from 'react';

const useUpdate = (
  ref: firebase.firestore.DocumentReference,
  value: number,
  dependency?: object | null,
) => {
  useEffect(() => {
    ref.update({ comments: value });
  }, [dependency]);
};
export default useUpdate;
