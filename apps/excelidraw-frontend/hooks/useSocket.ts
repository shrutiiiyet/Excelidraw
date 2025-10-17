import { IncomingMessage, Shape } from '@repo/types';
import { useEffect, useRef, useCallback } from 'react';
import { WS_URL } from '@/config';

export type CanvasMessage =
  | { type: 'room:join' | 'room:leave'; room: string }
  | {
      type: 'canvas:draw' | 'canvas:update';
      room: string;
      data: Shape;
    }
  | {
      type: 'canvas:erase';
      room: string;
      shapeId: string;
    }
  | { type: 'canvas:clear'; room: string };

export type EventCallback = (message: IncomingMessage) => void;

// singleton WebSocket
let globalSocket: WebSocket | null = null;
let activeRoomId: string | null = null;
let activeConnections = 0;

export const useSocket = ({
  roomId,
  token,
  onMessage,
  onOpen,
  onClose,
}: {
  roomId: string;
  token: string;
  onMessage?: EventCallback;
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const connectingRef = useRef<boolean>(false);
  const retryCount = useRef<number>(0);
  const MAX_RETRIES = 3;
  const componentMountedRef = useRef(true);

  // Store callbacks in refs to avoid dependency issues
  const onMessageRef = useRef(onMessage);
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);

  // Update refs when callbacks change
  useEffect(() => {
    onMessageRef.current = onMessage;
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
  }, [onMessage, onOpen, onClose]);

  // Send a message to the server
  const sendMessage = useCallback((message: CanvasMessage) => {
    const socket = socketRef.current || globalSocket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('Tried to send message when socket is not open:', message);
    }
  }, []);

  // Connection function with retry logic
  const connectWebSocket = useCallback(() => {
    if (!token || connectingRef.current) return;

    // Don't try again if we've hit the limit
    if (retryCount.current >= MAX_RETRIES) {
      console.error(`Failed to connect after ${MAX_RETRIES} attempts.`);
      return;
    }

    // If we already have a global socket for this room, use it
    if (
      globalSocket &&
      globalSocket.readyState === WebSocket.OPEN &&
      activeRoomId === roomId
    ) {
      console.log('Reusing existing WebSocket connection');
      socketRef.current = globalSocket;
      activeConnections++;

      // Join the room if not already joined
      if (activeRoomId === roomId) {
        onOpenRef.current?.();
        return;
      }
    }

    connectingRef.current = true;

    // Close existing socket if different room
    if (
      globalSocket &&
      (globalSocket.readyState === WebSocket.OPEN ||
        globalSocket.readyState === WebSocket.CONNECTING)
    ) {
      if (activeRoomId !== roomId) {
        console.log('Closing existing socket for different room');
        globalSocket.close();
        globalSocket = null;
        activeRoomId = null;
      }
    }

    console.log(
      `Connecting to WebSocket with room: ${roomId} (attempt ${retryCount.current + 1})`,
    );

    try {
      const wsURL = `${WS_URL}?token=${encodeURIComponent(token)}`;
      const socket = new WebSocket(wsURL);
      socketRef.current = socket;
      globalSocket = socket;
      activeConnections++;

      socket.onopen = () => {
        console.log('WebSocket connected successfully');
        connectingRef.current = false;
        retryCount.current = 0;
        activeRoomId = roomId;

        socket.send(JSON.stringify({ type: 'room:join', room: roomId }));
        if (componentMountedRef.current) {
          onOpenRef.current?.();
        }
      };

      socket.onmessage = event => {
        try {
          const message: IncomingMessage = JSON.parse(event.data);
          if (componentMountedRef.current && onMessageRef.current) {
            onMessageRef.current(message);
          }
        } catch (err) {
          console.error('Failed to parse incoming WebSocket message:', err);
        }
      };

      socket.onclose = event => {
        console.log('WebSocket disconnected', event.code, event.reason);
        connectingRef.current = false;

        if (componentMountedRef.current) {
          onCloseRef.current?.();
        }

        // Reset global references
        if (globalSocket === socket) {
          globalSocket = null;
          activeRoomId = null;
        }

        // Only retry on abnormal closures
        if (event.code === 1006 && componentMountedRef.current) {
          retryCount.current++;
          // Exponential backoff
          const delay = Math.min(
            1000 * Math.pow(2, retryCount.current - 1),
            10000,
          );
          console.log(`Will retry in ${delay}ms...`);
          setTimeout(connectWebSocket, delay);
        }
      };

      socket.onerror = err => {
        console.error(
          'WebSocket error:',
          err,
          'ReadyState:',
          socket.readyState,
        );
        connectingRef.current = false;
      };
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
      connectingRef.current = false;
      retryCount.current++;
    }
  }, [token, roomId]);

  // Connect when component mounts
  useEffect(() => {
    componentMountedRef.current = true;

    if (!token) {
      console.error('No token provided. Skipping WebSocket connection.');
      return;
    }

    connectWebSocket();

    return () => {
      componentMountedRef.current = false;
      activeConnections--;

      // Only close the socket if this is the last component using it
      if (activeConnections <= 0) {
        activeConnections = 0;

        if (globalSocket && globalSocket.readyState === WebSocket.OPEN) {
          globalSocket.send(
            JSON.stringify({ type: 'room:leave', room: roomId }),
          );
          globalSocket.close();
          globalSocket = null;
          activeRoomId = null;
        }
      }

      socketRef.current = null;
    };
  }, [connectWebSocket, token]);

  return {
    sendMessage,
    socket: socketRef.current,
    reconnect: connectWebSocket,
  };
};