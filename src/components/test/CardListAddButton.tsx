import Button from '@shared/Button';
import { collection, doc, writeBatch } from 'firebase/firestore';

import { store } from '@/remote/firebase';
import { card_list } from '@/mock/data';
import { COLLECTIONS } from '@/constants';

/**
 * @/mock/data에 있는 데이터를 파이어베이스 스토어로 옮겨주는 컴포넌트
 */
export default function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store); // batch? 데이터 한번에 올리기? 같은건가

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    card_list.forEach((card: any) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD));

      batch.set(docRef, card); // 각각의 card 데이터들을 문서화한것을 배치에 저장
    });

    await batch.commit(); // 배치 커밋

    alert('카드 리스트 추가완료!');
  };

  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>;
}
