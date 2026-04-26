import { Button, StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
  onRetry: () => void;
};

export function WebViewErrorFallback({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>페이지를 불러올 수 없습니다</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="다시 시도" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  message: { color: '#666', marginBottom: 24, textAlign: 'center' },
});
