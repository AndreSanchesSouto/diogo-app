import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { Star } from "lucide-react-native";
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import api from '../services/api';

export default function HomeScreen() {
    const [products, setProducts] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});
    const navigation = useNavigation() as any;

    useFocusEffect(
        React.useCallback(() => {
            const loadFavorites = async () => {
                try {
                    const favoritesString = await AsyncStorage.getItem('favorites');
                    if (favoritesString) {
                        const favoritesArray: string[] = JSON.parse(favoritesString);
                        const favoritesMap = favoritesArray.reduce((acc, id) => {
                            acc[Number(id)] = true;
                            return acc;
                        }, {} as Record<number, boolean>);
                        setFavorites(favoritesMap);
                    }
                } catch (error) {
                    console.error('Error loading favorites:', error);
                }
            };
            loadFavorites();

            return () => { };
        }, [])
    );

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get("/products");
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favoritesString = await AsyncStorage.getItem('favorites');
                if (favoritesString) {
                    const favoritesArray: string[] = JSON.parse(favoritesString);
                    const favoritesMap = favoritesArray.reduce((acc, id) => {
                        acc[Number(id)] = true;
                        return acc;
                    }, {} as Record<number, boolean>);
                    setFavorites(favoritesMap);
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        loadFavorites();
    }, []);

    const toggleFavorite = async (productId: number) => {
        try {
            const favoritesString = await AsyncStorage.getItem('favorites');
            let favoritesArray: string[] = favoritesString ? JSON.parse(favoritesString) : [];

            const productIdStr = String(productId);
            const index = favoritesArray.indexOf(productIdStr);

            if (index === -1) {
                favoritesArray.push(productIdStr);
            } else {
                favoritesArray.splice(index, 1);
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

            setFavorites(prev => ({
                ...prev,
                [productId]: !prev[productId]
            }));
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleTouchProduct = (productId: string) => {
        navigation.navigate("Product", { productId });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {products?.map((product) => (
                <Pressable
                    key={product.id}
                    style={styles.card}
                    onPress={() => handleTouchProduct(product.id)}
                >
                    <Pressable
                        style={styles.favoriteButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                        }}
                    >
                        <Star
                            fill={favorites[product.id] ? "#FFD700" : "transparent"}
                            color={favorites[product.id] ? "#FFD700" : "#000"}
                        />
                    </Pressable>
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
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        padding: 8,
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
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#333',
    },
});