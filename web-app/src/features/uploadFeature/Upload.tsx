import { useState } from 'react';
import FileUpload from 'react-material-file-upload';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = () => {
    setFiles([]);
    setOpen(true);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ borderWidth: 1, width: "100%" }}>
        <FileUpload value={files} onChange={setFiles} />
      </Box>

      <Button
        sx={{
          marginTop: 5,
          width: 100,
        }}
        onClick={handleSubmit}
        variant="contained"
        color="success"
      >
        Submit
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Tải đề thi thành công, hệ thống đang xử lý
        </Alert>
      </Snackbar>
    </Box>
  );
}