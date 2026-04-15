import { useEffect, useRef } from "react";

const CloudinaryUpload = ({ onUpload }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!window.cloudinary || widgetRef.current) return;

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "ddflc5er5",
        uploadPreset: "react_upload",
        sources: ["local", "camera", "url"],
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onUpload(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <button onClick={() => widgetRef.current.open()}>
      Subir imagen 📷
    </button>
  );
};

export default CloudinaryUpload;