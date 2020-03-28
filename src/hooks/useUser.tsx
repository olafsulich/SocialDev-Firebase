import { useEffect } from 'react';
import { auth, createUserDoc } from '../firebase/firebase';

const useUser = (
  handler: React.Dispatch<React.SetStateAction<any>>,
  currentUser?: object | null,
) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const authUser = await createUserDoc(user);
        handler({ authUser });
      } else {
        auth.signOut();
        handler(null);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);
};
export default useUser;
