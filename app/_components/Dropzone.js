"use client";

import { Box } from "@mui/material";
import React, { use, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  height: "100%",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "var(--color-slate-300)",
  borderStyle: "dashed",
  backgroundImage: "var(--background-grd-2)",
  color: "var(--color-slate-600)",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "var(--color-slate-400)",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function Dropzone({
  setFileName,
  setFileSize,
  setFile,
  setNewFile,
  setError,
  setOpen,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setNewFile(true);
      setError("");
    }
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "audio/aac": [],
      "audio/mpeg": [],
      "audio/ogg": [],
      "audio/wav": [],
    },
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0]?.name);
      setFileSize(acceptedFiles[0]?.size);
      setFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, setFileName, setFileSize, setFile]);

  return (
    <Box
      sx={{
        my: 4,
        width: "100%",
        height: "200px",
      }}
    >
      <div {...getRootProps({ style, className: "hover:cursor-pointer" })}>
        <input {...getInputProps()} />
        <FileUploadIcon
          fontSize="large"
          className="w-[100px] text-[var(--primary)]"
        />
        <p className="text-lg mb-1">
          Drag 'n' drop music file here, or click to select file
        </p>
        <p className="text-sm">Only */mp3, */aac, */ogg and */wav files</p>
      </div>
    </Box>
  );
}

export default Dropzone;
