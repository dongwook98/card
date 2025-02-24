import { useState } from 'react';

import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { ApplyValues } from '@/models/apply';

// 각각의 스텝들의 값들을 관리하는 컴포넌트
export default function Apply({ onSubmit }: { onSubmit: () => void }) {
  const [step, setStep] = useState(2);

  // Terms, BasicInfo, CardInfo 스텝들의 값들을 받아오는 함수
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('terms', terms);
  };

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>
  ) => {
    console.log(infoValues);
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>
  ) => {
    console.log(cardInfoValues);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  );
}
