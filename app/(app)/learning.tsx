import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { ECard, EChip, EText } from '@/components/ui/components';
import { cardColors, type CardColorKey } from '@/constants/colors';
import { palette } from '@/components/ui/tokens';
import { useAuth } from '@/contexts/AuthContext';
import { fetchChildren, type Child } from '@/lib/children';
import EmojiIcon from '@/components/ui/EmojiIcon';
import { getMenuIcon } from '@/constants/iconRegistry';
import LEARNING_CARDS, { type LearningCard } from '@/constants/learningCards';
import { ageInYears, formatAge, matchesAgeGroup } from '@/lib/ageUtils';
import FlashCardDeck, { type FlashCardItem } from '@/components/ui/FlashCardDeck';
import READING_CONTENT, { type ReadingContent } from '@/constants/readingContent';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeckCards(content: ReadingContent): FlashCardItem[] {
  const qa = content.ordered ? content.qna : shuffle(content.qna);
  return qa.map(([questionLine1, questionLine2, answer, answerType], i) => ({
    id: String(i),
    questionLine1,
    questionLine2,
    answerType,
    textAnswer: answerType === 'text' ? answer : undefined,
    audioUri:   answerType === 'audio' ? answer : undefined,
  }));
}

// Maps a learning card name to its content source and starting level.
function resolveContent(cardName: string): { content: ReadingContent; level: number } | null {
  if (cardName === 'Alphabets and Reading') {
    const content = READING_CONTENT.find(r => r.level === 1);
    return content ? { content, level: 1 } : null;
  }
  return null;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

interface DeckState {
  cards: FlashCardItem[];
  title: string;
  color: CardColorKey;
}

export default function LearningScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { childId } = useLocalSearchParams<{ childId: string }>();
  const [child, setChild] = useState<Child | null>(null);
  const [deck, setDeck] = useState<DeckState | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!user?.id) return;
      fetchChildren(user.id).then((data) => {
        setChild(data.find(c => c.id === childId) ?? data[0] ?? null);
      }).catch(() => {});
    }, [user?.id, childId]),
  );

  const openDeck = useCallback((card: LearningCard) => {
    const resolved = resolveContent(card.name);
    if (!resolved) return;
    setDeck({
      cards: buildDeckCards(resolved.content),
      title: card.name,
      color: card.color,
    });
  }, []);

  const closeDeck = useCallback(() => setDeck(null), []);

  const visibleCards = child
    ? LEARNING_CARDS.filter(card => matchesAgeGroup(card.ageGroup, ageInYears(child.DoB)))
    : LEARNING_CARDS;

  if (deck) {
    return (
      <FlashCardDeck
        cards={deck.cards}
        title={deck.title}
        subtitle={child ? `${child.fName} · ${formatAge(child.DoB)}` : undefined}
        color={deck.color}
        onComplete={closeDeck}
        onCancel={closeDeck}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
            <EText variant="h2">←</EText>
          </Pressable>
          <View style={styles.headerText}>
            <EText variant="h2" style={styles.title}>Learning</EText>
            {child && (
              <EText variant="bodySm" color={palette.mid}>
                {child.fName} · {formatAge(child.DoB)}
              </EText>
            )}
          </View>
        </View>

        {/* Continue where you left off — placeholder */}
        <ECard style={styles.continueCard}>
          <EText variant="label" color={palette.mid} uppercase>Continue where you left off</EText>
          <EText variant="h4" style={{ marginTop: 6 }}>Coming soon</EText>
          <EText variant="bodySm" color={palette.soft} style={{ marginTop: 4 }}>
            Your progress will appear here once you start an activity.
          </EText>
        </ECard>

        {/* Category grid */}
        <EText variant="label" uppercase color={palette.soft} style={styles.sectionLabel}>
          By Category
        </EText>

        {chunk(visibleCards, 2).map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((card) => {
              const { bg, chipBg, text } = cardColors[card.color];
              const hasContent = resolveContent(card.name) !== null;
              return (
                <Pressable
                  key={card.name}
                  style={({ pressed }) => [
                    styles.card,
                    { backgroundColor: bg },
                    pressed && hasContent && { opacity: 0.75 },
                  ]}
                  onPress={() => openDeck(card)}
                  disabled={!hasContent}
                >
                  <EmojiIcon emoji={getMenuIcon(card.emoji)} size={28} />
                  <EText variant="h4" style={styles.cardName}>{card.name}</EText>
                  <EText variant="bodySm" color={palette.mid} style={styles.cardSub}>
                    {card.subText}
                  </EText>
                  <View style={styles.tagRow}>
                    {card.tags.map((tag) => (
                      <EChip key={tag} label={tag} bgColor={chipBg} textColor={text} size="sm" />
                    ))}
                  </View>
                </Pressable>
              );
            })}
            {row.length === 1 && <View style={{ flex: 1 }} />}
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.pageBg,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 12,
    paddingBottom: 24,
  },
  backBtn: {
    padding: 4,
  },
  headerText: {
    gap: 2,
  },
  title: {
    letterSpacing: -0.3,
  },
  continueCard: {
    marginBottom: 28,
  },
  sectionLabel: {
    letterSpacing: 1,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  cardName: {
    marginTop: 10,
    marginBottom: 4,
  },
  cardSub: {
    lineHeight: 18,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
});
