import React, { useState } from 'react';
import { Shield, Eye, Lock, Bell, Cookie } from 'lucide-react';

const Settings: React.FC = () => {
  const [privacy, setPrivacy] = useState({
    adPersonalization: true,
    activityTracking: true,
    publicProfile: true
  });

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and privacy.</p>
      </div>

      <div className="space-y-6">
        {/* Privacy Section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <Shield className="w-5 h-5 text-gray-500" /> Privacy & Data
              </h3>
              <p className="text-sm text-gray-500">Control how your data is used for ads and personalization.</p>
           </div>
           
           <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Ad Personalization</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-md">
                       Allow us to use your interests and coarse location (City level) to show relevant ads. 
                       If disabled, you will still see ads, but they will be based only on the page context (e.g. Finance ads on Finance pages).
                    </p>
                 </div>
                 <div 
                    onClick={() => setPrivacy({...privacy, adPersonalization: !privacy.adPersonalization})}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${privacy.adPersonalization ? 'bg-black' : 'bg-gray-200'}`}
                 >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${privacy.adPersonalization ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
              </div>

              <div className="flex items-start justify-between pt-6 border-t border-gray-100">
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Activity Tracking</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-md">
                       Allow us to use your browsing history (courses viewed, downloads) to recommend better content.
                    </p>
                 </div>
                 <div 
                    onClick={() => setPrivacy({...privacy, activityTracking: !privacy.activityTracking})}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${privacy.activityTracking ? 'bg-black' : 'bg-gray-200'}`}
                 >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${privacy.activityTracking ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Data Rights */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                 <Lock className="w-5 h-5 text-gray-500" /> Data Rights
              </h3>
           </div>
           <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Download My Data</h4>
                    <p className="text-xs text-gray-500">Get a copy of everything we know about you.</p>
                 </div>
                 <button className="text-xs font-bold border border-gray-300 px-3 py-1.5 rounded hover:bg-white">Request Archive</button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Delete Account</h4>
                    <p className="text-xs text-gray-500">Permanently remove your account and data.</p>
                 </div>
                 <button className="text-xs font-bold text-red-600 border border-red-200 px-3 py-1.5 rounded hover:bg-red-50">Delete</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;