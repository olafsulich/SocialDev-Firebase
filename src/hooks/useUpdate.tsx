import { useEffect } from 'react';

const useUpdate = (ref: any, value: {}, dependency?: never[]) => {
  useEffect(() => {
    ref.update({ comments: value });
  }, [dependency]);
};
export default useUpdate;
