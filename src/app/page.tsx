import WatchCategoriesGrid from "./components/Category";
import FeaturedProducts from "./components/FeatureProduct";
import HeroCarousel from "./components/ImageSlider";
import LadiesCategory from "./components/ladiesCategory";
import MensCategory from "./components/MensCategory";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <WatchCategoriesGrid />
      <hr  className="border-2 mx-4 my-10"/>
      <FeaturedProducts />
      <hr  className="border-2 mx-4 my-10"/>
      <MensCategory />
      <hr  className="border-2 mx-4 my-10"/>
      <LadiesCategory />
      </>

  );
}
