'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { toast } from 'sonner';

export default function ProfilePage() {
  const context = useContext(AuthContext);
  const user = context?.user;
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    bio: '',
    businessName: '',
    website: '',
    location: '',
  });

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleSave = async () => {
    try {
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            Business Profile
          </span>
        </h1>
        <p className="text-purple-300 mb-8">Manage your professional presence</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Picture */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">Profile Picture</h2>
              <div className="border-2 border-dashed border-purple-900 rounded-lg p-8 text-center hover:border-yellow-500/50 transition-colors cursor-pointer">
                <p className="text-purple-300">Drop image here or click to upload</p>
                <p className="text-gray-500 text-sm mt-2">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">Business Name</label>
                  <input
                    type="text"
                    value={profileData.businessName}
                    onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                    placeholder="Your business name"
                    className="w-full bg-black/50 border border-purple-900 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-yellow-500/50 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className="w-full bg-black/50 border border-purple-900 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-yellow-500/50 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="City, Country"
                    className="w-full bg-black/50 border border-purple-900 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-yellow-500/50 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">Bio</h2>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Tell us about yourself and your business..."
                rows={6}
                className="w-full bg-black/50 border border-purple-900 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-yellow-500/50 outline-none transition-colors"
              />
              <p className="text-gray-500 text-sm mt-2">{profileData.bio.length}/500 characters</p>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 rounded-lg py-3 font-semibold transition-all transform hover:scale-105"
            >
              Save Profile
            </button>
          </div>

          {/* Preview Sidebar */}
          <div>
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-yellow-500/20 rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-bold text-yellow-400 mb-6">Preview</h3>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500/30 to-purple-500/30 rounded-full mx-auto flex items-center justify-center">
                  <p className="text-4xl">👤</p>
                </div>
                <div>
                  <p className="text-purple-300 font-semibold">{profileData.businessName || 'Business Name'}</p>
                  <p className="text-gray-500 text-sm">{profileData.location || 'Location'}</p>
                </div>
                {profileData.website && (
                  <p className="text-yellow-400 text-sm break-all">{profileData.website}</p>
                )}
                <p className="text-purple-200 text-sm mt-4">{profileData.bio || 'Your bio here...'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
