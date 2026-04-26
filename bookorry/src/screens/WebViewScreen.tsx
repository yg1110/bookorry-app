import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WebViewContainer } from '@/components/webview/WebViewContainer';
import { ALLOWED_DOMAINS } from '@/constants/urls';
import { RootStackParamList } from '@/navigation/RootNavigator';

type WebViewScreenRouteProp = RouteProp<RootStackParamList, 'WebView'>;

export function WebViewScreen() {
  const route = useRoute<WebViewScreenRouteProp>();
  const { uri } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainer config={{ uri, allowedDomains: ALLOWED_DOMAINS }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
