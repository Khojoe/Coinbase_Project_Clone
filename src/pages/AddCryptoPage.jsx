import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import api from '../api/axios';

const AddCryptoPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        price: '',
        image: '',
        '24hChange': ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const dataToSubmit = {
                ...formData,
                price: Number(formData.price),
                '24hChange': Number(formData['24hChange'])
            };

            const res = await api.post('/crypto', dataToSubmit);
            if (res.data.success) {
                setMessage({ type: 'success', text: 'Cryptocurrency added successfully!' });
                setFormData({ name: '', symbol: '', price: '', image: '', '24hChange': '' });
                setTimeout(() => {
                    navigate('/explore');
                }, 1500);
            }
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to add cryptocurrency' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0A0B0D]">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg bg-[#1E2025] border border-[#2C2F36] rounded-2xl p-8 shadow-xl">
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Asset</h1>
                    <p className="text-[#8A919E] mb-8">List a new cryptocurrency on the platform.</p>

                    {message.text && (
                        <div className={`p-4 rounded-xl mb-6 font-medium ${message.type === 'success' ? 'bg-[#00A87A]/10 text-[#00A87A] border border-[#00A87A]/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5">Asset Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Bitcoin"
                                required
                                className="w-full h-14 px-4 rounded-xl bg-[#0A0B0D] border border-[#2C2F36] text-white outline-none focus:border-[#EA580C] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5">Symbol</label>
                            <input 
                                type="text" 
                                name="symbol"
                                value={formData.symbol}
                                onChange={handleChange}
                                placeholder="e.g. BTC"
                                required
                                className="w-full h-14 px-4 rounded-xl bg-[#0A0B0D] border border-[#2C2F36] text-white outline-none focus:border-[#EA580C] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5">Current Price (GHS)</label>
                            <input 
                                type="number" 
                                step="any"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 65000"
                                required
                                className="w-full h-14 px-4 rounded-xl bg-[#0A0B0D] border border-[#2C2F36] text-white outline-none focus:border-[#EA580C] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5">Image URL</label>
                            <input 
                                type="url" 
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                required
                                className="w-full h-14 px-4 rounded-xl bg-[#0A0B0D] border border-[#2C2F36] text-white outline-none focus:border-[#EA580C] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-1.5">24h Change (%)</label>
                            <input 
                                type="number" 
                                step="any"
                                name="24hChange"
                                value={formData['24hChange']}
                                onChange={handleChange}
                                placeholder="e.g. 2.5 or -1.4"
                                required
                                className="w-full h-14 px-4 rounded-xl bg-[#0A0B0D] border border-[#2C2F36] text-white outline-none focus:border-[#EA580C] transition-colors"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full h-14 rounded-full font-semibold text-white transition-colors mt-4 ${loading ? 'bg-[#EA580C]/50 cursor-not-allowed' : 'bg-[#EA580C] hover:bg-[#C2410C]'}`}
                        >
                            {loading ? 'Adding Asset...' : 'List Asset'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddCryptoPage;
