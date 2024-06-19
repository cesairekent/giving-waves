// useBroadcastChannelSync.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSharedState } from '../store';

const channel = new BroadcastChannel('sharedChannel');

export const useBroadcastChannelSync = () => {
  const dispatch = useAppDispatch();
  const sharedState = useAppSelector((state) => state.app.sharedState);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      dispatch(setSharedState(event.data));
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    channel.postMessage(sharedState);
  }, [sharedState]);
};
