import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DiaryCard from '../components/DiaryCard';

// Membuat minimal 5 data entri sesuai tugas
const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-12',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    moodSource: { uri: 'https://picsum.photos/seed/calm/80' },
    borderColor: '#4ade80', // Border Hijau
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-11',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    moodSource: { uri: 'https://picsum.photos/seed/focus/80' },
    borderColor: '#60a5fa', // Border Biru
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-10',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    moodSource: { uri: 'https://picsum.photos/seed/sunset/80' },
    borderColor: '#fbbf24', // Border Kuning
  },
  {
    id: 4,
    title: 'Belajar Coding',
    date: '2026-10-09',
    preview: 'Lanjut mengelola database hari ini. Seru banget karena proses error-nya akhirnya ketemu solusinya!',
    // PENTING: Memanggil gambar lokal 'happy.png' menggunakan require()
    moodSource: require('../../assets/moods/happy.png'), 
    borderColor: '#f87171', // Border Merah
  },
  {
    id: 5,
    title: 'Jalan-jalan Santai',
    date: '2026-10-08',
    preview: 'Keliling kota buat refreshing sebentar nyari angin segar dan cemilan sore.',
    moodSource: { uri: 'https://picsum.photos/seed/walk/80' },
    borderColor: '#c084fc', // Border Ungu
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Header dengan Avatar Pengguna */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Buku Harian</Text>
        <Image 
          source={require('../../assets/moods/avatar.jpg')} 
          style={styles.avatar} 
        />
      </View>

      {/* Memunculkan semua kartu diary secara otomatis */}
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodSource={entry.moodSource}
          borderColor={entry.borderColor}
        />
      ))}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Menjauhkan teks dan gambar ke ujung
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
});