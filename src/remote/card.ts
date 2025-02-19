import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  getDoc,
} from 'firebase/firestore';
import { store } from './firebase';

import { COLLECTIONS } from '@/constants';
import { Card } from '@/models/card';

// pageParam 지금 보이고있는 맨 마지막 요소
export async function getCards(
  pageParam?: QueryDocumentSnapshot<Card | DocumentData>
) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam), // pageParam(cursor)가 있으면 거기서부터 불러오기
          limit(10)
        );

  const cardSnapshot = await getDocs(cardQuery);

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1];

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));

  // 데이터 가공후 반환
  return { items, lastVisible };
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id));

  return {
    id,
    ...(snapshot.data() as Card),
  };
}
