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
  const [fileString, setFileString] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  console.log(fileString);
  console.log(fileName);
  console.log(fileSize);
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
          setFileString={setFileString}
          setFileName={setFileName}
          setFileSize={setFileSize}
        />
        {}
        {fileString && (
          <>
            <div className="my-5">
              <p className="text-slate-500 text-2xl">
                {fileName}{" "}
                <span className="text-lg text-slate-400">
                  - {niceBytes(fileSize)}
                </span>
              </p>
            </div>
            <ButtonContinue />
          </>
        )}
        {/* <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link> */}
      </Box>
    </Container>
  );
}
