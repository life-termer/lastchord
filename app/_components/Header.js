"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dropzone from "@/app/_components/Dropzone";
import { useState } from "react";
import { niceBytes } from "@/app/_lib/utils";
import ButtonContinue from "@/app/_components/ButtonContinue";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Collapse, Paper } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Header({ setError, setLyrics, setLyricsName, loading, setLoading }) {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [newFile, setNewFile] = useState(true);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

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
    data.error && setError(data.error);
    setLyrics(data.segments);
    setLoading(false);
    setNewFile(false);
    setLyricsName(fileName.replace(/\.[^/.]+$/, ""));
    data.error || setOpen(false);
  };
  return (
    <header className="w-full h-full">
      <Paper
        elevation={3}
        square
        sx={{
          backgroundImage: "var(--background-grd)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
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
              className="text-[var(--primary)]"
            >
              LastChord App
            </Typography>

            <Collapse in={open} className="w-full">
              <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 2 }}
                className="text-[var(--foreground)]"
              >
                Upload your awesome music file!
              </Typography>
              <Dropzone
                setFile={setFile}
                setFileName={setFileName}
                setFileSize={setFileSize}
                setNewFile={setNewFile}
                setError={setError}
                setOpen={setOpen}
              />
              {file && newFile && (
                <div className="flex flex-wrap items-center justify-between w-full">
                  <div className="my-5">
                    <p className="text-[var(--foreground)] text-2xl">
                      {fileName}{" "}
                      <span className="text-lg text-slate-400">
                        - {niceBytes(fileSize)}
                      </span>
                    </p>
                  </div>
                  <ButtonContinue
                    handleUpload={handleUpload}
                    loading={loading}
                  />
                </div>
              )}
            </Collapse>
          </Box>
        </Container>
        <div
          className="relative flex justify-center  w-full hover:cursor-pointer"
          onClick={handleClick}
        >
          <div
            className={`text-[var(--primary)] rotate-0 transition-all delay-300 duration-300 z-20 ${
              open && `rotate-180`
            }`}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </div>
        </div>
      </Paper>
    </header>
  );
}

export default Header;
