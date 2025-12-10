'use client';

import { usePathname } from 'next/navigation';
import EnhancedChatBox from './chat/enhanced-chat-box';

export default function ConditionalEnhancedChat() {
  const pathname = usePathname();
  
  // Don't show chat on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <EnhancedChatBox />;
}