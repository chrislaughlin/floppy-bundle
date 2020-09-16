import React, { useState, useEffect } from 'react';
import FloppyIcon from "./floppyIcon/floppyIcon";
import FileUpload from "./fileupload/fileUpload";
import {ErrorBoundary} from "react-error-boundary";

const App = () => {
    const [assets, setAssets] = useState(null);
    const [url, setUrl] = useState('');

    return (
        <div className="app">
            <h1>
                <span className="h1-first-letter">F</span>loppy <span className="h1-first-letter">B</span>undle
            </h1>
            <h2>
                How many floppy disks would it take to hold your JavaScript bundle
            </h2>
            <FloppyIcon
                assets={assets}
            />
            <ErrorBoundary fallback={<div>Oh no</div>}>
                <FileUpload
                    onFileProcessed={setAssets}
                />
            </ErrorBoundary>
            <div className="url-entry">
                <h2>
                    Or enter the URL to your site below
                </h2>
                <div>
                    <input value={url} onChange={evt => setUrl(evt.target.value)} />
                    <button
                        onClick={() => {
                            fetch(
                                '/.netlify/functions/hello',
                                {
                                    method: 'POST',
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify({ url })
                                }

                            ).then(res => res.json())
                                .then(data => setAssets(data))
                        }}
                    >
                        GO
                    </button>
                </div>

            </div>

        </div>
    );
}

export default App;
