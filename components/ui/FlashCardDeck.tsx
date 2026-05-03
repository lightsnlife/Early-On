import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { EText } from '@/components/ui/components';
import { cardColors, type CardColorKey } from '@/constants/colors';

let Audio: typeof import('expo-av').Audio | null = null;
try { Audio = require('expo-av').Audio; } catch { /* native module unavailable */ }

// ─── Sizing ──────────────────────────────────────────────────────────────────

const SCREEN_H   = Dimensions.get('window').height;
const CARD_HEIGHT = Math.round(SCREEN_H * 0.41);

// ─── Progress ring ────────────────────────────────────────────────────────────

function ProgressRing({ seen, total, accent }: { seen: number; total: number; accent: string }) {
  const r    = 20;
  const circ = 2 * Math.PI * r;
  const offset = total === 0 ? circ : circ * (1 - seen / total);
  return (
    <View style={{ width: 48, height: 48 }}>
      <Svg width={48} height={48} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={24} cy={24} r={r} fill="none" stroke="#2a2a2a" strokeWidth={4} />
        <Circle cx={24} cy={24} r={r} fill="none" stroke={accent} strokeWidth={4}
          strokeDasharray={[circ, circ]} strokeDashoffset={offset} strokeLinecap="round" />
      </Svg>
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <EText variant="labelSm" style={{ color: accent, lineHeight: 14 }}>{seen}</EText>
        <EText variant="caption"  style={{ color: '#555',  lineHeight: 12 }}>/{total}</EText>
      </View>
    </View>
  );
}

// ─── Sound wave ───────────────────────────────────────────────────────────────

const BAR_SCALES = [0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1, 0.7, 0.4];

function SoundWave({ active, accent }: { active: boolean; accent: string }) {
  const anims = useRef(BAR_SCALES.map(h => new Animated.Value(h))).current;

  useEffect(() => {
    if (active) {
      const loops = anims.map((anim, i) =>
        Animated.loop(Animated.sequence([
          Animated.timing(anim, { toValue: 1.1, duration: 280 + i * 40, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 280 + i * 40, useNativeDriver: true }),
        ]))
      );
      loops.forEach(l => l.start());
      return () => loops.forEach(l => l.stop());
    }
    BAR_SCALES.forEach((h, i) => anims[i].setValue(h));
  }, [active, anims]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, height: 26 }}>
      {anims.map((anim, i) => (
        <Animated.View key={i} style={{
          width: 3, height: 26,
          backgroundColor: active ? accent : '#555',
          borderRadius: 2,
          transform: [{ scaleY: anim }],
        }} />
      ))}
    </View>
  );
}

// ─── Public types ─────────────────────────────────────────────────────────────

export interface FlashCardItem {
  id: string;
  questionLine1: string;
  questionLine2?: string | null;
  answerType: 'text' | 'audio';
  textAnswer?: string;
  audioUri?: string;
}

