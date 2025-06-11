import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import api from '../services/api';


export default function HomeScreen() {
    const [products, setProducts] = useState<any>()
    const navigation = useNavigation() as any
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get("/products")
            setProducts(response.data)
        }
        fetchProducts()
    }, [])

    function handleTouchProduct(productId: string) {
        console.log(productId)
        console.log("a")

        navigation.navigate("Product", { productId: productId });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {products?.map((product: any) => (
                <Pressable 
                    key={product.id} 
                    style={styles.card}
                    onPress={() => handleTouchProduct(product.id)}
                >
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </Pressable>
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