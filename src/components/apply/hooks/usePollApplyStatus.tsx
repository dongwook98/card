import { APPLY_STATUS } from '@/models/apply';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface usePollApplyStatusProps {
  enabled: boolean;
  onSuccess: () => void;
  onError: () => void;
}

export default function usePollApplyStatus({
  enabled,
  onSuccess,
  onError,
}: usePollApplyStatusProps) {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['applyStatus'],
    queryFn: () => getApplyStatus(),
    enabled: enabled,
    refetchInterval: 2_000,
    staleTime: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }

    if (isError) {
      onError();
    }
  }, [isError, isSuccess, onError, onSuccess]);

  return { data };
}

// 카드사에서 카드 발급 신청해주는 api mocking
function getApplyStatus() {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ];

  const status = values[Math.floor(Math.random() * values.length)];

  if (status === APPLY_STATUS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.');
  }

  return status;
}
