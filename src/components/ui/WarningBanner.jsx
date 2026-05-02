import React from 'react';

const WarningBanner = () => {
    return (
        <div className="bg-[#EA580C] text-white px-4 py-3 text-center text-sm font-medium z-50 relative">
            <span className="mr-2">⚠️</span>
            <strong>STUDENT PROJECT:</strong> This is a demo application and is <span className="underline">NOT</span> affiliated with Coinbase.
        </div>
    );
};

export default WarningBanner;
