import { useEffect } from 'react';

const useRefScroll = (ref: any, dependency = null) => {
  useEffect(() => {
    const currentRef = ref.current;
    currentRef.scrollTop = currentRef.scrollHeight;
  }, [dependency]);
};
export default useRefScroll;
