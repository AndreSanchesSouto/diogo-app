import { Text } from '@react-navigation/elements';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import api from '../services/api';

export default function ProductScreen() {

    const [products, setProducts] = useState<any>()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get("/products")
            setProducts(response.data)
        }
        fetchProducts()
    }, [])

    function handleTouchProduct(productId: string) {
        console.log(productId)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {products?.map((product: any) => (
                <View 
                    key={product.id} 
                    style={styles.card}
                    onTouchEnd={() => handleTouchProduct(product.id)}
                >
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 170,
        borderRadius: 8,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    price: {
        fontSize: 17,
        textAlign:'right',
        fontWeight: 'bold',
        color: '#333',
    },
});