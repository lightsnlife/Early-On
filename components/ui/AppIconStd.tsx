import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { palette } from './tokens';


// ─── App icon SVG (heart-leaf) ────────────────────────────────────────────────
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <path d="M100 158 C68 138 34 112 34 82 C34 58 50 44 68 46 C80 47 92 56 100 66
           C108 56 120 47 132 46 C150 44 166 58 166 82 C166 112 132 138 100 158Z"
        fill="#F5B8CF"/>
  <path d="M100 66 Q100 110 100 158" fill="none" stroke="#C8749A" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
  <path d="M100 88  Q82  80  66  72"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 104 Q78  96  58  90"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 120 Q82 114  66 110"  fill="none" stroke="#C8749A" stroke-width="1.6" stroke-linecap="round" opacity="0.35"/>
  <path d="M100 88  Q118  80 134  72"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 104 Q122  96 142  90"  fill="none" stroke="#C8749A" stroke-width="1.8" stroke-linecap="round" opacity="0.40"/>
  <path d="M100 120 Q118 114 134 110"  fill="none" stroke="#C8749A" stroke-width="1.6" stroke-linecap="round" opacity="0.35"/>
</svg>`;


const AppIconStd = () => (
  <View style={styles.appIconStd}>
    <SvgXml xml={ICON_SVG} />
  </View>
);

export default AppIconStd;

const styles = StyleSheet.create({
  appIconStd: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: palette.rose50,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 