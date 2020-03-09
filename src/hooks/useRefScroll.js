import { useEffect } from 'react';

const useRefScroll = (ref, dependency = null) => {
  useEffect(() => {
    const currentRef = ref.current;
    currentRef.scrollTop = currentRef.scrollHeight;
  }, [dependency]);
};
export default useRefScroll;
