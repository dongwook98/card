import Button from '@shared/Button';
import { collection, doc, writeBatch } from 'firebase/firestore';

import { store } from '@/remote/firebase';
import { adBanners } from '@/mock/data';
import { COLLECTIONS } from '@/constants';

export default function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store); // batch? 데이터 한번에 올리기? 같은건가

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adBanners.forEach((banner: any) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER));

      batch.set(docRef, banner);
    });

    await batch.commit();

    alert('배너 리스트 추가완료!');
  };

  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>;
}
