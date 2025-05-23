import  { useState, useCallback } from "react";
import { Upload, X, File as FileIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

export default function Uploadbox({name}) {
  const API_BASE_URL="https://incloud-backend.vercel.app/"
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading,setloading]=useState(false);
  const [files, setFiles] = useState([]);
 const user={
  name:"Avanish",
  email:"avanishupadhyay633@gmail.com"
 }
  const [isDragging, setIsDragging] = useState(false);
  
  const [uploadData, setData] = useState({
    name: user?.name,
    tags: "material",
    email: user?.email || "",
    content: null,
  })

  const handleFileSelect = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0]; // Only take the first file
      setFiles([file]); // Update state with the selected file
      setData({
        ...uploadData,
        name: file.name,
        content: file,
      });
    }
  }, [uploadData]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0]; // Only take the first file
      setFiles([file]);
      setData({
        ...uploadData,
        name: file.name,
        content: file,
      });
    }
  }, [uploadData]);

  const removeFile = useCallback(() => {
    setFiles([]);
    setData({
      ...uploadData,
      name: "",
      content: null,
    });
  }, [uploadData]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!uploadData.content) {
     toast.warn("Please select a file to upload")
      return;
    }
    const formData = new FormData();
    formData.append("name", uploadData.name);
    formData.append("tags", uploadData.tags);
    formData.append("email", uploadData.email);
    formData.append("content", uploadData.content);

    try {
      setloading(false);
      if (name==="IMAGE"){
        const response = await axios.post(
          `${API_BASE_URL}api/auth/upload/imageUpload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      else if (name==="VIDEO"){
        const response = await axios.post(
          `${API_BASE_URL}api/auth/upload/videoUpload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      else{
        const response = await axios.post(
          `${API_BASE_URL}api/auth/upload/generalUpload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }    
      setloading(false)
      toast.success("File Uploaded Sucessfully")
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      toast.error(error)
    }
    finally{
      setloading(false)
    }
  };
  return (
    <>
      <div className="bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                Drop your files here
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                or click to browse from your computer
              </p>
              <input
                type="file"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Choose files"
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow">
              <div className="p-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Selected Files ({files.length})
                  
                </h4>
              </div>
              <ul className="border-t border-gray-200 divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-4"
                  >

                    <div className="flex items-center">
                      <FileIcon className="w-5 h-5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <button
        style={{
          position: "relative",
          bottom: "-10%",
          background: "#3aa56f",
          width: "fit-content",
          left: "43%",
          padding: "1rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          borderRadius: "30px",
        }}
        onClick={handleSubmit}
      >
        Upload
      </button>
      {error && (
        <div className="text-red-500 text-center mt-4">
          <strong>Error:</strong> {error}
        </div>
      )}
    </>
  );
}
