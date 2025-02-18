import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { flatten } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import ListRow from '@shared/ListRow';
import { getCards } from '@/remote/card';
import { Card } from '@/models/card';

export default function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<Card | DocumentData> | undefined;
    }) => {
      return getCards(pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => {
      console.log('🚀 ~ CardList ~ snapshot:', snapshot);
      return snapshot.lastVisible;
    },
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  if (data == null) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<div style={{ height: '200px' }}>로딩..</div>}
        next={loadMore}
        scrollThreshold='200px'
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback != null ? <div>{card.payback}</div> : null}
                withArrow
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
