import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Chip,
  Divider,
  Collapse,
  TextField,
  Button
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Comment as CommentIcon,
  MoreVert as MoreVertIcon,
  ThumbDown as ThumbDownIcon,
  LocationOn as LocationIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('');
  
  // Default post data if not provided
  const defaultPost = {
    post_id: 1,
    user: {
      user_id: 1,
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      is_verified: true
    },
    content: 'This is a sample post content.',
    posted_time: '2025-04-01T12:30:00Z',
    location_city: 'New York',
    location_state: 'NY',
    location_country: 'USA',
    likes: 42,
    dislikes: 5,
    has_multimedia: false,
    media: { media_id: 1, name: 'Twitter' },
    projects: []
  };
  
  const postData = post || defaultPost;
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };
  
  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleSubmitComment = () => {
    if (comment.trim()) {
      console.log('Submitting comment:', comment);
      setComment('');
    }
  };
  
  const handleRepost = () => {
    console.log('Reposting post:', postData.post_id);
    handleMenuClose();
  };
  
  const handleReport = () => {
    console.log('Reporting post:', postData.post_id);
    handleMenuClose();
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getLocationString = () => {
    const parts = [];
    if (postData.location_city) parts.push(postData.location_city);
    if (postData.location_state) parts.push(postData.location_state);
    if (postData.location_country) parts.push(postData.location_country);
    return parts.join(', ');
  };
  
  return (
    <Card sx={{ maxWidth: '100%', mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: 'primary.main' }}
            onClick={() => navigate(`/profile/${postData.user.user_id}`)}
          >
            {postData.user.first_name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="subtitle1" 
              component="span"
              sx={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => navigate(`/profile/${postData.user.user_id}`)}
            >
              {`${postData.user.first_name} ${postData.user.last_name}`}
            </Typography>
            {postData.user.is_verified && (
              <Box 
                component="span" 
                sx={{ 
                  color: 'primary.main', 
                  ml: 0.5, 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'  
                }}
              >
                ✓
              </Box>
            )}
          </Box>
        }
        subheader={
          <Box>
            <Typography variant="body2" color="text.secondary">
              @{postData.user.username} • {formatDate(postData.posted_time)}
            </Typography>
            {getLocationString() && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {getLocationString()}
                </Typography>
              </Box>
            )}
          </Box>
        }
      />
      
      {postData.has_multimedia && (
        <CardMedia
          component="img"
          height="194"
          image="/api/placeholder/600/400"
          alt="Post media"
        />
      )}
      
      <CardContent>
        <Typography variant="body1">
          {postData.content}
        </Typography>
        
        {postData.projects && postData.projects.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {postData.projects.map(project => (
              <Chip 
                key={project.project_id}
                label={project.name}
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => navigate(`/project/${project.project_id}`)}
                sx={{ mr: 1, mt: 1 }}
              />
            ))}
          </Box>
        )}
      </CardContent>
      
      <Divider />
      
      <CardActions disableSpacing>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            aria-label="like" 
            onClick={handleLike}
            color={liked ? 'primary' : 'default'}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {postData.likes + (liked ? 1 : 0)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <IconButton 
            aria-label="dislike" 
            onClick={handleDislike}
            color={disliked ? 'error' : 'default'}
          >
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {postData.dislikes + (disliked ? 1 : 0)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <IconButton aria-label="comment" onClick={handleExpandClick}>
            <CommentIcon />
          </IconButton>
        </Box>
        
        <IconButton aria-label="share" sx={{ ml: 1 }}>
          <ShareIcon />
        </IconButton>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Write a comment..."
              variant="outlined"
              size="small"
              value={comment}
              onChange={handleCommentChange}
              sx={{ mr: 1 }}
            />
            <Button 
              variant="contained" 
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
            >
              Post
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            No comments yet. Be the first to comment!
          </Typography>
        </CardContent>
      </Collapse>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { navigate(`/post/${postData.post_id}`); handleMenuClose(); }}>
          View Post
        </MenuItem>
        <MenuItem onClick={handleRepost}>Repost</MenuItem>
        <MenuItem onClick={handleReport}>Report</MenuItem>
      </Menu>
    </Card>
  );
};

export default PostCard;