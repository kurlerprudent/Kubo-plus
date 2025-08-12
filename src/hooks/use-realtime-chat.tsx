'use client'

import { useCallback, useEffect, useState } from 'react'

interface UseRealtimeChatProps {
  roomName: string
  username: string
}

export interface ChatMessage {
  id: string
  content: string
  user: {
    name: string
  }
  createdAt: string
}

const EVENT_MESSAGE_TYPE = 'message'

export function useRealtimeChat({ roomName, username }: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  // BroadcastChannel provides simple cross-tab messaging without Supabase.
  const [channel, setChannel] = useState<BroadcastChannel | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Use BroadcastChannel for lightweight realtime across browser tabs.
    const bc = typeof window !== 'undefined' && 'BroadcastChannel' in window
      ? new BroadcastChannel(roomName)
      : null

    if (bc) {
      const onMessage = (event: MessageEvent) => {
        try {
          const data = event.data as ChatMessage
          if (data && typeof data.id === 'string') {
            setMessages((current) => [...current, data])
          }
        } catch {
          // ignore malformed messages
        }
      }
      bc.addEventListener('message', onMessage)
      setChannel(bc)
      setIsConnected(true)

      return () => {
        bc.removeEventListener('message', onMessage)
        bc.close()
      }
    } else {
      // Fallback to local-only chat (no cross-tab comms)
      setIsConnected(true)
      setChannel(null)
      return () => {}
    }
  }, [roomName])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        user: {
          name: username,
        },
        createdAt: new Date().toISOString(),
      }

      // Update local state immediately for the sender
      setMessages((current) => [...current, message])

      // Broadcast to other tabs/windows (if channel available)
      try {
        channel.postMessage(message)
      } catch {
        // no-op if channel not available
      }
    },
    [channel, isConnected, username]
  )

  return { messages, sendMessage, isConnected }
}
