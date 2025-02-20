import { useAtomValue } from 'jotai';
import { userAtom } from '@/atom/user';

function useUser() {
  return useAtomValue(userAtom);
}

export default useUser;
