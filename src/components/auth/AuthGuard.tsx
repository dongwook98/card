import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/remote/firebase';
import { userAtom } from '@/atom/user';

// 인증처리
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetAtom(userAtom);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      });
    } else {
      setUser(null);
    }

    setInitialize(true);
  });

  if (initialize === false) {
    return null;
  }

  return <>{children}</>;
}
