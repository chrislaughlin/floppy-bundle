import React from 'react';
import FloppyIcon from "./floppyIcon/floppyIcon";
import FileUpload from "./fileupload/fileUpload";
import {ErrorBoundary} from "react-error-boundary";

const App = () => {
    return (
        <div className="app">
            <h1>
                Floppy Bundle
            </h1>
            <h2>
                How many floppy disks would it take to hold your JavaScript bundle
            </h2>
            <FloppyIcon/>
            <ErrorBoundary fallback={<div>Oh no</div>}>
                <FileUpload/>
            </ErrorBoundary>

        </div>
    );
}

export default App;
