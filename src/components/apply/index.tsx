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

  const [step, setStep] = useState(0);

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  });

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues);
    }
  }, [applyValues, onSubmit, step]);

  // Terms, BasicInfo, CardInfo 스텝들의 값들을 받아오는 함수
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  );
}
