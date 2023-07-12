const addToCart = (item) => {
  const updatedCartItems = [...cartItems, item];
  setCartItems(updatedCartItems);
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};

useEffect(() => {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    setCartItems(JSON.parse(savedCartItems));
  }
}, []);

const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
}; 