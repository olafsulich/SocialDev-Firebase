import { useEffect } from 'react';

const useUpdate = (ref, value, dependency = null) => {
  useEffect(() => {
    ref.update({ comments: value });
  }, [dependency]);
};
export default useUpdate;
