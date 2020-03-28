import { useEffect } from 'react';

const useRefScroll = (ref: React.RefObject<HTMLDivElement>, dependency?: {}) => {
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.scrollTop = currentRef.scrollHeight;
    }
  }, [dependency]);
};
export default useRefScroll;
