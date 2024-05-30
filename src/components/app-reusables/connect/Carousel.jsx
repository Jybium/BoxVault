"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Carousels.module.css";
import firstImage from "@/images/m1.jpg";
import secondImage from "@/images/m3.jpg";
import thirdImage from "@/images/carousel-two.jpg";
import fourthImage from "@/images/carousel-three.jpg";
import fifthImage from "@/images/kit1.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const items = [firstImage, secondImage, thirdImage, fourthImage, fifthImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Change item every 3 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const getItemClass = (index) => {
    if (index === currentIndex) {
      return `${styles.item} ${styles.current}`;
    } else if (index === (currentIndex - 1 + items.length) % items.length) {
      return `${styles.item} ${styles.prev}`;
    } else if (index === (currentIndex + 1) % items.length) {
      return `${styles.item} ${styles.next}`;
    } else {
      return styles.item;
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.masonryGrid}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.masonryItem} ${getItemClass(index)}`}
          >
            <Image
              src={item}
              alt={`item-${index}`}
              width={200}
              height={200}
              className="h-full w-full object-cover overflow-hidden rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>

      
      <div className={styles.masonryGrid}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.masonryItem} ${getItemClass(index)}`}
          >
            <Image
              src={item}
              alt={`item-${index}`}
              width={200}
              height={200}
              className="h-full w-full object-cover overflow-hidden rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
