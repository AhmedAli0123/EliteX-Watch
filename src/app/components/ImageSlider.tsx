import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

const HeroCarousel = () => {
  return (
    <div className="w-full mx-auto mt-20">
      <Carousel className="relative w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="relative w-full h-[300px] md:h-[550px]">
                <Image
                  src={src}
                  alt={`Watch ${index + 1}`}
                  loading="lazy"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
