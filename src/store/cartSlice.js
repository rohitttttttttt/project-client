import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../services/cartService';

// ── Thunk: fetch cart from server ──
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await cartService.getCart();
      return data.cart || data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load cart');
    }
  }
);

// ── Thunk: add to cart ──
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await cartService.addToCart({ productId, quantity });
      return data.cart || data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add');
    }
  }
);

// ── Thunk: remove from cart ──
export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await cartService.removeItem(productId);
      return data.cart || data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove');
    }
  }
);

// ── Thunk: update quantity ──
export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await cartService.updateItem(productId, quantity);
      return data.cart || data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update');
    }
  }
);

// ── Thunk: clear cart ──
export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartService.clearCart();
      return { items: [], total: 0 };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to clear');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
    open: false,
  },
  reducers: {
    setCartOpen(state, action) {
      state.open = action.payload;
    },
    // Local-only add (for when user is not logged in)
    addItemLocal(state, action) {
      state.items.push(action.payload);
      state.total += action.payload.price || 0;
    },
    clearCartLocal(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    const applyCart = (state, action) => {
      const cart = action.payload;
      state.items = cart.items || [];
      state.total = cart.total || cart.totalPrice || 0;
      state.loading = false;
      state.error = null;
    };

    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, applyCart)
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addToCart
      .addCase(addToCartAsync.fulfilled, applyCart)
      // removeFromCart
      .addCase(removeFromCartAsync.fulfilled, applyCart)
      // updateCartItem
      .addCase(updateCartItemAsync.fulfilled, applyCart)
      // clearCart
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  },
});

export const { setCartOpen, addItemLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
