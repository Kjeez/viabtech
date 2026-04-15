import Image from 'next/image';

const pressItems = [
  {
    id: 1,
    newspaper: 'The Citizen',
    color: '#1c914b', // Vivid green
    shadowColor: 'rgba(28, 145, 75, 0.4)',
    imagePath: '/images/press/1.png',
  },
  {
    id: 2,
    newspaper: 'The Guardian',
    color: '#1a1b6c', // Deep blue/navy
    shadowColor: 'rgba(26, 27, 108, 0.4)',
    imagePath: '/images/press/2.png',
  },
  {
    id: 3,
    newspaper: 'Daily News',
    color: '#1c3d52', // Dark teal/slate
    shadowColor: 'rgba(28, 61, 82, 0.4)',
    imagePath: '/images/press/5.png',
  },
  {
    id: 4,
    newspaper: 'Mwananchi',
    color: '#5b2f81', // Purple
    shadowColor: 'rgba(91, 47, 129, 0.4)',
    imagePath: '/images/press/6.png',
  },
];

export default function PressSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background layer for the dark section (extends to the bottom, leaves space at top for title) */}
      <div className="absolute top-[160px] bottom-0 left-0 right-0 bg-[#001738] z-0" />
      
      {/* Decorative glowing dots in the dark background */}
      <div className="absolute top-[250px] right-[5%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_6px_rgba(34,211,238,0.5)] z-0" />
      <div className="absolute top-[320px] right-[2%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_4px_rgba(34,211,238,0.4)] z-0" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title Area */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            <span className="text-text-primary uppercase tracking-widest font-sans">IN THE</span> PRESS
          </h2>
        </div>

        {/* Newspaper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 mt-8">
          
          {/* Card 1: Citizen (Tall, spans 4 cols) */}
          <div 
            className="md:col-span-4 flex flex-col rounded-2xl overflow-hidden bg-white z-10 hover:scale-[1.02] transition-transform duration-300"
            style={{ 
              border: `2px solid ${pressItems[0].color}`, 
              boxShadow: `0 10px 40px -10px ${pressItems[0].shadowColor}` 
            }}
          >
             <div 
                className="text-white font-bold px-5 py-3 text-2xl tracking-wide font-serif"
                style={{ backgroundColor: pressItems[0].color }}
             >
                {pressItems[0].newspaper}
             </div>
             <div className="relative min-h-[450px] md:min-h-[500px] w-full flex-grow p-1">
                <Image 
                  src={pressItems[0].imagePath} 
                  fill 
                  className="object-cover object-top rounded-b-xl" 
                  alt={`${pressItems[0].newspaper} coverage`} 
                />
             </div>
          </div>

          {/* Card 2: Guardian (Tall, spans 4 cols) */}
          <div 
            className="md:col-span-4 flex flex-col rounded-2xl overflow-hidden bg-white z-10 hover:scale-[1.02] transition-transform duration-300"
            style={{ 
              border: `2px solid ${pressItems[1].color}`, 
              boxShadow: `0 10px 40px -10px ${pressItems[1].shadowColor}` 
            }}
          >
             <div 
                className="text-white font-bold px-5 py-3 text-2xl tracking-wide font-serif"
                style={{ backgroundColor: pressItems[1].color }}
             >
                {pressItems[1].newspaper}
             </div>
             <div className="relative min-h-[450px] md:min-h-[500px] w-full flex-grow p-1">
                <Image 
                  src={pressItems[1].imagePath} 
                  fill 
                  className="object-cover object-top rounded-b-xl" 
                  alt={`${pressItems[1].newspaper} coverage`} 
                />
             </div>
          </div>

          {/* Card 3 & 4 Stacked (Spans 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-5 lg:gap-6 z-10">
             
             {/* Card 3: Daily News (Short, top) */}
             <div 
                className="flex-1 flex flex-col rounded-2xl overflow-hidden bg-white hover:scale-[1.02] transition-transform duration-300"
                style={{ 
                  border: `2px solid ${pressItems[2].color}`, 
                  boxShadow: `0 10px 40px -10px ${pressItems[2].shadowColor}` 
                }}
             >
                <div 
                    className="text-white font-bold px-5 py-3 text-2xl tracking-wide font-serif"
                    style={{ backgroundColor: pressItems[2].color }}
                >
                    {pressItems[2].newspaper}
                </div>
                <div className="relative min-h-[220px] w-full flex-grow p-1">
                    <Image 
                      src={pressItems[2].imagePath} 
                      fill 
                      className="object-cover object-top rounded-b-xl" 
                      alt={`${pressItems[2].newspaper} coverage`} 
                    />
                </div>
             </div>

             {/* Card 4: Mwananchi (Short, bottom) */}
             <div 
                className="flex-1 flex flex-col rounded-2xl overflow-hidden bg-white hover:scale-[1.02] transition-transform duration-300"
                style={{ 
                  border: `2px solid ${pressItems[3].color}`, 
                  boxShadow: `0 10px 40px -10px ${pressItems[3].shadowColor}` 
                }}
             >
                <div 
                    className="text-white font-bold px-5 py-3 text-2xl tracking-wide font-serif"
                    style={{ backgroundColor: pressItems[3].color }}
                >
                    {pressItems[3].newspaper}
                </div>
                <div className="relative min-h-[220px] w-full flex-grow p-1">
                    <Image 
                      src={pressItems[3].imagePath} 
                      fill 
                      className="object-cover object-top rounded-b-xl" 
                      alt={`${pressItems[3].newspaper} coverage`} 
                    />
                </div>
             </div>

          </div>

        </div>



      </div>
    </section>
  );
}
