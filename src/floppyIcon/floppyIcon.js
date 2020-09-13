import React from 'react';

import './floppyIcon.css';

const FloppyIcon = ({ bundleName }) => {
    return (
        <div className="floppy">
            <div className="shutter-container">
                <div className="shutter">
                    <div className="title">JavaScript Floppy</div>
                    <div className="subtitle">1.44MB Floppy Disk</div>
                </div>
            </div>
            <div className="label-container">
                <div className="label">
                    <span>
                        {bundleName}
                    </span>
                </div>
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

