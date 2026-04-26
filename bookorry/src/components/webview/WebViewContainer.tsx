import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { useWebView } from '@/hooks/useWebView';
import { WebViewConfig, WebViewMessage } from '@/types/webview';
import { WebViewErrorFallback } from './WebViewErrorFallback';
import { WebViewLoadingIndicator } from './WebViewLoadingIndicator';

type Props = {
  config: WebViewConfig;
  onMessage?: (message: WebViewMessage) => void;
};

export function WebViewContainer({ config, onMessage }: Props) {
  const { uri, headers, injectedJS, allowedDomains } = config;
  const {
    webViewRef,
    status,
    error,
    handleLoadStart,
    handleLoadEnd,
    handleError,
    handleNavigationStateChange,
    handleMessage,
    checkDomain,
  } = useWebView({ allowedDomains, onMessage });

  const handleShouldStartLoad = useCallback(
    (request: ShouldStartLoadRequest) => {
      if (!checkDomain(request.url)) {
        handleError(`허용되지 않은 도메인: ${request.url}`);
        return false;
      }
      return true;
    },
    [checkDomain, handleError],
  );

  const handleRetry = useCallback(() => {
    webViewRef.current?.reload();
  }, [webViewRef]);

  if (status === 'error') {
    return (
      <WebViewErrorFallback
        message={error ?? '알 수 없는 오류가 발생했습니다.'}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{ uri, headers }}
        injectedJavaScript={injectedJS}
        style={styles.webView}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={e => handleError(e.nativeEvent.description)}
        onHttpError={e => handleError(`HTTP ${e.nativeEvent.statusCode}`)}
        onMessage={e => handleMessage(e.nativeEvent.data)}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        javaScriptEnabled
      />
      {status === 'loading' && <WebViewLoadingIndicator />}
    </>
  );
}

const styles = StyleSheet.create({
  webView: { flex: 1 },
});
