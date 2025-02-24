import Apply from '@components/apply';
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation';
import { useState } from 'react';
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus';
import { updateApplyCard } from '@/remote/apply';
import useUser from '@/hooks/auth/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import { APPLY_STATUS } from '@/models/apply';

export default function ApplyPage() {
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [readyToPoll, setReadyToPoll] = useState(false);

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      });
      navigate('/apply/done?success=true', {
        replace: true,
      });
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      });
      navigate('/apply/done?success=false', {
        replace: true,
      });
    },
    enabled: readyToPoll,
  });

  const { mutate, isPending } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true); // 카드신청 polling
    },
    onError: () => {
      window.history.back();
    },
  });

  if (readyToPoll || isPending) {
    return <div>로딩중...</div>;
  }

  return <Apply onSubmit={mutate} />;
}
