import React, { useState, useEffect } from 'react';
import FloppyIcon from "./floppyIcon/floppyIcon";
import FileUpload from "./fileupload/fileUpload";
import {ErrorBoundary} from "react-error-boundary";
import useFetch from '@chrislaughlin/usefetch'

const App = () => {
    const [assets, setAssets] = useState(null);


    const {
        isLoading,
        error,
        data
    } = useFetch(
        '/.netlify/functions/hello',
        {
                method: 'GET',
                headers: {"Content-Type": "application/json"}
            }
        );

    console.log({
        isLoading,
        error,
        data
    });

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

        </div>
    );
}

export default App;
