export type WebViewConfig = {
  uri: string;
  headers?: Record<string, string>;
  injectedJS?: string;
  allowedDomains?: string[];
};

export type WebViewMessage = {
  type: string;
  payload: unknown;
};

export type WebViewStatus = 'idle' | 'loading' | 'error' | 'ready';
