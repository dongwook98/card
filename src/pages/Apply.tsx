import { useState } from 'react';

import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { ApplyValues } from '@/models/apply';

export default function ApplyPage() {
  const [step, setStep] = useState(1);

  // Terms, BasicInfo, CardInfo 스텝들의 값들을 받아오는 함수
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('terms', terms);
  };

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>
  ) => {
    console.log(infoValues);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  );
}
