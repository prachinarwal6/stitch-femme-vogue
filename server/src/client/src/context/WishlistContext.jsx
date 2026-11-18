import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('femme_vogue_wishlist');
      return saved ? JSON.parse(saved) : [
        {
          id: "wish-1",
          title: "Aurelia Silk Wrap",
          category: "runway",
          brand: "Maison Édition",
          price: 340,
          stock: "In Stock",
          hasAlert: false,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiqhZ54MPQFBHQHII-7yTzkY8QayGdtqZIUAaEI-CKpwrgbxXcISf5veB1EmESbtvA7E1y2PWd9_unPqRVZ1bkzccp6gVWsc67e0aLPfUeEJOIAk7DHQLSBpeS_U203JyU2wfEQQQvwfWci-3XxsN6VkVvRusBFqR02ZNPoES02AI8q8iKiGVl9fc-fVMOh6UazpjmNdFG3kJQdzMPlNXRkZMkovS_95pMynGoNu4sz6-oOUBo1aDsBQ"
        },
        {
          id: "wish-2",
          title: "Baroque Pearl Drops",
          category: "boutique",
          brand: "Fine Bijoux",
          price: 210,
          stock: "Low Stock (2)",
          hasAlert: true,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfMsyLKjzcyPDf-cCt2qNnD-dDYw9K24mMmIsAQ5TA7YspD4MId1zvJRTNbajKdDZLvQ7CZI1ppAHkgm9oRlrUoAxEibyQDR96BMS8gHYJoISW1n45Z_Bp7sMoe-aVHslc16P6myjGf7-iJHwlKbPMhNn4M22B0YWmzrIIodzykqRLO0g6NZ_8BcrETrevDHFWayc3FHjLdkv26Cr7lbh7SUZsfq_L5fpPZTqkELV_leLiGT0LJJLAIA"
        },
        {
          id: "wish-3",
          title: "Terracotta Multi-Stick",
          category: "beauty",
          brand: "Beaute Maison",
          price: 58,
          stock: "In Stock",
          hasAlert: false,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrAVpG5JQR2CAxGIAszA4BXVdrTt7qAkK4FqWJ5y4QP4I-fUzOSDMhNp-60-inHM3f44Jdvh9ICMZ68AYCeSN__WIFWzDVoBE0e7_B71QPaNccZDh3-NNZRDer8K81v_n0KHsGKRf88XcKS2JpiGcGQXI6s339rfjRXk_S_rQdAdFG7MhoL-fFoLDNj5GQiWTfEouRAOkoeUv8m1bpNwF9AEAdPqm6b3_u8l3T0q5XGzd_-N8Lr--fpw"
        },
        {
          id: "wish-4",
          title: "Saint-Germain Trench",
          category: "runway",
          brand: "Atelier Couture",
          price: 890,
          stock: "Runway Restock",
          hasAlert: false,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHNazVsWLe6iurcfAMqNpCkh5e9LH23xpFOSfKRHlAKoCsvEYaQL_4XkWEWkqZO2Ehd70rDSotnfPR8CbBV5zGbIv1pHeQkmNuy7lIuTm4o0H-7LPdNVkvBHAPZ0vQU8-eiPKxJ9AZnoI4RU6aAu2yDfRXJW3ozmHlgLocy16SY70-O8E36BE1R5YasMFr-HOjAbzmcs2uymW_IAPTfkRC5KSRak4Ylhr9mVGl6wJRNR_TMvG6aVQJkA"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('femme_vogue_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const isInWishlist = (idOrTitle) => {
    return wishlist.some(item => item.id === idOrTitle || item.title === idOrTitle);
  };

  const toggleWishlist = async (product) => {
    const isPresent = isInWishlist(product.id || product.title);
    
    // Optimistic UI update
    if (isPresent) {
      setWishlist(prev => prev.filter(item => item.id !== product.id && item.title !== product.title));
    } else {
      setWishlist(prev => [
        {
          id: product.id || `wish-${Date.now()}`,
          title: product.title,
          category: product.category || 'boutique',
          brand: product.brand || 'Maison Édition',
          price: product.price || 195,
          stock: product.inStock !== false ? 'In Stock' : 'Pre-order',
          hasAlert: false,
          image: product.image
        },
        ...prev
      ]);
    }

    // Sync with backend API
    try {
      await api.toggleWishlist(product);
    } catch (e) {
      console.warn('Backend wishlist sync skipped (running local state)');
    }
  };

  const toggleAlert = async (id) => {
    setWishlist(prev => prev.map(item => item.id === id ? { ...item, hasAlert: !item.hasAlert } : item));
    try {
      await api.togglePriceAlert(id);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      isInWishlist,
      toggleWishlist,
      toggleAlert,
      wishlistCount: wishlist.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
