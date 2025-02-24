import { MouseEvent, useCallback, useState } from 'react';

import Agreement from '@shared/Agreement';
import FixedBottomButton from '@shared/FixedBottomButton';
import { 약관목록 } from '@constants/apply';
import { ApplyValues } from '@/models/apply';

export default function Terms({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void;
}) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {}
    );
  }); // { '01': false, '02': false }

  const 모든약관에_동의하는가 = Object.values(termsAgreements).every(
    (동의여부) => 동의여부 === true
  );

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce((prev, key) => {
          return {
            ...prev,
            [key]: checked,
          };
        }, {});
      });
    },
    []
  );

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관에_동의하는가}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => {
                return {
                  ...prevTerms,
                  [id]: checked,
                };
              });
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomButton
        label='약관동의'
        disabled={모든약관에_동의하는가 === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements));
        }}
      />
    </div>
  );
}
