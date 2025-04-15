import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ButtonContinue({handleUpload, loading}) {
  return (
    <Button
      onClick={handleUpload}
      variant="contained"
      size="large"
      color="primary"
      endIcon={<SendIcon />}
    >
      {loading ? "Processing..." : "Upload & Transcribe"}
    </Button>
  );
}

export default ButtonContinue;
