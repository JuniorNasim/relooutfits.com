"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShoppingBag, X, Check, Menu } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  colorName: string;
  sizes: string[];
  image: string;
  accent: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Vencedores Mesh Tank Top",
    category: "Graphic essentials",
    price: 38,
    color: "#183f9b",
    colorName: "Royal blue",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
    accent: "#e5e9f7",
  },
  {
    id: 2,
    name: "Studio Oversized Tee",
    category: "Everyday uniform",
    price: 32,
    color: "#e6dfd3",
    colorName: "Oat",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    accent: "#eee9e1",
  },
  {
    id: 3,
    name: "Essential Black Tee",
    category: "Everyday uniform",
    price: 29,
    color: "#242424",
    colorName: "Washed black",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    accent: "#e6e3df",
  },
  {
    id: 4,
    name: "Crimson Graphic Tee",
    category: "Graphic essentials",
    price: 35,
    color: "#a52c35",
    colorName: "Crimson",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85",
    accent: "#f2e6e5",
  },
  {
    id: 5,
    name: "After Hours Long Sleeve",
    category: "Layering pieces",
    price: 42,
    color: "#344d71",
    colorName: "Midnight blue",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85",
    accent: "#e5e9ee",
  },
];

type CartItem = { product: Product; size: string; quantity: number };

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [notice, setNotice] = useState("");
  const active = products[activeIndex];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const goTo = (direction: number) => {
    setActiveIndex((current) => (current + direction + products.length) % products.length);
    setSelectedSize("M");
    setAdded(false);
    setNotice("");
  };

  const addToCart = () => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === active.id && item.size === selectedSize);
      if (existing) {
        return current.map((item) =>
          item.product.id === active.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product: active, size: selectedSize, quantity: 1 }];
    });
    setAdded(true);
    setNotice(`${active.name} · size ${selectedSize} added to bag`);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const changeQuantity = (productId: number, size: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const visibleProducts = useMemo(
    () => [-2, -1, 0, 1, 2].map((offset) => ({
      product: products[(activeIndex + offset + products.length) % products.length],
      offset,
    })),
    [activeIndex]
  );

  return (
    <main className="min-h-screen bg-[#f3f2f0] text-[#171717]">
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setNotice("Menu: New arrivals · Clothing · About")}>
          <Menu size={19} />
        </button>
        <a className="wordmark" href="#" aria-label="Clothes Closet home">CLOTHES CLOSET<span>®</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#collection">Collection</a>
          <a href="#story">Our approach</a>
        </nav>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cartCount} items`}>
          <ShoppingBag size={18} strokeWidth={1.7} />
          <span>Bag ({cartCount})</span>
        </button>
      </header>

      <section className="hero" id="collection">
        <div className="hero-topline">
          <span>NEW SEASON / 2026</span>
          <span>OBJECTS FOR EVERYDAY</span>
        </div>

        <div className="hanger-rail" aria-hidden="true">
          <span className="rail-cap rail-cap-left" />
          <span className="rail-cap rail-cap-right" />
          <span className="rail-line" />
        </div>

        <div className="carousel-stage" aria-label="Featured clothing carousel">
          <div className="side-products">
            {visibleProducts.map(({ product, offset }) => (
              <motion.button
                key={`${product.id}-${offset}`}
                className={`product-slide ${offset === 0 ? "is-active" : "is-side"}`}
                style={{ "--product-color": product.color, "--slide-offset": offset } as React.CSSProperties}
                initial={false}
                animate={{
                  x: `${offset * 112}%`,
                  scale: offset === 0 ? 1 : Math.max(0.58, 0.78 - Math.abs(offset) * 0.045),
                  opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.65 : 0.35,
                  filter: offset === 0 ? "blur(0px)" : `blur(${Math.abs(offset) === 1 ? 2 : 5}px)`,
                  zIndex: 10 - Math.abs(offset),
                }}
                transition={{ type: "spring", stiffness: 170, damping: 25 }}
                onClick={() => {
                  if (offset !== 0) goTo(offset);
                }}
                aria-label={offset === 0 ? `${product.name}, selected` : `View ${product.name}`}
              >
                <span className="hanger-hook" aria-hidden="true" />
                <span className="hanger-shoulder" aria-hidden="true" />
                <span className="garment">
                  <img src={product.image} alt={product.name} draggable={false} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="hero-controls">
          <button className="round-arrow" onClick={() => goTo(-1)} aria-label="Previous product"><ArrowLeft size={16} /></button>
          <span className="product-counter">{String(activeIndex + 1).padStart(2, "0")} <i>/</i> {String(products.length).padStart(2, "0")}</span>
          <button className="round-arrow" onClick={() => goTo(1)} aria-label="Next product"><ArrowRight size={16} /></button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="product-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
          >
            <p className="eyebrow">{active.category}</p>
            <h1>{active.name}</h1>
            <p className="product-price">${active.price.toFixed(2)} <span>USD</span></p>
            <div className="color-line"><span className="color-dot" style={{ background: active.color }} /> {active.colorName}</div>
            <div className="size-picker" aria-label="Choose a size">
              {active.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                >{size}</button>
              ))}
            </div>
            <div className="product-actions">
              <button className="primary-button" onClick={addToCart}>
                {added ? <><Check size={15} /> Added to bag</> : <>Add to bag <span>${active.price}</span></>}
              </button>
              <button className="availability-button" onClick={() => setNotice(`${active.name} is available in sizes ${active.sizes.join(", ")}.`)}>
                See availability
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="hero-footnote">Designed to be worn. Made to be lived in.</p>
      </section>

      <section className="editorial" id="story">
        <div className="editorial-label"><span>01 — THE COLLECTION</span><span>LESS, BUT BETTER</span></div>
        <div className="editorial-copy">
          <p className="eyebrow">A considered wardrobe</p>
          <h2>Good clothes.<br /><em>No extra noise.</em></h2>
          <p>Everyday pieces with a point of view. Thoughtful silhouettes, easy layers, and the details that make a difference.</p>
          <a href="#collection" className="text-link">Explore the collection <ArrowRight size={15} /></a>
        </div>
        <div className="editorial-image">
          <img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85" alt="Minimal clothing collection on a rack" />
          <span>THE EVERYDAY EDIT / VOL. 01</span>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#">CLOTHES CLOSET<span>®</span></a>
        <p>Everyday, elevated.</p>
        <span>© 2026 CLOTHES CLOSET</span>
      </footer>

      <AnimatePresence>
        {notice && (
          <motion.div className="notice" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)}>
            <motion.aside
              className="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              onClick={(event) => event.stopPropagation()}
              aria-label="Shopping bag"
            >
              <div className="drawer-header">
                <div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div>
                <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X size={20} /></button>
              </div>
              {cart.length === 0 ? (
                <div className="empty-cart"><ShoppingBag size={28} strokeWidth={1.2} /><p>Your bag is looking a little empty.</p><button className="text-link" onClick={() => setCartOpen(false)}>Explore the collection <ArrowRight size={15} /></button></div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div className="cart-item" key={`${item.product.id}-${item.size}`}>
                        <div className="cart-thumb"><img src={item.product.image} alt="" /></div>
                        <div className="cart-item-info">
                          <h3>{item.product.name}</h3>
                          <p>Size {item.size} · ${item.product.price.toFixed(2)}</p>
                          <div className="quantity-control">
                            <button onClick={() => changeQuantity(item.product.id, item.size, -1)} aria-label="Decrease quantity">−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => changeQuantity(item.product.id, item.size, 1)} aria-label="Increase quantity">+</button>
                          </div>
                        </div>
                        <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div><span>Subtotal</span><strong>${cartTotal.toFixed(2)} USD</strong></div>
                    <p>Shipping and taxes calculated at checkout.</p>
                    <button className="primary-button checkout-button" onClick={() => setNotice("Demo only — connect a checkout provider before accepting real orders.")}>Continue to checkout <ArrowRight size={15} /></button>
                  </div>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
