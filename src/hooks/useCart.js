import { useState, useEffect, useCallback, useContext } from 'react';
import cartService from '../services/cartService';
import { userContext } from '../context/userContext';

/**
 * useCart — server-synced cart state.
 * Keeps local state in sync with backend cart.
 */
export default function useCart() {
  const { isLoggedIn } = useContext(userContext);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const { data } = await cartService.getCart();
      setCart(data.cart || data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await cartService.addToCart({ productId, quantity });
      setCart(data.cart || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
      throw err;
    }
  };

  const updateItem = async (productId, quantity) => {
    try {
      const { data } = await cartService.updateItem(productId, quantity);
      setCart(data.cart || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
      throw err;
    }
  };

  const removeItem = async (productId) => {
    try {
      const { data } = await cartService.removeItem(productId);
      setCart(data.cart || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ items: [], totalPrice: 0 });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear cart');
      throw err;
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
    refetch: fetchCart,
    itemCount: cart?.items?.length || 0,
  };
}
