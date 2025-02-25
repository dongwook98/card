import Apply from '@components/apply';
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation';
import { useState } from 'react';
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus';
import { updateApplyCard } from '@/remote/apply';
import useUser from '@/hooks/auth/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import { APPLY_STATUS, ApplyValues } from '@/models/apply';
import useAppliedCard from '@/components/apply/hooks/useAppliedCard';
import { useAlertContext } from '@/contexts/AlertContext';

export default function ApplyPage() {
  const user = useUser();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const [readyToPoll, setReadyToPoll] = useState(false);
  const { open } = useAlertContext();

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    onSuccess: (data: ApplyValues | null) => {
      if (data == null) {
        return;
      }

      if (data.status === APPLY_STATUS.COMPLETE) {
        open({
          title: '이미 발급 완료된 카드입니다.',
          onButtonClick: () => {
            window.history.back();
          },
        });
        return;
      }

      // APPLY_STATUS가 COMPLETE이 아닌 경우, 카드사로 재심사 요청
      setReadyToPoll(true);
    },
    onError: () => {},
  });

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
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
      setReadyToPoll(true); // 카드사 신청 polling 요청 관리하는 state
    },
    onError: () => {
      window.history.back();
    },
  });

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null;
  }

  if (readyToPoll || isPending) {
    return <div>로딩중...</div>;
  }

  return <Apply onSubmit={mutate} />;
}
