import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TracksList from '@/components/TracksList'
import { colors } from '@/constants/token'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height : 50,}}>
      </View>
      <TracksList/>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
