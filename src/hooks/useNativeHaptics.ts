import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function useNativeHaptics() {
  const isNative = Capacitor.isNativePlatform();

  const triggerImpact = async (style: ImpactStyle = ImpactStyle.Light) => {
    if (!isNative) return;
    try {
      await Haptics.impact({ style });
    } catch (e) {
      console.error('Haptics failed:', e);
    }
  };

  const triggerSuccess = async () => {
    if (!isNative) return;
    try {
      await Haptics.notification({ type: 'SUCCESS' as any });
    } catch (e) {
      console.error('Haptics failed:', e);
    }
  };

  const triggerError = async () => {
    if (!isNative) return;
    try {
      await Haptics.notification({ type: 'ERROR' as any });
    } catch (e) {
      console.error('Haptics failed:', e);
    }
  };

  const triggerSelection = async () => {
    if (!isNative) return;
    try {
      await Haptics.selectionStart();
      await Haptics.selectionChanged();
      await Haptics.selectionEnd();
    } catch (e) {
      console.error('Haptics failed:', e);
    }
  };

  return {
    isNative,
    triggerImpact,
    triggerSuccess,
    triggerError,
    triggerSelection
  };
}
