import { useSuspenseQuery } from '@tanstack/react-query';

import { getAppliedCard } from '@/remote/apply';
import { useEffect } from 'react';
import { ApplyValues } from '@/models/apply';

export default function useAppliedCard({
  userId,
  cardId,
  onSuccess,
  onError,
}: {
  userId: string;
  cardId: string;
  onSuccess: (data: ApplyValues | null) => void;
  onError: () => void;
}) {
  const { data, isError, isSuccess } = useSuspenseQuery({
    queryKey: ['applied'],
    queryFn: () => getAppliedCard({ userId, cardId }),
  });

  useEffect(() => {
    if (isError) {
      onError();
    }

    if (isSuccess) {
      onSuccess(data);
    }
  }, [data, isError, isSuccess, onError, onSuccess]);

  return { data };
}
