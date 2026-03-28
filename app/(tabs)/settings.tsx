import { Text, View } from 'react-native';
import { createSettingsStyles } from '@/assets/styles/Settings.styles';
import useTheme from '@/hooks/useTheme';

const Settings = () => {
  const { colors } = useTheme();
  const settingStyle = createSettingsStyles(colors);

  return (
    <View style={settingStyle.safeArea}>
      <Text>this is Settings Screen</Text>
    </View>
  );
};

export default Settings;