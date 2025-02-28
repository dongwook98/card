import { MouseEvent, useCallback, useState } from 'react';

import Button from '@shared/Button';
import Spacing from '@shared/Spacing';
import FixedBottomButton from '@shared/FixedBottomButton';
import { ApplyValues } from '@/models/apply';

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>;

export default function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void;
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isRf: false,
    isHipass: false,
  });
  const { isMaster, isRf, isHipass } = cardInfoValues;

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement;

    setCardInfoValues((prevValues) => ({
      ...prevValues,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }));
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Button.Group title='해외결제'>
        <Button
          name='isMaster'
          weak={isMaster === false}
          size='medium'
          onClick={handleButtonClick}
          data-value={true}
        >
          Master
        </Button>
        <Button
          name='isMaster'
          weak={isMaster === true}
          size='medium'
          onClick={handleButtonClick}
          data-value={false}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title='후불교통기능'>
        <Button
          name='isRf'
          weak={isRf === true}
          size='medium'
          onClick={handleButtonClick}
          data-value={false}
        >
          신청안함
        </Button>
        <Button
          name='isRf'
          weak={isRf === false}
          size='medium'
          onClick={handleButtonClick}
          data-value={true}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title='후불하이패스카드'>
        <Button
          name='isHipass'
          weak={isHipass === true}
          size='medium'
          onClick={handleButtonClick}
          data-value={false}
        >
          신청안함
        </Button>
        <Button
          name='isHipass'
          weak={isHipass === false}
          size='medium'
          onClick={handleButtonClick}
          data-value={true}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label='다음'
        onClick={() => {
          onNext(cardInfoValues);
        }}
      />
    </div>
  );
}
