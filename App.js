import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'

import CoinsItem from './CoinsItem'

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false'

const App = () => {
  const [criptoData, setCriptoData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [refresing, setRefresing] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(URL)
        const data = await res.json()
        setCriptoData(data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#144272'/>
      <View style={styles.headerInfo}>
        <Text style={styles.title}>Crypto Market</Text>
        <TextInput
          onChangeText={text => setSearchInput(text)}
          defaultValue={searchInput}
          style={styles.searchInpu}
          placeholderTextColor='#fff'
          placeholder='Search a crypto'
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          criptoData.filter(coint => coint.name.toLowerCase().includes(searchInput) || coint.symbol.toLowerCase().includes(searchInput))
        }
        renderItem={({ item }) => {
          return <CoinsItem coin={item}/>
        }}
        showsVerticalScrollIndicator={true}
        refreshing={refresing}
        onRefresh={async () => {
          setRefresing(true)
          try {
            const res = await fetch(URL)
            const data = await res.json()
            setCriptoData(data)
          } catch (err) {
            console.error(err)
          } finally {
            setRefresing(false)
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2647',
    alignItems: 'center',
    paddingBottom: 4
  },
  headerInfo: {
    marginTop: 12,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between'
  },
  list: {
    width: '90%'
  },  
  searchInpu: {
    borderBottomColor: '#2C74B3',
    borderBottomWidth: 1,
    color: '#fff',
    width: 150,
    padding: 2
  },  
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default App