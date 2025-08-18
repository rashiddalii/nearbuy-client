import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';

const HomePage = () => {
  const features = [
    {
      icon: "🛒",
      title: "Local Marketplace",
      description: "Buy and sell items within your community. Connect with neighbors and build local relationships."
    },
    {
      icon: "💬",
      title: "Secure Chat",
      description: "Built-in messaging system to communicate safely with buyers and sellers."
    },
    {
      icon: "⭐",
      title: "Review System",
      description: "Rate and review transactions to build trust within the community."
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Optional Stripe integration for safe and convenient payment processing."
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: "150+" },
    { name: "Fashion", icon: "👕", count: "200+" },
    { name: "Sports", icon: "⚽", count: "80+" },
    { name: "Furniture", icon: "🪑", count: "120+" },
    { name: "Books", icon: "📚", count: "90+" },
    { name: "Music", icon: "🎵", count: "60+" }
  ];

  const howItWorks = [
    { icon: "🔎", title: "Browse & Search", text: "Discover great items from neighbors near you." },
    { icon: "💬", title: "Chat Securely", text: "Message sellers safely to ask questions and agree on details." },
    { icon: "🤝", title: "Meet & Trade", text: "Complete your deal in person and rate the experience." }
  ];

  const testimonials = [
    { name: "Ayesha", quote: "Sold my sofa in one day! Super easy to use.", emoji: "🛋️" },
    { name: "Imran", quote: "Found a great phone at half price, nearby.", emoji: "📱" },
    { name: "Fatima", quote: "Love the messaging and safe vibe.", emoji: "💙" },
    { name: "Ali", quote: "My go-to for quick local deals!", emoji: "⚡" }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef(null);

  const scrollToTestimonial = (index) => {
    const container = testimonialsRef.current;
    if (!container) return;
    const children = container.children;
    const clamped = Math.max(0, Math.min(index, children.length - 1));
    const target = children[clamped];
    if (target) {
      container.scrollTo({ left: target.offsetLeft - container.offsetLeft, behavior: 'smooth' });
      setCurrentTestimonial(clamped);
    }
  };

  const handlePrev = () => scrollToTestimonial(currentTestimonial - 1);
  const handleNext = () => scrollToTestimonial(currentTestimonial + 1);

  const handleScroll = () => {
    const container = testimonialsRef.current;
    if (!container) return;
    const { scrollLeft } = container;
    let bestIndex = 0;
    let bestDistance = Infinity;
    Array.from(container.children).forEach((child, idx) => {
      const distance = Math.abs(child.offsetLeft - scrollLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = idx;
      }
    });
    setCurrentTestimonial(bestIndex);
  };

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setFeaturedLoading(true);
        const res = await productsAPI.getAll({ limit: 8, sort: 'newest' });
        setFeaturedProducts(res.data.products || []);
        setFeaturedError(null);
      } catch (err) {
        setFeaturedError('Failed to load featured items');
      } finally {
        setFeaturedLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl md:text-6xl mb-6">🛍️</div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">NearBuy</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Your local community marketplace. Buy, sell, and connect with neighbors in a safe, trusted environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/dashboard"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>


       {/* Features Section */}
       <section className="lg:py-20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NearBuy?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the perfect platform for local commerce with safety and community in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


       {/* Categories Section */}
       <section className="lg:py-20 py-6 bg-white rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="text-2xl md:text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Listings */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Listings</h2>
            <Link to="/marketplace" className="text-blue-600 text-sm hover:underline">See all</Link>
          </div>

          {featuredLoading && (
            <div className="flex gap-4 overflow-x-auto -mx-4 px-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="h-36 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {featuredError && !featuredLoading && (
            <div className="bg-red-50 text-red-800 rounded-md p-4 text-sm">{featuredError}</div>
          )}

          {!featuredLoading && !featuredError && featuredProducts.length > 0 && (
            <>
              {/* Mobile: horizontal scroll */}
              <div className="md:hidden -mx-4 px-4 overflow-x-auto">
                <div className="flex gap-4 pb-1">
                  {featuredProducts.map((p) => (
                    <div key={p._id} className="shrink-0 w-64">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>     
     

       {/* Trust banner */}
       <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Safe, Local, Trusted</h3>
              <p className="text-sm sm:text-base text-emerald-100">Verified users, secure chat, and community reviews.</p>
            </div>
            <Link to="/marketplace" className="bg-white text-emerald-700 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors">Start Browsing</Link>
          </div>
        </div>
      </section>


       {/* How It Works */}
       <section className="py-6 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Buy and sell in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-5 text-center">
                <div className="text-3xl mb-2">{step.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Swipeable) */}
      <section className="py-6 lg:py-16 bg-gray-50 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What People Say</h2>
            <div className="hidden sm:block text-gray-500">❤️ Trusted by our community</div>
          </div>
          <div className="relative">
            {/* Slider viewport */}
            <div
              ref={testimonialsRef}
              onScroll={handleScroll}
              className="-mx-4 px-4 flex gap-4 pb-2 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="shrink-0 w-72 bg-white rounded-xl shadow-sm p-5 snap-start"
                >
                  <div className="text-3xl mb-2">{t.emoji}</div>
                  <p className="text-gray-700 text-sm">“{t.quote}”</p>
                  <div className="mt-3 text-sm font-semibold text-gray-900">— {t.name}</div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              type="button"
              aria-label="Previous"
              onClick={handlePrev}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full text-gray-700 hover:bg-gray-100"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={handleNext}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full text-gray-700 hover:bg-gray-100"
            >
              ›
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollToTestimonial(i)}
                  className={`h-2 w-2 rounded-full ${i === currentTestimonial ? 'bg-blue-600 w-4' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white rounded-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-base sm:text-lg mb-8 text-blue-100">
            Join thousands of users who are already buying and selling in their local communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 