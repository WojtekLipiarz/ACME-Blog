'use client';

import React, { useCallback, useState } from 'react';
import {
  CategorySelectWrapper,
  SliderControls,
  ArrowWrapper,
  CategorySelectItem,
} from './CategorySelect.styles';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { SWIPER_BREAKPOINTS } from 'utils/constants';
import { CATEGORIES } from '@models/category';
import { CardCategory } from '@components/common/cards/CardCategory';
import { Icon } from '@components/common/icon/Icon';

interface CategorySelectProps {
  selectedCategory?: string | null;
  onChange: (category: string) => void;
}

const iconColor = 'grey500';
const iconSize = 32;
export const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  onChange,
}) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <CategorySelectWrapper>
      <h2>Kategorie</h2>

      <SliderControls>
        {/* Lewy przycisk nawigacji */}
        <ArrowWrapper>
          <button onClick={handlePrevious}>
            <Icon iconName="chevron_left" color={iconColor} size={iconSize} />
          </button>
        </ArrowWrapper>

        {/* Główny slider */}
        <Swiper
          onSwiper={setSwiperRef}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            [SWIPER_BREAKPOINTS.TWO_ITEMS]: { slidesPerView: 2 },
            [SWIPER_BREAKPOINTS.THREE_ITEMS]: { slidesPerView: 3 },
            [SWIPER_BREAKPOINTS.FOUR_ITEMS]: { slidesPerView: 4 },
          }}
        >
          {CATEGORIES.map((cat) => (
            <SwiperSlide key={cat}>
              <CategorySelectItem onClick={() => onChange(cat)}>
                <CardCategory
                  categoryKey={cat}
                  isActive={cat === selectedCategory}
                />
              </CategorySelectItem>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prawy przycisk nawigacji */}
        <ArrowWrapper>
          <button onClick={handleNext}>
            <Icon iconName="chevron_right" color={iconColor} size={iconSize} />
          </button>
        </ArrowWrapper>
      </SliderControls>
    </CategorySelectWrapper>
  );
};
