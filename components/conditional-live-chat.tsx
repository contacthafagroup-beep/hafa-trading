'use client';

import { usePathname } from 'next/navigation';
import LiveChatWidget from './live-chat-widget';

export default function ConditionalLiveChat() {
  const pathname = usePathname();
  
  // Don't show live chat on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <LiveChatWidget />;
}