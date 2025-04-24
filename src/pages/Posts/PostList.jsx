import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import zhLocale from 'date-fns/locale/zh-CN';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Avatar,
  Card,
  CardContent,
  Divider,
  alpha,
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  ThumbUp as LikeIcon,
  ThumbDown as DislikeIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Send as SendIcon,
  Repeat as RepeatIcon
} from '@mui/icons-material';

// Form component: Contains all database fields and uses DateTimePicker to handle DateTimeField
const PostForm = ({ formData, setFormData }) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhLocale}>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          required
          multiline
          rows={4}
          label="Content"
          variant="outlined"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: 2
              }
            }
          }}
        />

        <Box sx={{ bgcolor: alpha(theme.palette.background.default, 0.7), p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Post Data
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Likes"
              type="number"
              size="small"
              value={formData.likes}
              onChange={e => setFormData({ ...formData, likes: Number(e.target.value) })}
              InputProps={{
                startAdornment: <LikeIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
              }}
            />

            <TextField
              fullWidth
              label="Dislikes"
              type="number"
              size="small"
              value={formData.dislikes}
              onChange={e => setFormData({ ...formData, dislikes: Number(e.target.value) })}
              InputProps={{
                startAdornment: <DislikeIcon fontSize="small" color="error" sx={{ mr: 1 }} />
              }}
            />
          </Stack>

          <DateTimePicker
            label="Post Time"
            value={formData.post_time ? new Date(formData.post_time) : null}
            onChange={date =>
              setFormData({
                ...formData,
                post_time: date ? date.toISOString() : ''
              })
            }
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                size: "small",
                sx: { mb: 2 }
              }
            }}
          />

          <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, color: theme.palette.text.secondary }}>
            Location Info
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="City"
              size="small"
              value={formData.location_city}
              onChange={e => setFormData({ ...formData, location_city: e.target.value })}
            />

            <TextField
              fullWidth
              label="State/Province"
              size="small"
              value={formData.location_state}
              onChange={e => setFormData({ ...formData, location_state: e.target.value })}
            />
          </Stack>

          <TextField
            fullWidth
            label="Country"
            size="small"
            value={formData.location_country}
            onChange={e => setFormData({ ...formData, location_country: e.target.value })}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.has_multimedia}
                onChange={e => setFormData({ ...formData, has_multimedia: e.target.checked })}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <ImageIcon fontSize="small" sx={{ mr: 0.5 }} />
                Contains Multimedia
              </Typography>
            }
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');
  const mediaId = searchParams.get('media_id');
  const theme = useTheme();

  const emptyPostData = {
    post_id: '',
    content: '',
    user_id: userId,
    media_id: mediaId,
    location_city: '',
    location_state: '',
    location_country: '',
    has_multimedia: false,
    likes: 0,
    dislikes: 0,
    post_time: new Date().toISOString()
  };

  const [formData, setFormData] = useState(emptyPostData);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await window.$api.post.getListById(userId, mediaId);
      setPosts(response || []);
    } catch (error) {
      console.error('Failed to fetch post list:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAdd = async () => {
    try {
      const postData = {
        ...formData,
        post_time: new Date().toISOString(),
      };
      await window.$api.post.create(postData);
      setAddDialogOpen(false);
      setFormData(emptyPostData);
      await fetchPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await window.$api.post.update(currentPost.post_id, formData);
      setEditDialogOpen(false);
      setCurrentPost(null);
      setFormData(emptyPostData);
      await fetchPosts();
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await window.$api.post.delete(currentPost.post_id);
      setDeleteDialogOpen(false);
      setCurrentPost(null);
      await fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const getRandomColor = (id) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.warning.main,
    ];
    return colors[id % colors.length];
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        pb: 3,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            POSTS
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            user posts
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<RepeatIcon />}
            onClick={() => navigate(`/reposts?user_id=${userId}&media_id=${mediaId}`)}
            sx={{
              borderRadius: 2,
              bgcolor: theme.palette.secondary.main,
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
              }
            }}
          >
            Repost
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
            sx={{
              borderRadius: 2,
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[4],
              }
            }}
          >
            Publish Post
          </Button>
        </Stack>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 3,
            textAlign: 'center',
            overflow: 'auto',
            height: '70vh',
            maxHeight: '70vh',
            bgcolor: alpha(theme.palette.primary.light, 0.1),
            border: `1px dashed ${theme.palette.primary.main}`
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No post data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click the "Publish Post" button to create a new post
          </Typography>
        </Paper>
      ) : (
        <Paper
          elevation={2}

          sx={{
            borderRadius: 3,
            overflow: 'auto',
            // height: '70vh',
            maxHeight: '72vh',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Stack spacing={3}>
            {posts.map((post) => (
              <Card
                key={post.post_id}
                elevation={2}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: getRandomColor(post.user_id),
                        width: 48,
                        height: 48
                      }}
                    >
                      {post.user_id?.toString().charAt(0) || 'U'}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 2,
                          fontSize: '1.1rem',
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {post.content}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          mb: 2
                        }}
                      >
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <LikeIcon fontSize="small" color="primary" />
                          <Typography component="span" variant="body2">
                            {post.likes}
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <DislikeIcon fontSize="small" color="error" />
                          <Typography component="span" variant="body2">
                            {post.dislikes}
                          </Typography>
                        </Stack>

                        {post.has_multimedia && (
                          <Chip
                            icon={<ImageIcon fontSize="small" />}
                            label="Multimedia"
                            size="small"
                            sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main }}
                          />
                        )}
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                        <Chip
                          icon={<LocationIcon fontSize="small" />}
                          label={`${post.location_city || 'Unknown'}, ${post.location_state || 'Unknown'}, ${post.location_country || 'Unknown'}`}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            '& .MuiChip-icon': {
                              color: theme.palette.primary.main
                            }
                          }}
                        />

                        <Chip
                          icon={<TimeIcon fontSize="small" />}
                          label={new Date(post.post_time).toLocaleString()}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main,
                            '& .MuiChip-icon': {
                              color: theme.palette.secondary.main
                            }
                          }}
                        />
                      </Stack>
                    </Box>

                    <Stack direction="column" spacing={1}>
                      <IconButton
                        onClick={() => {
                          setCurrentPost(post);
                          setFormData(post);
                          setEditDialogOpen(true);
                        }}
                        sx={{
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.2)
                          }
                        }}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setCurrentPost(post);
                          setDeleteDialogOpen(true);
                        }}
                        sx={{
                          color: theme.palette.error.main,
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.2)
                          }
                        }}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

      )}

      {/* Add post dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            NEW POST
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <PostForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              setFormData(emptyPostData);
            }}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            startIcon={<SendIcon />}
            sx={{ borderRadius: 2 }}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit post dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Edit post
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <PostForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setEditDialogOpen(false)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEdit}
            startIcon={<EditIcon />}
            sx={{ borderRadius: 2 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: theme.palette.error.main }}>
            Confirm Delete
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            sx={{ borderRadius: 2 }}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostList;