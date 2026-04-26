import { useRef, useState, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { WebViewMessage, WebViewStatus } from '@/types/webview';
import { isAllowedDomain, parseWebViewMessage } from '@/utils/webview';
import { ALLOWED_DOMAINS } from '@/constants/urls';

type UseWebViewOptions = {
  allowedDomains?: string[];
  onMessage?: (message: WebViewMessage) => void;
};

export function useWebView({
  allowedDomains = ALLOWED_DOMAINS,
  onMessage,
}: UseWebViewOptions = {}) {
  const webViewRef = useRef<WebView>(null);
  const canGoBackRef = useRef(false);
  const [status, setStatus] = useState<WebViewStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleLoadStart = useCallback(() => {
    setStatus('loading');
    setError(null);
  }, []);

  const handleLoadEnd = useCallback(() => setStatus('ready'), []);

  const handleError = useCallback((msg: string) => {
    setStatus('error');
    setError(msg);
  }, []);

  const handleNavigationStateChange = useCallback((navState: { canGoBack: boolean }) => {
    canGoBackRef.current = navState.canGoBack;
  }, []);

  const handleMessage = useCallback(
    (data: string) => {
      const message = parseWebViewMessage(data);
      if (message) onMessage?.(message);
    },
    [onMessage],
  );

  const checkDomain = useCallback(
    (url: string) => isAllowedDomain(url, allowedDomains),
    [allowedDomains],
  );

  const injectJS = useCallback((script: string) => {
    webViewRef.current?.injectJavaScript(`(function(){${script}})();true;`);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        if (canGoBackRef.current) {
          webViewRef.current?.goBack();
          return true;
        }
        return false;
      });
      return () => subscription.remove();
    }, []),
  );

  return {
    webViewRef,
    status,
    error,
    handleLoadStart,
    handleLoadEnd,
    handleError,
    handleNavigationStateChange,
    handleMessage,
    checkDomain,
    injectJS,
  };
}
