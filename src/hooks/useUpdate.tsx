import { useEffect } from 'react';

const useUpdate = (ref: any, value: {}, dependency = null) => {
  useEffect(() => {
    ref.update({ comments: value });
  }, [dependency]);
};
export default useUpdate;
