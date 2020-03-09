import { useEffect } from 'react';

const useUpdate = (ref, data, value, dependency = null) => {
  useEffect(() => {
    ref.update({ data: value });
  }, [dependency]);
};
export default useUpdate;
