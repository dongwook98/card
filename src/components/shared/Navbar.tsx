import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { signOut } from 'firebase/auth';

import Flex from './Flex';
import Button from './Button';
import { colors } from '@/styles/colorPalette';
import useUser from '@/hooks/auth/useUser';
import { auth } from '@remote/firebase';

export default function Navbar() {
  const location = useLocation();
  const showSignButton =
    ['/signup', '/singin'].includes(location.pathname) === false;

  const user = useUser();

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>;
    }

    if (showSignButton) {
      return (
        <Link to='/signin'>
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton, handleLogout]);

  return (
    <Flex justify='space-between' align='center' css={navbarContainerStyles}>
      <Link to='/'>홈</Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`;
