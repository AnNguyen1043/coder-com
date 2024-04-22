import { Box, Button, Modal, Typography } from "@mui/material";
import React, { Fragment, useContext } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import { PostContext } from "./PostContext";
import useAuth from "../../../hooks/useAuth";

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

const PostDelete = ({ postId, onMenuClosed }) => {
  const [open, setOpen] = React.useState(false);
  const { page } = useContext(PostContext);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = () => {
    dispatch(deletePost({ postId, currentPage: page, userId: user._id }));
    handleClose();
  };

  const onClose = () => {
    handleClose();
    onMenuClosed();
  };

  return (
    <Fragment>
      <Typography onClick={handleOpen}>Delete</Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Post
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this post?
          </Typography>

          <Button onClick={onClose}>Close</Button>
          <Button onClick={onDelete}>Delete</Button>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default PostDelete;
