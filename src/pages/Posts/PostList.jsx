import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import zhLocale from 'date-fns/locale/zh-CN';

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
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  ThumbUp as LikeIcon,
  ThumbDown as DislikeIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// 表单组件：包含所有数据库字段，并使用 DateTimePicker 处理 DateTimeField
const PostForm = ({ formData, setFormData }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhLocale}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {/* post_id 只读 */}
        <TextField
          fullWidth
          label="Post ID"
          value={formData.post_id || ''}
          InputProps={{ readOnly: true }}
        />

        <TextField
          fullWidth
          required
          multiline
          rows={4}
          label="内容"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
        />

        <TextField
          fullWidth
          label="User ID"
          type="number"
          value={formData.user_id}
          onChange={e => setFormData({ ...formData, user_id: Number(e.target.value) })}
        />

        <TextField
          fullWidth
          label="Media ID"
          type="number"
          value={formData.media_id}
          onChange={e => setFormData({ ...formData, media_id: Number(e.target.value) })}
        />

        <TextField
          fullWidth
          label="Likes"
          type="number"
          value={formData.likes}
          onChange={e => setFormData({ ...formData, likes: Number(e.target.value) })}
        />

        <TextField
          fullWidth
          label="Dislikes"
          type="number"
          value={formData.dislikes}
          onChange={e => setFormData({ ...formData, dislikes: Number(e.target.value) })}
        />

        <DateTimePicker
          label="发布时间"
          value={formData.post_time ? new Date(formData.post_time) : null}
          onChange={date =>
            setFormData({
              ...formData,
              post_time: date ? date.toISOString() : ''
            })
          }
          renderInput={params => <TextField {...params} fullWidth required />}
        />

        <TextField
          fullWidth
          label="城市"
          value={formData.location_city}
          onChange={e => setFormData({ ...formData, location_city: e.target.value })}
        />

        <TextField
          fullWidth
          label="省/州"
          value={formData.location_state}
          onChange={e => setFormData({ ...formData, location_state: e.target.value })}
        />

        <TextField
          fullWidth
          label="国家"
          value={formData.location_country}
          onChange={e => setFormData({ ...formData, location_country: e.target.value })}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.has_multimedia}
              onChange={e => setFormData({ ...formData, has_multimedia: e.target.checked })}
            />
          }
          label="包含多媒体"
        />
      </Stack>
    </LocalizationProvider>
  );
};

// 主组件 PostList 保持不变，引用已更新的 PostForm

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const emptyPostData = {
    post_id: '',
    content: '',
    user_id: '',
    media_id: '',
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
      const response = await window.$api.post.list();
      setPosts(response || []);
    } catch (error) {
      console.error('获取帖子列表失败:', error);
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
      console.error('创建帖子失败:', error);
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
      console.error('更新帖子失败:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await window.$api.post.delete(currentPost.post_id);
      setDeleteDialogOpen(false);
      setCurrentPost(null);
      await fetchPosts();
    } catch (error) {
      console.error('删除帖子失败:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            帖子列表
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            管理和查看所有帖子
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
        >
          发布帖子
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
        <List sx={{ p: 0 }}>
          {loading ? (
            <ListItem>
              <Typography component="div">加载中...</Typography>
            </ListItem>
          ) : posts.length === 0 ? (
            <ListItem>
              <Typography component="div">暂无帖子数据</Typography>
            </ListItem>
          ) : (
            posts.map((post, index) => (
              <ListItem
                key={post.post_id}
                sx={{
                  p: 3,
                  borderBottom: index < posts.length - 1 ? 1 : 0,
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
                        setCurrentPost(post);
                        setFormData(post);
                        setEditDialogOpen(true);
                      }}
                      sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.lighter' } }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={e => {
                        e.stopPropagation();
                        setCurrentPost(post);
                        setDeleteDialogOpen(true);
                      }}
                      sx={{ color: 'error.main', '&:hover': { bgcolor: 'error.lighter' } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ mb: 1 }}>
                      <Typography component="div" variant="body1">
                        {post.content}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <LikeIcon fontSize="small" color="primary" />
                          <Typography component="span" variant="body2">{post.likes}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <DislikeIcon fontSize="small" color="error" />
                          <Typography component="span" variant="body2">{post.dislikes}</Typography>
                        </Stack>
                        {post.has_multimedia && <ImageIcon fontSize="small" color="primary" />}
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          icon={<LocationIcon />}
                          label={`${post.location_city}, ${post.location_state}, ${post.location_country}`}
                          size="small"
                          sx={{ bgcolor: 'primary.lighter' }}
                        />
                        <Chip
                          label={new Date(post.post_time).toLocaleString()}
                          size="small"
                          sx={{ bgcolor: 'secondary.lighter' }}
                        />
                      </Stack>
                    </Stack>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      {/* 添加帖子对话框 */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle component="div">发布新帖子</DialogTitle>
        <DialogContent>
          <PostForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddDialogOpen(false);
              setFormData(emptyPostData);
            }}
          >
            取消
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            发布
          </Button>
        </DialogActions>
      </Dialog>

      {/* 编辑帖子对话框 */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle component="div">编辑帖子</DialogTitle>
        <DialogContent>
          <PostForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>取消</Button>
          <Button variant="contained" onClick={handleEdit}>
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle component="div">确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>确定要删除这条帖子吗？此操作无法撤销。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostList;