'use client';

import React, { useCallback, useState } from 'react';
// utils
import { SWIPER_BREAKPOINTS } from 'utils/constants';
// models
import { CATEGORIES, Category } from '@models/category';
// common
import { CardCategory } from '@components/common/cards/CardCategory';
import { Icon } from '@components/common/icon/Icon';
import { Title } from '@components/common/text/Title';
// styles
import {
  CategorySelectWrapper,
  SliderControls,
  ArrowWrapper,
  CategorySelectItem,
} from './CategorySelect.styles';
// swiper
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface CategorySelectProps {
  selectedCategory?: Category | null;
  onChange: (category: Category | null) => void;
}

const iconColor = 'black';
const iconSize = 26;

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
      <Title variant="h2" text="Kategorie" />

      <SliderControls>
        <ArrowWrapper>
          <button onClick={handlePrevious}>
            <Icon iconName="chevron_left" color={iconColor} size={iconSize} />
          </button>
        </ArrowWrapper>

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
            <SwiperSlide key={cat.id}>
              <CategorySelectItem onClick={() => onChange(cat.id)}>
                <CardCategory
                  data={cat}
                  isActive={cat.id === selectedCategory}
                />
              </CategorySelectItem>
            </SwiperSlide>
          ))}
        </Swiper>

        <ArrowWrapper>
          <button onClick={handleNext}>
            <Icon iconName="chevron_right" color={iconColor} size={iconSize} />
          </button>
        </ArrowWrapper>
      </SliderControls>
    </CategorySelectWrapper>
  );
};
