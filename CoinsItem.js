import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const CoinsItem = ({ coin }) => {
  return (
    <View style={styles.container}>
            <View style={styles.coinName}>
            <Image
                style={styles.image}
                source={{uri: coin.image}}
                />
                <View style={styles.textContainer}>
                <Text style={styles.text}>{ coin.name }</Text>
                <Text style={styles.symbol}>{coin.symbol}</Text>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.text}>$ {coin.current_price}</Text>
                <Text style={{
                    color: /^-/.test(coin.price_change_percentage_24h) ? '#fc4422' : '#54B435',
                    textAlign: 'right'
                }}>{ coin.price_change_percentage_24h }</Text>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        marginLeft: 10
    },
    symbol: {
        color: '#2C74B3',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    coinName: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 16
    },
    image: {
        width: 30,
        height: 30
    },
})

export default CoinsItem