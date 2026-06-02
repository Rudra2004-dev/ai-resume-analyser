import React from "react";

interface Props {
    onFileSelect: (file: File | null) => void;
}

const FileUploader = ({onFileSelect}: Props) => {

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0] || null;

        onFileSelect(file);
   }

   return(
    <input 
    type="file"
    accept=".pdf"
    onChange={handleChange}
    />
   );
};

export default FileUploader;