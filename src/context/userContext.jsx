import { createContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { restoreSession, loginSuccess, logoutDone } from '../store/authSlice';
import { setCartOpen, addItemLocal, clearCartLocal, addToCartAsync } from '../store/cartSlice';
import { fetchCart } from '../store/cartSlice';
import {
    setSearch,
    setViewProduct,
    setChatUser,
    setOrderUser,
    addNotification,
    setNotificationOpen,
} from '../store/uiSlice';

export const userContext = createContext();

/**
 * Bridge: reads Redux state and provides it through the old Context API
 * so existing components don't break.
 */
export const AuthData = ({ children }) => {
    const dispatch = useDispatch();

    // Read from Redux
    const { user, token, isLoggedIn } = useSelector((s) => s.auth);
    const { items: cartItem, open: cartopen } = useSelector((s) => s.cart);
    const { search, viewProduct: product, chatUser, orderUser, notifications: NO, notificationOpen } = useSelector((s) => s.ui);

    // Restore session on mount
    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);

    // Fetch cart when logged in
    useEffect(() => {
        if (isLoggedIn) dispatch(fetchCart());
    }, [isLoggedIn, dispatch]);

    // Bridge functions
    const login = (userData, accessToken) => dispatch(loginSuccess({ user: userData, accessToken }));
    const logout = () => dispatch(logoutDone());
    const searchInput = (str) => dispatch(setSearch(str));
    const setViewProductFn = (p) => dispatch(setViewProduct(p));
    const handleCartClick = (flag) => dispatch(setCartOpen(flag));
    const addCartItem = (item, quantity = 1) => {
        if (isLoggedIn && item._id) {
            dispatch(addToCartAsync({ productId: item._id, quantity }));
        } else {
            dispatch(addItemLocal({ ...item, quantity }));
        }
    };
    const addChatUser = (u) => dispatch(setChatUser(u));
    const addOrderUser = (u) => dispatch(setOrderUser(u));
    const newOrder = (customer, prod, price, quantity, address) => {
        dispatch(addNotification({ customer, product: prod, price, quantity, address }));
    };
    const handleNotificationClick = (flag) => dispatch(setNotificationOpen(flag));

    return (
        <userContext.Provider
            value={{
                user,
                token,
                isLoggedIn,
                search,
                product,
                cartopen,
                cartItem,
                chatUser,
                orderUser,
                NO,
                notificationOpen,
                login,
                logout,
                searchInput,
                setViewProduct: setViewProductFn,
                handleCartClick,
                addCartItem,
                addChatUser,
                addOrderUser,
                newOrder,
                handleNotificationClick,
            }}
        >
            {children}
        </userContext.Provider>
    );
};
