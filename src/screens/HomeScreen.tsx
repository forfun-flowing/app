import React, { useEffect, useRef } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPermissions } from '@/utils/getPermissions';
import { BASE_URL } from '@/constants';
import { useDidMount } from '@/hooks/useDidMount';

export default function HomeScreen() {
  const webviewRef = useRef<WebView>(null);

  const handleMessage = async ({ nativeEvent }: WebViewMessageEvent) => {
    const { type, payload } = JSON.parse(nativeEvent.data);

    switch (type) {
      case 'PERMISSION': {
        await getPermissions('camera');
        await getPermissions('photoLibrary');
        await getPermissions('location');
        break;
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <WebView
        style={{
          flex: 1,
        }}
        source={{ uri: BASE_URL }}
        ref={webviewRef}
        onMessage={handleMessage}
        originWhitelist={['*']}
        allowsBackForwardNavigationGestures
        javaScriptEnabled
        geolocationEnabled
      />
    </SafeAreaView>
  );
}
