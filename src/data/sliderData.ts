import { SliderImage } from '@/components/ImageSlider';

/**
 * Slider 1: ViabTech Showroom — DIMS (Digital Imaging & Managed Services)
 * Showcases ViabTech showroom with Canon imagePROGRAF printers and document solutions.
 * Native: 1920×685
 */
export const slider1Images: SliderImage[] = [
  {
    src: '/images/sliders/slider1/slider1-slide-1.webp',
    alt: 'ViabTech Showroom – Canon imagePROGRAF DIMS Option 1',
    width: 1920, height: 685,
  },
  {
    src: '/images/sliders/slider1/slider1-slide-2.webp',
    alt: 'ViabTech Showroom – Canon imagePROGRAF DIMS Option 2',
    width: 1920, height: 685,
  },
  {
    src: '/images/sliders/slider1/slider1-slide-3.webp',
    alt: 'ViabTech Showroom – Canon imagePROGRAF DIMS Option 3',
    width: 1920, height: 685,
  },
];

/**
 * Slider 2: ViabTech Showroom — LFP (Large Format Printing)
 * Canon imagePROGRAF PRO, TX and TM series large format printers.
 * Native: 1920×886
 */
export const slider2Images: SliderImage[] = [
  {
    src: '/images/sliders/slider2/slider2-slide-1.webp',
    alt: 'Canon imagePROGRAF Large Format Printing – PRO Series',
    width: 1920, height: 886,
  },
  {
    src: '/images/sliders/slider2/slider2-slide-2.webp',
    alt: 'Canon imagePROGRAF PRO Series – Timeless Precision',
    width: 1920, height: 886,
  },
  {
    src: '/images/sliders/slider2/slider2-slide-3.webp',
    alt: 'Canon imagePROGRAF TX Series – Engineered for Productivity',
    width: 1920, height: 886,
  },
  {
    src: '/images/sliders/slider2/slider2-slide-4.webp',
    alt: 'Canon imagePROGRAF TM Series – Performance Reimagined',
    width: 1920, height: 886,
  },
];

/**
 * Slider 3: Infodis Showroom — Exterior Decor (Light theme)
 * Canon imageFORCE multifunction printers in action — fencer, surfer, cyclist.
 * Native: 1920×564 and 1920×701 (mixed — tallest used as reference)
 */
export const slider3Images: SliderImage[] = [
  {
    src: '/images/sliders/slider3/slider3-slide-1.webp',
    alt: 'Canon imageFORCE – Defend From End To End',
    width: 1920, height: 564,
  },
  {
    src: '/images/sliders/slider3/slider3-slide-2.webp',
    alt: 'Canon imageFORCE – Sustainability Streamlined',
    width: 1920, height: 701,
  },
  {
    src: '/images/sliders/slider3/slider3-slide-3.webp',
    alt: 'Canon imageFORCE – Agility That Comes Naturally',
    width: 1920, height: 564,
  },
];

/**
 * Slider 4: Infodis Showroom — Exterior Decor (Dark theme)
 * Canon imageFORCE series — fencer and cyclist on dark backgrounds.
 * Native: 1920×564 and 1920×701 (mixed — tallest used as reference)
 */
export const slider4Images: SliderImage[] = [
  {
    src: '/images/sliders/slider4/slider4-slide-1.webp',
    alt: 'Canon imageFORCE – Defend From End To End (Dark)',
    width: 1920, height: 564,
  },
  {
    src: '/images/sliders/slider4/slider4-slide-2.webp',
    alt: 'Canon imageFORCE – Agility That Comes Naturally (Dark)',
    width: 1920, height: 701,
  },
];

/** All slider sets for easy iteration */
export const allSliders = {
  dims: slider1Images,
  lfp: slider2Images,
  imageForcLight: slider3Images,
  imageForceDark: slider4Images,
};
