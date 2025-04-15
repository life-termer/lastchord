import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ButtonContinue() {
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      endIcon={<SendIcon />}
    >
      Continue
    </Button>
  );
}

export default ButtonContinue;
