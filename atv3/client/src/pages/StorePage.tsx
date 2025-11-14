import HeroSection from '../components/Store/HeroSection';
import HistorySection from '../components/Store/HistorySection';
import ProductsSection from '../components/Store/ProductsSection';

const StorePage = () => {
  return (
    <div className="store-page">
      <HeroSection />
      <HistorySection />
      <ProductsSection />
    </div>
  );
};

export default StorePage;
