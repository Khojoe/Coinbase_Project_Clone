import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import api from '../api/axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                if (res.data.success) {
                    setUser(res.data.user);
                } else {
                    navigate('/signin');
                }
            } catch (err) {
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.get('/auth/logout');
            navigate('/signin');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
                <div className="text-white">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#0A0B0D]">
            <Header />
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12">
                <div className="bg-[#1E2025] border border-[#2C2F36] rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 rounded-full bg-[#EA580C] flex items-center justify-center text-4xl font-bold text-white shadow-md">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{user?.name}</h1>
                            <p className="text-[#8A919E] text-lg">{user?.email}</p>
                            <span className="inline-block mt-3 px-3 py-1 bg-[#00A87A]/20 text-[#00A87A] rounded-full text-sm font-semibold">
                                Verified Account
                            </span>
                        </div>
                    </div>
                    
                    <div className="border-t border-[#2C2F36] pt-8 mb-8">
                        <h2 className="text-xl font-semibold text-white mb-6">Account Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#2C2F36]/50 rounded-xl p-5 border border-[#2C2F36]">
                                <p className="text-[#8A919E] text-sm font-medium mb-1">User ID</p>
                                <p className="text-white font-mono">{user?._id}</p>
                            </div>
                            <div className="bg-[#2C2F36]/50 rounded-xl p-5 border border-[#2C2F36]">
                                <p className="text-[#8A919E] text-sm font-medium mb-1">Member Since</p>
                                <p className="text-white">{new Date(user?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 border-t border-[#2C2F36] pt-8">
                        <button 
                            onClick={handleLogout}
                            className="px-8 py-3 rounded-full bg-transparent border border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C] hover:text-white font-semibold transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;
