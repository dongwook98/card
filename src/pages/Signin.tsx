import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import Form from '@/components/signin/Form';
import { FormValues } from '@/models/signin';
import { auth } from '@/remote/firebase';
import { useAlertContext } from '@/contexts/AlertContext';

export default function SigninPage() {
  const { open } = useAlertContext();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues;

      try {
        await signInWithEmailAndPassword(auth, email, password);

        navigate('/');
      } catch (err) {
        // firebase 의 에러
        if (err instanceof FirebaseError) {
          if (err.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {
                //
              },
            });

            return;
          }
        }

        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            //
          },
        });
      }
    },
    [navigate, open]
  );

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}
