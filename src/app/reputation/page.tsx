import { Star } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="h-full bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Main layout */}
        <div className="flex flex-col gap-6 mt-30">
          <div className="w-full bg-orange-500 rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 rounded-full bg-orange-400 opacity-20 h-64 w-64 -mr-20 -mt-20" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-1">
                <Star size={20} className="mr-2" />
                <p className="text-sm font-medium">Reputation</p>
              </div>
              <h3 className="text-3xl font-bold mb-2">Coming Soon</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}