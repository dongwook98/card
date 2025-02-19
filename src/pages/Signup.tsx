import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { auth, store } from '@/remote/firebase';
import { COLLECTIONS } from '@/constants';
import { FormValues } from '@/models/signup';
import Form from '@/components/signup/Form';

export default function SignupPage() {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues;

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, {
      displayName: name,
    });

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}
