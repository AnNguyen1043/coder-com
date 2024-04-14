import React, { Fragment, useContext, useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PostDelete from "./PostDelete";
import { AuthContext } from "../../../contexts/AuthContext";
import PostForm from "./PostForm";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const open = Boolean(anchorEl);
  const { user } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const PostView = (
    <>
      <Typography>{post.content}</Typography>
      {post.image && (
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            height: 300,
            "& img": { objectFit: "cover", width: 1, height: 1 },
          }}
        >
          <img src={post.image} alt="post" />
        </Box>
      )}

      <PostReaction post={post} />
      <CommentList postId={post._id} />
      <CommentForm postId={post._id} />
    </>
  );

  const handleOnEditSuccess = () => {
    setEditMode(false);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            <IconButton
              id={`actions-${post._id}`}
              aria-controls={open ? `actions-${post._id}-menu` : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
            {post.author._id === user._id && (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {post.author._id === user._id && (
                  <>
                    <MenuItem>
                      <PostDelete
                        postId={post._id}
                        onMenuClosed={handleClose}
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setEditMode(true);
                      }}
                    >
                      <Typography>Edit</Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            )}
          </>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {isEditMode ? (
          <>
            <PostForm post={post} onEditSuccess={handleOnEditSuccess} />
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </>
        ) : (
          PostView
        )}
      </Stack>
    </Card>
  );
}

export default PostCard;
