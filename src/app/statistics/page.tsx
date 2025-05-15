import {  Clock } from 'lucide-react';

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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <p className="text-sm font-medium">Statistics</p>
              </div>
              <h3 className="text-3xl font-bold mb-2">Coming Soon</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}