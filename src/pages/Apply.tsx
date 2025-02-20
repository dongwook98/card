import { useState } from 'react';

import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';

export default function ApplyPage() {
  const [step, setStep] = useState(0);

  // Terms, BasicInfo, CardInfo 스텝들의 값들을 받아오는 함수
  const handleTermsChange = (terms: string[]) => {
    console.log('terms', terms);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  );
}
