'use client';

import ImageSlider from '@/components/ImageSlider';
import AnimatedSection from '@/components/AnimatedSection';
import { slider1Images, slider2Images, slider3Images, slider4Images } from '@/data/sliderData';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ShowroomSliders() {
  const { t } = useLanguage();

  const sliders = [
    {
      id: 'slider-dims',
      images: slider1Images,
      titleKey: 'showroom.slider1.title',
      titleFallback: 'Document & Imaging Solutions',
      subtitleKey: 'showroom.slider1.subtitle',
      subtitleFallback: 'Canon imagePROGRAF printers and managed document services for enterprise workflows.',
    },
    {
      id: 'slider-lfp',
      images: slider2Images,
      titleKey: 'showroom.slider2.title',
      titleFallback: 'Large Format Printing',
      subtitleKey: 'showroom.slider2.subtitle',
      subtitleFallback: 'Professional wide-format printers — PRO, TX, and TM series for stunning large-scale output.',
    },
    {
      id: 'slider-imageforce-light',
      images: slider3Images,
      titleKey: 'showroom.slider3.title',
      titleFallback: 'imageFORCE Enterprise',
      subtitleKey: 'showroom.slider3.subtitle',
      subtitleFallback: 'High-performance multifunction printers built for speed, security, and sustainability.',
    },
    {
      id: 'slider-imageforce-dark',
      images: slider4Images,
      titleKey: 'showroom.slider4.title',
      titleFallback: 'imageFORCE Pro Series',
      subtitleKey: 'showroom.slider4.subtitle',
      subtitleFallback: 'Enterprise-grade printing with natural agility and end-to-end defense.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#f0f5ff] via-white to-[#f0f5ff] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute bottom-20 left-[5%] w-[350px] h-[350px] rounded-full bg-cyan-500/[0.04] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-semibold tracking-widest uppercase mb-4 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t('showroom.badge') !== 'showroom.badge' ? t('showroom.badge') : 'Our Showroom'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-[#0f1c2e] tracking-tight">
              {t('showroom.title') !== 'showroom.title' ? t('showroom.title') : 'Experience Our'}{' '}
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600">
                {t('showroom.titleHighlight') !== 'showroom.titleHighlight' ? t('showroom.titleHighlight') : 'Product Range'}
              </span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-lg">
              {t('showroom.subtitle') !== 'showroom.subtitle' ? t('showroom.subtitle') : 'Explore our curated selection of enterprise printers and imaging solutions from Canon.'}
            </p>
          </div>
        </AnimatedSection>

        {/* Slider grid — 2x2 layout on desktop, stacked on mobile */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {sliders.map((slider, idx) => (
            <AnimatedSection key={slider.id} animation="fade-up" delay={idx * 120}>
              <div className="group">
                {/* Slider */}
                <div className="relative shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500 rounded-2xl overflow-hidden">
                  <ImageSlider
                    id={slider.id}
                    images={slider.images}
                    autoPlayInterval={5000 + idx * 500}
                    rounded="rounded-2xl"
                  />
                </div>
                {/* Label below slider */}
                <div className="mt-4 px-1">
                  <h3 className="text-lg font-bold text-[#0f1c2e] group-hover:text-primary transition-colors duration-300">
                    {t(slider.titleKey) !== slider.titleKey ? t(slider.titleKey) : slider.titleFallback}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {t(slider.subtitleKey) !== slider.subtitleKey ? t(slider.subtitleKey) : slider.subtitleFallback}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
