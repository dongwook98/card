import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { flatten } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import ListRow from '@shared/ListRow';
import Badge from '@shared/Badge';
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
      return snapshot.lastVisible;
    },
  });

  const navigate = useNavigate();

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
        dataLength={cards.length}
        hasMore={hasNextPage}
        style={{ overflow: 'hidden' }}
        loader={<>Loading...</>}
        next={loadMore}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>끝!</b>
          </p>
        }
        scrollThreshold={'100px'}
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
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow
                onClick={() => navigate(`/card/${card.id}`)}
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
