import { Gift, MoonStar, Car, Sparkles, RefreshCcw } from 'lucide-react';

const FEATURES = [
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Aesthetic Gift Idea",
    description: "A fun and unique gift for kids, couples & friends."
  },
  {
    icon: <MoonStar className="w-6 h-6" />,
    title: "Relaxing Night Ambience",
    description: "Enjoy a soothing atmosphere while winding down."
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "Portable & Compact",
    description: "Take your mini galaxy with you anywhere."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "3 Brightness Levels",
    description: "Choose from soft glow to immersive projection."
  },
  {
    icon: <RefreshCcw className="w-6 h-6" />,
    title: "Flexible 360° Rotating Projection Head",
    description: "Easily project onto ceilings, walls or floors."
  }
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Why You'll Love It</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Transform any room into a stunning, starry oasis with these incredible features.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {FEATURES.map((feature, i) => (
            <div key={i} className="flex flex-col bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
