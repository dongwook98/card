import { ChangeEvent, useCallback, useState } from 'react';

import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply';
import { ApplyValues } from '@/models/apply';
import Select from '@shared/Select';
import FixedBottomButton from '@shared/FixedBottomButton';
import Spacing from '@shared/Spacing';

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>;

export default function BasicInfo({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void;
}) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  });

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value
  );

  return (
    <div style={{ padding: '24px' }}>
      <Select
        name='salary'
        label='연소득'
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />

      <Spacing size={24} />

      <Select
        name='creditScore'
        label='신용점수'
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />

      <Spacing size={24} />

      <Select
        name='payDate'
        label='결제일'
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label='다음'
        onClick={() => {
          onNext(infoValues);
        }}
        disabled={모든정보가선택되었는가 === false}
      />
    </div>
  );
}