export interface FlashCardDeckProps {
  cards: FlashCardItem[];
  title: string;
  subtitle?: string;
  color?: CardColorKey;
  onComplete: () => void;
  onCancel: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FlashCardDeck({
  cards, title, subtitle, color = 'lavender', onComplete, onCancel,
}: FlashCardDeckProps) {
  const [index,    setIndex]    = useState(0);
  const [seen,     setSeen]     = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [playing,  setPlaying]  = useState(false);
  const answerAnim = useRef(new Animated.Value(0)).current;
  const soundRef   = useRef<InstanceType<typeof import('expo-av').Audio.Sound> | null>(null);

  const accent = cardColors[color].text;
  const card   = cards[index];
  const allSeen = seen.size === cards.length;

  // Reset reveal state on card change
  useEffect(() => {
    answerAnim.setValue(0);
    setRevealed(false);
  }, [index, answerAnim]);

  // Cleanup sound on unmount
  useEffect(() => () => { soundRef.current?.unloadAsync(); }, []);

  const stopAudio = useCallback(async () => {
    if (!soundRef.current) return;
    await soundRef.current.stopAsync().catch(() => {});
    await soundRef.current.unloadAsync().catch(() => {});
    soundRef.current = null;
    setPlaying(false);
  }, []);

  const reveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    setSeen(prev => new Set([...prev, cards[index].id]));
    Animated.timing(answerAnim, { toValue: 1, duration: 280, useNativeDriver: true }).start();
  }, [revealed, answerAnim, cards, index]);

  const navigate = useCallback(async (dir: 1 | -1) => {
    const next = index + dir;
    if (next < 0 || next >= cards.length) return;
    await stopAudio();
    setIndex(next);
  }, [index, cards.length, stopAudio]);

  const playAudio = useCallback(async () => {
    if (!card.audioUri || playing || !Audio) return;
    try {
      setPlaying(true);
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync({ uri: card.audioUri });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          soundRef.current = null;
          setPlaying(false);
        }
      });
      await sound.playAsync();
    } catch { setPlaying(false); }
  }, [card.audioUri, playing]);

  if (!card) return null;

  const answerReveal = {
    opacity: answerAnim,
    transform: [{ translateY: answerAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
  };

  return (
    <SafeAreaView style={styles.safe}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable onPress={onCancel} style={styles.backBtn} hitSlop={12}>
          <EText variant="h2" style={styles.backArrow}>←</EText>
        </Pressable>
        <View style={styles.headerText}>
          <EText variant="h4" style={styles.headerTitle}>{title}</EText>
          {subtitle && (
            <EText variant="bodySm" style={styles.headerSubtitle}>{subtitle}</EText>
          )}
        </View>
        <ProgressRing seen={seen.size} total={cards.length} accent={accent} />
      </View>

      {/* ── Counter ── */}
      <EText variant="caption" style={styles.counter}>
        {index + 1} of {cards.length}
      </EText>

      {/* ── Card stack ── */}
      <View style={styles.stackWrapper}>
        <View style={[styles.ghostCard, styles.ghost2]} />
        <View style={[styles.ghostCard, styles.ghost1]} />

        <Pressable
          onPress={reveal}
          style={[styles.mainCard, revealed && styles.mainCardRevealed]}
        >
          {/* Badge row */}
          {/*<View style={styles.badgeRow}>
            <View style={[styles.badge,
              card.answerType === 'audio' ? styles.badgeAudio : styles.badgeText]}>
              <EText variant="caption"
                style={card.answerType === 'audio' ? styles.badgeAudioLabel : styles.badgeTextLabel}>
                {card.answerType === 'audio' ? '♪  Sound' : '◆  Text'}
              </EText>
            </View>
            {seen.has(card.id) && (
              <EText variant="caption" style={styles.seenTag}>✓ seen</EText>
            )}
          </View> */}

          {/* Question */}
          <View style={styles.questionArea}>
            <EText variant="bodySm" style={styles.questionLine1}>{card.questionLine1}</EText>
            {card.questionLine2 && (
              <EText align="center" style={styles.questionLine2}>{card.questionLine2}</EText>
            )}
          </View>

          {/* Tap hint / revealed answer */}
          {!revealed ? (
            <View style={styles.tapHintRow}>
              <EText variant="bodySm" style={styles.tapHint}>⬦  tap to reveal</EText>
            </View>
          ) : (
            <Animated.View style={[styles.answerArea, answerReveal]}>
              <EText variant="label" uppercase style={[styles.answerLabel, { color: accent }]}>
                Answer
              </EText>
              {card.answerType === 'text' ? (
                <EText variant="bodyLg" style={styles.answerText}>{card.textAnswer}</EText>
              ) : (
                <Pressable
                  onPress={playAudio}
                  disabled={playing || !Audio}
                  style={[styles.audioBtn, playing && styles.audioBtnPlaying,
                    { borderColor: accent + '44' }]}
                >
                  <SoundWave active={playing} accent={accent} />
                  <EText variant="bodySm" style={[styles.audioLabel, { color: accent }]}>
                    {playing ? 'Playing…' : 'Play pronunciation'}
                  </EText>
                </Pressable>
              )}
            </Animated.View>
          )}
        </Pressable>
      </View>

      {/* ── Dot indicators ── */}
      <View style={styles.dots}>
        {cards.map((c, i) => (
          <View key={i} style={[styles.dot, {
            width: i === index ? 20 : 6,
            backgroundColor: seen.has(c.id) ? accent : (i === index ? '#555' : '#2a2a2a'),
          }]} />
        ))}
      </View>

      {/* ── Navigation buttons ── */}
      <View style={styles.navRow}>
        <Pressable
          onPress={() => navigate(-1)}
          disabled={index === 0}
          style={[styles.navBtn, index === 0 && styles.navBtnOff]}
        >
          <EText variant="h2" style={index === 0 ? styles.navArrowOff : styles.navArrow}>←</EText>
        </Pressable>
        <Pressable
          onPress={() => navigate(1)}
          disabled={index === cards.length - 1}
          style={[styles.navBtn, index === cards.length - 1 && styles.navBtnOff,
            allSeen && index === cards.length - 1 && styles.navBtnDone]}
          onPressIn={allSeen && index === cards.length - 1 ? onComplete : undefined}
        >
          {allSeen && index === cards.length - 1 ? (
            <EText variant="h4" style={[styles.navArrow, { color: accent }]}>✓</EText>
          ) : (
            <EText variant="h2"
              style={index === cards.length - 1 ? styles.navArrowOff : styles.navArrow}>→</EText>
          )}
        </Pressable>
      </View>

      {/* ── Stats bar ── */}
      <View style={styles.statsBar}>
        {([
          { label: 'Revealed',  value: String(seen.size),                                color: accent    },
          { label: 'Remaining', value: String(cards.length - seen.size),                 color: '#555'    },
          { label: 'Progress',  value: `${Math.round((seen.size / cards.length) * 100)}%`, color: '#6ab878' },
        ] as const).map(({ label, value, color: c }) => (
          <View key={label} style={styles.statItem}>
            <EText variant="h4" style={[styles.statValue, { color: c }]}>{value}</EText>
            <EText variant="caption" style={styles.statLabel}>{label}</EText>
          </View>
        ))}
      </View>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#111',
    paddingHorizontal: 24,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 12,
    paddingBottom: 4,
  },
  backBtn: {
    padding: 4,
  },
  backArrow: {
    color: '#ccc',
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    color: '#fff',
  },
  headerSubtitle: {
    color: '#555',
  },

  counter: {
    color: '#444',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 14,
  },

  // ── Card stack ──
  stackWrapper: {
    height: CARD_HEIGHT + 20,
    position: 'relative',
    marginBottom: 20,
  },
  ghostCard: {
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  ghost2: {
    top: 14, left: 8, right: 8,
    height: CARD_HEIGHT,
    backgroundColor: '#1a1a1a',
  },
  ghost1: {
    top: 7, left: 4, right: 4,
    height: CARD_HEIGHT,
    backgroundColor: '#202020',
  },
  mainCard: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: CARD_HEIGHT,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    padding: 24,
    justifyContent: 'space-between',
  },
  mainCardRevealed: {
    backgroundColor: '#1c1c18',
    borderColor: '#3a3820',
  },

  // ── Badges ──
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeAudio:     { backgroundColor: 'rgba(240,192,96,0.12)', borderColor: 'rgba(240,192,96,0.2)' },
  badgeText:      { backgroundColor: 'rgba(100,180,120,0.12)', borderColor: 'rgba(106,184,120,0.2)' },
  badgeAudioLabel: { color: '#f0c060', letterSpacing: 1 },
  badgeTextLabel:  { color: '#6ab878', letterSpacing: 1 },
  seenTag: { color: '#3a3a3a' },

  // ── Question ──
  questionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  questionLine1: { color: '#666', letterSpacing: 0.5, textAlign: 'center', marginBottom: 20 },
  questionLine2: { color: '#f5f5f0', fontSize: 96, fontWeight: '700', lineHeight: 112, textAlign: 'center' },

  // ── Tap hint ──
  tapHintRow: {
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 14,
    alignItems: 'center',
  },
  tapHint: { color: '#3a3a3a', letterSpacing: 1 },

  // ── Answer ──
  answerArea: {
    borderTopWidth: 1,
    borderTopColor: '#2e2c1a',
    paddingTop: 14,
  },
  answerLabel: { letterSpacing: 2, marginBottom: 8 },
  answerText:  { color: '#e8e0c8', lineHeight: 24 },
  audioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(240,192,96,0.07)',
  },
  audioBtnPlaying: { backgroundColor: 'rgba(240,192,96,0.15)' },
  audioLabel: { flex: 1, letterSpacing: 0.5 },

  // ── Navigation ──
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 14,
  },
  dot: { height: 6, borderRadius: 3 },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 16,
  },
  navBtn: {
    width: 64, height: 64,
    borderRadius: 32,
    backgroundColor: '#242424',
    borderWidth: 1.5,
    borderColor: '#3c3c3c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnOff:  { backgroundColor: '#181818', borderColor: '#252525' },
  navBtnDone: { backgroundColor: '#1c2a1c', borderColor: '#3a5a3a' },
  navArrow:    { color: '#e0e0e0' },
  navArrowOff: { color: '#2e2e2e' },

  // ── Stats bar ──
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#161616',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  statItem:  { alignItems: 'center' },
  statValue: { lineHeight: 22 },
  statLabel: { color: '#444', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
});
