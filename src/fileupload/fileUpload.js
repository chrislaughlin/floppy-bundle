import React, {useCallback, useState, useEffect} from 'react';
import Dropzone from 'react-dropzone'

const FileUpload = () => {
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
                    setFileContents(rawData.assets.filter(asset => asset.name.endsWith('.js')))
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
        <div>
            <Dropzone
                accept="application/json"
                onDrop={onDrop}
                multiple={false}
            >
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                )}
            </Dropzone>
        </div>
    );
};


export default FileUpload;

