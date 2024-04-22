import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { fDate } from "../../../utils/formatTime";
import CommentReaction from "./CommentReaction";

import CommentDelete from "./CommentDelete";

function CommentCard({ comment }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <div className="comment-action">
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
            {/* {isYourself && (
              <IconButton onClick={handleClick}>
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
            )} */}
            <CommentDelete comment={comment} />
          </div>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
