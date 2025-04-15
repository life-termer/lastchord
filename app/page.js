"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dropzone from "@/app/_components/Dropzone";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useState } from "react";
import { niceBytes } from "./_lib/utils";
import ButtonContinue from "./_components/ButtonContinue";

export default function Home() {
  const [file, setFile] = useState("");
  const [fileString, setFileString] = useState("");
  const [fileName, setFileName] = useState("");
  const [lyricsName, setLyricsName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [newFile, setNewFile] = useState(true);
  

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("audioFile", file);

    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("data", data);
    setLyrics(data.segments);
    setLoading(false);
    setNewFile(false);
    setLyricsName(fileName.replace(/\.[^/.]+$/, ""));
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 2 }}
          className="text-cyan-500"
        >
          LastChord App
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 2 }}
          className="text-slate-500"
        >
          Upload your awesome music file!
        </Typography>
        <Dropzone
          setFile={setFile}
          setFileString={setFileString}
          setFileName={setFileName}
          setFileSize={setFileSize}
          setNewFile={setNewFile}
        />
        {file && newFile && (
          <div className="flex flex-wrap items-center justify-between w-full">
            <div className="my-5">
              <p className="text-slate-500 text-2xl">
                {fileName}{" "}
                <span className="text-lg text-slate-400">
                  - {niceBytes(fileSize)}
                </span>
              </p>
            </div>
            <ButtonContinue handleUpload={handleUpload} loading={loading} />
            
          </div>
        )}
        {lyrics && lyrics.length > 0 ? (
          <div className="my-5">
             <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 2 }}
                className="text-slate-600 text-center capitalize"
              >
                {lyricsName}
              </Typography>
            {lyrics.map((seg, index) => (
              <Typography
                key={index}
                variant="body1"
                className="text-slate-600 text-center m-auto"
              >
                {seg.text}
              </Typography>
            ))}
          </div>
        ) : lyrics && (
          <div className="my-5">
            <Typography variant="body1" color="#000000">
              No lyrics found.
            </Typography>
          </div>
        )}
        {/* <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link> */}
      </Box>
    </Container>
  );
}
