import Text from '@shared/Text';
import Button from '@shared/Button';
import Input from './components/shared/Input';
import TextField from './components/shared/TextField';

function App() {
  return (
    <>
      <Text typography='t1' color='blue'>
        t1
      </Text>
      <Text typography='t2'>t2</Text>
      <Text typography='t3'>t3</Text>
      <Text typography='t4'>t4</Text>
      <Text typography='t5'>t5</Text>

      <div></div>
      <Button color='succuss'>클릭해주세요</Button>
      <Button color='error'>클릭해주세요</Button>
      <Button color='primary'>클릭해주세요</Button>
      <Button color='succuss' weak>
        클릭해주세요
      </Button>
      <Button color='error' weak>
        클릭해주세요
      </Button>
      <Button color='primary' weak>
        클릭해주세요
      </Button>
      <Button full>클릭해주세요</Button>
      <Button full disabled>
        클릭해주세요
      </Button>

      <Input placeholder='로그인' />
      <Input aria-invalid={true} />
      <TextField label='아이디' />
      <TextField label='패스워드' hasError />
    </>
  );
}

export default App;
