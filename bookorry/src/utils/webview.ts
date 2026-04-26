import { WebViewMessage } from '@/types/webview';

export function isAllowedDomain(url: string, allowedDomains: string[]): boolean {
  try {
    const { hostname } = new URL(url);
    return allowedDomains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

export function parseWebViewMessage(data: string): WebViewMessage | null {
  try {
    const parsed = JSON.parse(data) as WebViewMessage;
    if (typeof parsed.type === 'string') return parsed;
    return null;
  } catch {
    return null;
  }
}
