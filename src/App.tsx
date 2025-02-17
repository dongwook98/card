import { css } from '@emotion/react';
import styled from '@emotion/styled';
import './App.css';

const bold = css`
  font-weight: bold;
`;

const containerStyles = css`
  background-color: pink;
  ${bold}
`;

const Button = styled.button`
  width: 200px;
  height: 100px;
  ${bold}
`;

function App() {
  return (
    <>
      <div css={containerStyles}>Home</div>
      <Button>스타일 버튼</Button>
    </>
  );
}

export default App;
