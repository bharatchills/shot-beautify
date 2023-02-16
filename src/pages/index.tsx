import { useEffect, useState } from "react";

export default function Home() {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [dropped, setDropped] = useState(false);
  const [imageSource, setImageSource] = useState(
    "https://img.freepik.com/free-photo/abstract-flowing-neon-wave-background_53876-101942.jpg?w=740&t=st=1676517847~exp=1676518447~hmac=1cda3de0607e68001999e2696d613ed9703e1e3fb69e6f73bf15d97153f184be"
  );

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('');

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setDropped(true);
  };

  return (
    <div className="flex items-center justify-center main h-screen w-screen">
      {dropped ? (
        <>
          <div className="flex items-center justify-center flex-col rounded-lg bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 w-1/2 h-3/4 ">
            <div className="image">
              <img className="rounded-2xl max-h-96 max-w-96" src={preview} alt="" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center ">
          <label
            className="flex  items-center justify-center text-lg opacity-60  rounded-2xl p-20  dark:text-white cursor-pointer border-2 border-dashed border-gray-400 hover:opacity-80 duration-700"
            htmlFor="imagesUpload"
          >
            <input
              className="hidden"
              id="imagesUpload"
              accept="image/x-png,image/gif,image/jpeg"
              type="file"
              onChange={onSelectFile}
            />
            <p>Click here to add your image</p>
          </label>
        </div>
      )}
    </div>
  );
}
