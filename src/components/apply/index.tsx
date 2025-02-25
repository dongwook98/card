import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { APPLY_STATUS, ApplyValues } from '@/models/apply';
import useUser from '@/hooks/auth/useUser';

// 각각의 스텝들의 값들을 관리하는 컴포넌트
export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void;
}) {
  const user = useUser();
  const { id } = useParams();

  const storageKey = `applied-${user?.uid}-${id}`;

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey);

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      };
    }

    return JSON.parse(applied);
  });

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey);

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues));
    }
  }, [applyValues, onSubmit, storageKey]);

  // Terms, BasicInfo, CardInfo 스텝들의 값들을 받아오는 함수
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }));
  };

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }));
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }));
  };

  return (
    <div>
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  );
}
