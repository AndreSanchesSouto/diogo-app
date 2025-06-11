import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import type { RootStackParamList } from '../navigator/AppNavigator';
import api from '../services/api';

type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default function ProductScreen() {
    const route = useRoute<ProductRouteProp>();
    const { productId } = route.params;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.centered}>
                <Text>Produto não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
                <Text style={styles.category}>{product.category.toUpperCase()}</Text>

                <View style={styles.separator} />

                <Text style={styles.sectionTitle}>Descrição</Text>
                <Text style={styles.description}>{product.description}</Text>

                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
                    <Text style={styles.ratingCount}>({product.rating.count} avaliações)</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingBottom: 32,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 300,
        resizeMode: 'contain',
        backgroundColor: '#f9f9f9',
    },
    content: {
        padding: 16,
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#222',
    },
    price: {
        fontSize: 22,
        color: '#2e7d32',
        fontWeight: '600',
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: '#888',
        marginBottom: 12,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginVertical: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#444',
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#555',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
        color: '#f0a500',
        marginRight: 8,
    },
    ratingCount: {
        fontSize: 14,
        color: '#777',
    },
});
