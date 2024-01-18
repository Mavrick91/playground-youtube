'use client';

import { youtube_v3 } from 'googleapis';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useGetComments } from '~/endpoint/useGetComments';

type OrderType = 'relevance' | 'time';
type OrderCommentsContextType = {
  order: OrderType;
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  data?: youtube_v3.Schema$CommentThreadListResponse;
  isFetching: boolean;
};

const OrderCommentsContext = React.createContext<OrderCommentsContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
  initialData: youtube_v3.Schema$CommentThreadListResponse;
  videoId: string;
};

export default function OrderCommentsProvider({ children, initialData, videoId }: Props) {
  const [order, setOrder] = useState<OrderType>('relevance');
  const { data, refetch, isFetching } = useGetComments(videoId, order, initialData);

  const oldOrder = useRef(order);

  useEffect(() => {
    if (oldOrder.current !== order) {
      refetch();
      oldOrder.current = order;
    }
  }, [order, refetch]);

  const value = useMemo(
    () => ({
      order,
      setOrder,
      data,
      isFetching,
    }),
    [data, isFetching, order]
  );

  return <OrderCommentsContext.Provider value={value}>{children}</OrderCommentsContext.Provider>;
}

export const useOrderComments = () => {
  const context = useContext(OrderCommentsContext);
  if (context === undefined) {
    throw new Error('useOrderComments must be used within a OrderCommentsProvider');
  }
  return context;
};
