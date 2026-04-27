import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ECard, EChip, EText, CategoryCard } from '@/components/ui/components';
import Button from '@/components/ui/Button';
import { palette } from '@/components/ui/tokens';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.brand}>
            early<Text style={styles.brandAccent}>on</Text>
          </Text>
        </View>

        {/* Greeting */}
        <View style={styles.greetingRow}>
          <EText variant="h2" style={styles.greeting}>
            Hello, {firstName}! 👋
          </EText>
          <EText variant="bodyLg" color={palette.mid} style={styles.greetingSub}>
            {user?.email}
          </EText>
        </View>

        {/* Age chips */}
        <View style={styles.chipRow}>
          <EChip label="Newborn" color="lavender" />
          <EChip label="Toddler" color="mint" />
          <EChip label="School age" color="butter" />
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
        <View style={styles.categoryGrid}>
          <CategoryCard
            icon="🍼"
            name="Feeding"
            subtitle="Nutrition & schedules"
            color="rose"
          />
          <CategoryCard
            icon="😴"
            name="Sleep"
            subtitle="Routines & tracking"
            color="lavender"
          />
        </View>
        <View style={styles.categoryGrid}>
          <CategoryCard
            icon="🌱"
            name="Development"
            subtitle="Milestones & activities"
            color="mint"
          />
          <CategoryCard
            icon="❤️"
            name="Wellbeing"
            subtitle="Health & safety"
            color="peach"
          />
        </View>

        {/* Sign out */}
        <View style={styles.signOutRow}>
          <Button label="Sign Out" variant="ghost" onPress={signOut} />
        </View>
      </ScrollView>
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
  topBar: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  brand: {
    fontSize: 26,
    fontFamily: 'Nunito-Black',
    color: palette.dark,
    letterSpacing: -0.3,
  },
  brandAccent: {
    color: palette.rose500,
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
  signOutRow: {
    marginTop: 32,
  },
});
