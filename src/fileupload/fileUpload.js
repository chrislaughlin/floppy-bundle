import React, {useCallback, useState, useEffect} from 'react';
import Dropzone from 'react-dropzone'

import FloppyDrive from '../floppy-drive.png';

const FileUpload = ({ onFileProcessed }) => {
    const [file, setFile] = useState(null);
    const [fileContents, setFileContents] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0])
    }, [])

    console.log(file);
    console.log(fileContents);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                const rawData = JSON.parse(evt.target.result);
                if (rawData.assets) {
                    const jsAssets = rawData.assets.filter(asset => asset.name.endsWith('.js'));
                    setFileContents(jsAssets)
                    onFileProcessed(jsAssets)
                } else {
                    console.log('No Assets data')
                }
            }
            reader.onerror = function (evt) {
                console.log("error reading file");
            }
        }
    }, [file])

    return (
        <div className="file-upload">
            <span>
                Click the <b>Floppy Drive below</b> to Upload a &nbsp;
                <a
                    href="https://webpack.js.org/api/stats/#asset-objects"
                    target="_blank"
                >
                    webpack stats.json file
                </a>. You can generate this by using the "--json > compilation-stats.json" CLI options
            </span>
            <Dropzone
                accept="application/json"
                onDrop={onDrop}
                multiple={false}
            >
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="upload-button">
                            <img
                                className="floppy-drive"
                                src={FloppyDrive}
                                alt="Floppy Drive Icon"
                            />
                        </div>
                    </div>
                )}
            </Dropzone>
        </div>
    );
};


export default FileUpload;

