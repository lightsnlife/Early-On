import React, { useCallback, useRef, useState } from 'react';
import { Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { ECard, EChip, EText, CategoryCard } from '@/components/ui/components';
import { palette } from '@/components/ui/tokens';
import { useAuth } from '@/contexts/AuthContext';
import TopBar from '@/components/ui/TopBar';
import { fetchChildren, type Child } from '@/lib/children';
import HOME_CARDS from '@/constants/homeCards';
import { childColors } from '@/constants/colors';
import { ageInYears, matchesAgeGroup } from '@/lib/ageUtils';

const DRAWER_WIDTH = 270;

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  useFocusEffect(
    useCallback(() => {
      if (!user?.id) return;
      fetchChildren(user.id).then((data) => {
        setChildren(data);
        setSelectedChildId((prev) => prev ?? data[0]?.id ?? null);
      }).catch(() => {});
    }, [user?.id]),
  );

  const selectedChild = children.find(c => c.id === selectedChildId);
  const visibleCards = selectedChild
    ? HOME_CARDS.filter(card => matchesAgeGroup(card.ageGroup, ageInYears(selectedChild.DoB)))
    : HOME_CARDS;

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    Animated.parallel([
      Animated.timing(translateX, { toValue: 0, duration: 260, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 1, duration: 260, useNativeDriver: true }),
    ]).start();
  }, [translateX, overlayOpacity]);

  const closeMenu = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateX, { toValue: -DRAWER_WIDTH, duration: 220, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) setMenuOpen(false);
    });
  }, [translateX, overlayOpacity]);

  const drawerAnimStyle = { transform: [{ translateX }] };
  const overlayAnimStyle = { opacity: overlayOpacity };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TopBar onMenuPress={openMenu} />

        {/* Greeting */}
        <View style={styles.greetingRow}>
          <EText variant="h2" style={styles.greeting}>
            Hello, {firstName}! 👋
          </EText>
          <EText variant="bodyLg" color={palette.mid} style={styles.greetingSub}>
            {user?.email}
          </EText>
        </View>

        {/* Children chips */}
        <View style={styles.chipRow}>
          {children.map((child) => (
            <EChip
                key={child.id}
                label={child.fName}
                bgColor={childColors[child.color]?.bg}
                textColor={childColors[child.color]?.text}
                selected={selectedChildId === child.id}
                onPress={() => setSelectedChildId(child.id)}
              />
          ))}
          {children.length < 3 && (
            <EChip
              label="+ Add a child"
              color="rose"
              onPress={() => router.push('/(app)/add-child')}
            />
          )}
        </View>

        {/* Dashboard placeholder card */}
        <ECard style={styles.dashCard}>
          <EText variant="h4" style={{ marginBottom: 8 }}>
            Your dashboard is on its way
          </EText>
          <EText variant="body" color={palette.mid} style={{ lineHeight: 22 }}>
            Features and modules will appear here as they are added to the project.
          </EText>
        </ECard>

        {/* Category grid */}
        <EText variant="h3" style={styles.sectionTitle}>Explore</EText>
        {chunk(visibleCards, 2).map((row, rowIdx) => (
          <View key={rowIdx} style={styles.categoryGrid}>
            {row.map((card) => (
              <CategoryCard
                key={card.name}
                icon={card.emoji}
                name={card.name}
                subtitle={card.subText}
                color={card.color}
                onPress={card.route ? () => router.push({ pathname: card.route as any, params: { childId: selectedChildId ?? '' } }) : undefined}
              />
            ))}
            {row.length === 1 && <View style={{ flex: 1 }} />}
          </View>
        ))}
      </ScrollView>

      {/* Slide-in drawer menu */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, overlayAnimStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
        </Animated.View>
        <Animated.View style={[styles.drawer, { paddingTop: insets.top + 24 }, drawerAnimStyle]}>
          <Text style={styles.drawerTitle}>Menu</Text>
          <Pressable
            style={styles.menuItem}
            onPress={() => { closeMenu(); signOut(); }}
          >
            <Text style={styles.menuItemText}>Sign Out</Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.pageBg,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  greetingRow: {
    marginTop: 28,
    marginBottom: 16,
    gap: 4,
  },
  greeting: {
    letterSpacing: -0.3,
  },
  greetingSub: {
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dashCard: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  categoryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: palette.white,
    paddingHorizontal: 24,
    shadowColor: palette.dark,
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 16,
  },
  drawerTitle: {
    fontSize: 13,
    fontFamily: 'NunitoSans-SemiBold',
    color: palette.soft,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  menuItem: {
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.border,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'NunitoSans-SemiBold',
    color: palette.dark,
  },
});
