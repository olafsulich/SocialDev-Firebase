import { useEffect } from 'react';
import { auth, createUserDoc } from '../firebase/firebase';

const useUser = handler => {
  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      const authUser = await createUserDoc(user);
      handler({ authUser });
    });
  }, []);
};
export default useUser;
