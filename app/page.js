"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Header from "./_components/Header";
import Spinner from "./_components/Spinner";
import AudioPlayer from "./_components/AudioPlayer";

export default function Home() {
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [lyricsName, setLyricsName] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");

  return (
    <>
      <Header
        file={file}
        setFile={setFile}
        setError={setError}
        setLyrics={setLyrics}
        setLyricsName={setLyricsName}
        loading={loading}
        setLoading={setLoading}
        setUploadedFile={setUploadedFile}
      />
      <Container maxWidth="lg" className="mt-32">
        {loading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {error && (
              <div className="my-5 flex">
                <ErrorOutlineIcon
                  className="text-red-500 me-1"
                  fontSize="medium"
                />
                <Typography variant="body1" color="#FF0000">
                  {error}. Try again later.
                </Typography>
              </div>
            )}
            {lyrics && lyrics.length > 0 ? (
              <div className="my-5">
                <AudioPlayer
                  lyrics={lyrics}
                  lyricsName={lyricsName}
                  audioUrl={URL.createObjectURL(uploadedFile)}
                />
                {/* <Typography
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
                ))} */}
              </div>
            ) : (
              lyrics && (
                <div className="my-5">
                  <Typography variant="body1" color="#000000">
                    No lyrics found.
                  </Typography>
                </div>
              )
            )}
            {/* <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link> */}
          </Box>
        )}
      </Container>
    </>
  );
}
