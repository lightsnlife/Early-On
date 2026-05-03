/**
 * Icon Registry
 *
 * Maps DB `iconEmoji` keys to emoji characters.
 * Store the key (e.g. "feeding") or a raw emoji (e.g. "🍼") in the DB column —
 * both are handled. Unknown keys fall back to rendering the raw value as-is.
 *
 * ─── Child & Parenting ──────────────────────────────────────────────────────
 *  baby           👶
 *  milk           🥛
 *  feeding        🍴
 *  babybottle     🍼
 *  utensils       🥄
 *  footprints     👣
 *
 * ─── Health & Wellbeing ─────────────────────────────────────────────────────
 *  wellbeing      ❤️
 *  heartpulse     💓
 *  hearthandshake 🤝
 *  stethoscope    🩺
 *  thermometer    🌡️
 *  pill           💊
 *  syringe        💉
 *  medicalkit     🧳
 *  bandage        🩹
 *  shieldcheck    🛡️
 *  activity       📈
 *
 * ─── Sleep & Rest ───────────────────────────────────────────────────────────
 *  sleep          🌙
 *  moonstar       🌟
 *  cloudmoon      ☁️
 *  bed            🛏️
 *  star           ⭐
 *
 * ─── Food & Nutrition ───────────────────────────────────────────────────────
 *  apple          🍎
 *  cookie         🍪
 *  salad          🥗
 *  cookingpot     🍲
 *  carrot         🥕
 *
 * ─── Learning & Education ───────────────────────────────────────────────────
 *  learning       📖
 *  book           📚
 *  graduationcap  🎓
 *  pencil         ✏️
 *  puzzle         🧩
 *  palette        🎨
 *  music          🎵
 *  headphones     🎧
 *  numbers        🔢
 *  abacus         🧮
 *  math           ➕
 *
 * ─── Growth & Development ───────────────────────────────────────────────────
 *  development    🌱
 *  trendingup     📈
 *  trophy         🏆
 *  medal          🥇
 *  target         🎯
 *  award          🏅
 *  milestone      🪧
 *
 * ─── Family & Home ──────────────────────────────────────────────────────────
 *  home           🏠
 *  homeheart      🏡
 *  family         👨‍👩‍👧
 *  user           👤
 *  handheart      🤲
 *
 * ─── Safety ─────────────────────────────────────────────────────────────────
 *  safety         🛡️
 *  eye            👁️
 *  lock           🔐
 *
 * ─── Play & Activities ──────────────────────────────────────────────────────
 *  games          🎮
 *  dices          🎲
 *  party          🎉
 *  balloon        🎈
 *  gift           🎁
 *  bike           🚲
 *
 * ─── Scheduling & Reminders ─────────────────────────────────────────────────
 *  calendar       📅
 *  calendarheart  💝
 *  clock          🕐
 *  alarm          ⏰
 *  bell           🔔
 *  bellring       🔔
 *
 * ─── Navigation & UI ────────────────────────────────────────────────────────
 *  search         🔍
 *  settings       ⚙️
 *  camera         📷
 *  mappin         📍
 *  message        💬
 *  messageheart   💬
 *  phone          📞
 */
const registry: Record<string, string> = {
  // Child & Parenting
  baby:           '👶',
  milk:           '🥛',
  feeding:        '🍴',
  babybottle:     '🍼',
  utensils:       '🥄',
  footprints:     '👣',
  // Health & Wellbeing
  wellbeing:      '❤️',
  heartpulse:     '💓',
  hearthandshake: '🤝',
  stethoscope:    '🩺',
  thermometer:    '🌡️',
  pill:           '💊',
  syringe:        '💉',
  medicalkit:     '🧳',
  bandage:        '🩹',
  shieldcheck:    '🛡️',
  activity:       '📈',
  // Sleep & Rest
  sleep:          '🌙',
  moonstar:       '🌟',
  cloudmoon:      '☁️',
  bed:            '🛏️',
  star:           '⭐',
  // Food & Nutrition
  apple:          '🍎',
  cookie:         '🍪',
  salad:          '🥗',
  cookingpot:     '🍲',
  carrot:         '🥕',
  // Learning & Education
  learning:       '📖',
  book:           '📚',
  graduationcap:  '🎓',
  pencil:         '✏️',
  puzzle:         '🧩',
  palette:        '🎨',
  music:          '🎵',
  headphones:     '🎧',
  numbers:        '🔢',
  abacus:         '🧮',
  math:           '➕',
  // Growth & Development
  development:    '🌱',
  trendingup:     '📈',
  trophy:         '🏆',
  medal:          '🥇',
  target:         '🎯',
  award:          '🏅',
  milestone:      '🪧',
  // Family & Home
  home:           '🏠',
  homeheart:      '🏡',
  family:         '👨‍👩‍👧',
  user:           '👤',
  handheart:      '🤲',
  // Safety
  safety:         '🛡️',
  eye:            '👁️',
  lock:           '🔐',
  // Play & Activities
  games:          '🎮',
  dices:          '🎲',
  party:          '🎉',
  balloon:        '🎈',
  gift:           '🎁',
  bike:           '🚲',
  // Scheduling & Reminders
  calendar:       '📅',
  calendarheart:  '💝',
  clock:          '🕐',
  alarm:          '⏰',
  bell:           '🔔',
  bellring:       '🔔',
  // Navigation & UI
  search:         '🔍',
  settings:       '⚙️',
  camera:         '📷',
  mappin:         '📍',
  message:        '💬',
  messageheart:   '💬',
  phone:          '📞',
};

/**
 * Returns the emoji for a known registry key.
 * Falls back to the raw value so emojis stored directly in the DB also work.
 */
export function getMenuIcon(key: string): string {
  return registry[key.toLowerCase()] ?? key;
}
