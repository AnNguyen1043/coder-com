import { Box, Button, Modal, Typography, IconButton } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
// import { PostContext } from "./PostContext";
import useAuth from "../../../hooks/useAuth";

import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CommentDelete = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = () => {
    dispatch(deleteComment({ postId: comment.post, commentId: comment._id }));
    handleClose();
  };

  const onClose = () => {
    handleClose();
  };

  const isYourself = comment.author._id === user._id;

  return (
    <Fragment>
      {isYourself && (
        <IconButton onClick={handleOpen}>
          <DeleteIcon sx={{ fontSize: 30 }} />
        </IconButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this comment?
          </Typography>

          <Button onClick={onClose}>Close</Button>
          <Button onClick={onDelete}>Delete</Button>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CommentDelete;
