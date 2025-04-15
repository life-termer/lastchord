import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { LinkOff } from "@material-ui/icons";

function ButtonContinue({ handleUpload, loading }) {
  return (
    <Button
      onClick={handleUpload}
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        color: "var(--color-slate-200)",
        backgroundColor: "var(--primary)",
        minWidth: 300,
        "&:disabled": {
          backgroundColor: "var(--primary)",
          color: "var(--color-slate-200)",
          opacity: 0.5,
        },
      }}
      variant="contained"
      size="large"
      endIcon={<SendIcon />}
      loadingPosition="start"
      loading={loading}
    >
      {loading ? "Processing ..." : "Upload & Transcribe"}
    </Button>
  );
}

export default ButtonContinue;
