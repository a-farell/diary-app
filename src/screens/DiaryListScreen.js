import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, Image } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

// 5 Data Entri sesuai syarat modul
const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-12',
    preview: 'Bangun lebih pagi dan berjalan kaki 20 menit...',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk dan membuat pikiran lebih jernih untuk memulai hari.',
    moodUri: { uri: 'https://picsum.photos/seed/happy/200' },
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
    borderColor: '#4ade80',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-11',
    preview: 'Menyelesaikan modul praktikum dan diskusi tim...',
    body: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru terkait pengembangan aplikasi mobile hari ini.',
    moodUri: { uri: 'https://picsum.photos/seed/focus/200' },
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
    borderColor: '#60a5fa',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-10',
    preview: 'Menikmati senja sambil membaca buku favorit...',
    body: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah dan suasana taman sangat mendukung untuk bersantai.',
    moodUri: { uri: 'https://picsum.photos/seed/calm/200' },
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
    borderColor: '#fbbf24',
  },
  {
    id: 4,
    title: 'Belajar Coding',
    date: '2026-10-09',
    preview: 'Lanjut mengelola database hari ini. Seru banget...',
    body: 'Lanjut mengelola database di MongoDB Atlas dan mengecek log di GitHub. Seru banget hari ini karena bug yang sulit akhirnya teratasi!',
    moodUri: require('../../assets/moods/happy.png'), 
    heroUri: 'https://picsum.photos/seed/codehero/800/450',
    borderColor: '#f87171',
  },
  {
    id: 5,
    title: 'Jalan-jalan Kuliner',
    date: '2026-10-08',
    preview: 'Jalan keliling kota untuk cari makanan enak...',
    body: 'Jalan keliling kota Sukabumi untuk cari makanan enak setelah capek mengerjakan tugas. Mencoba jajanan baru di dekat alun-alun.',
    moodUri: { uri: 'https://picsum.photos/seed/food/200' },
    heroUri: 'https://picsum.photos/seed/foodhero/800/450',
    borderColor: '#c084fc',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        borderColor={item.borderColor}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Buku Harian</Text>
        <Image source={require('../../assets/moods/avatar.jpg')} style={styles.avatar} />
      </View>

      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{ padding: SPACE.l, gap: SPACE.m, paddingTop: SPACE.m }}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada entri.</Text>}
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
  },
  header: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: COLORS.border },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});