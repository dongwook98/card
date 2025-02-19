import { css } from '@emotion/react';

import Flex from '@shared/Flex';
import TextField from '@shared/TextField';
import FixedBottomButton from '@shared/FixedBottomButton';
import Spacing from '@shared/Spacing';

export default function Form() {
  return (
    <Flex direction='column' css={formContainerStyles}>
      <TextField label='이메일' name='email' placeholder='olaf@gmail.com' />
      <Spacing size={16} />
      <TextField label='패스워드' name='password' type='password' />
      <Spacing size={16} />
      <TextField label='패드워드 재확인' name='rePassword' type='password' />
      <Spacing size={16} />
      <TextField label='이름' name='name' placeholder='올라프' />

      <FixedBottomButton label='회원가입' onClick={() => {}} disabled />
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;
