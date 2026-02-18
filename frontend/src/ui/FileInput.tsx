"use client";

import { useRef, useState } from "react";
import LinkButton from "./LinkButton";

interface FileInputData {
  label: string;
  inputName: string;
  className?: string;
  colSpan?: string;
  fileButtonContent?: string;
}

function FileInput({
  label,
  inputName,
  className,
  colSpan = "lg:col-span-2",
  fileButtonContent = "انتخاب فایل",
}: Readonly<FileInputData>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className={`${colSpan}`}>
      <label className="text-stone-800">{label}</label>
      <div
        className={`flex flex-col gap-2 items-stretch xs:flex-row ${className}`}
      >
        <input
          name={inputName}
          type="text"
          value={fileName}
          placeholder="فایلی انتخاب نشده"
          className="input-light bg-stone-50"
          disabled
          readOnly
        />

        <LinkButton
          size="btn-lg"
          customClass="shrink-0"
          type="button"
          onClick={handleButtonClick}
        >
          {fileButtonContent}
        </LinkButton>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default FileInput;
