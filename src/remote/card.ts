import { collection, getDocs } from 'firebase/firestore';
import { store } from './firebase';

import { COLLECTIONS } from '@/constants';
import { Card } from '@/models/card';

export async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD));

  // 데이터 가공후 반환
  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));
}
