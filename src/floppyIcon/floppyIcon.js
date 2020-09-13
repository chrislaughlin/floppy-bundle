import React from 'react';

import './floppyIcon.css';

const FloppyIcon = ({ assets }) => {
    let hasAssets = assets && assets.length > 0;
    let assetCount;
    let totalFloppyCount;

    if (hasAssets) {
        assetCount = assets.length;
        const totalJSBundleSize = assets.reduce((prev, curr) => {
            return prev + curr.size
        }, 0);
        totalFloppyCount = (totalJSBundleSize / 1474560).toFixed(2)
    }
    return (
        <div className="floppy">
            <div className="shutter-container">
                <div className="shutter">
                    <div className="title">JavaScript Floppy</div>
                    <div className="subtitle">1.44MB Floppy Disk</div>
                </div>
            </div>
            <div className="label-container">
                {
                    hasAssets &&
                    <div className="label">
                        <span>
                            {totalFloppyCount} Floppy Disks, across {assetCount} assets
                        </span>
                    </div>
                }
            </div>
            <div className="protect-1 protect"/>
            <div className="protect-2 protect"/>
            <div className="arrow">
                <div className="arrow-rect"/>
                <div className="arrow-triangle"/>
            </div>
        </div>
    );
};

FloppyIcon.defaultProps = {
    bundleName: ''
};

export default FloppyIcon;

