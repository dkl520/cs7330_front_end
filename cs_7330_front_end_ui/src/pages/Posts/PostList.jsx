import { useState } from 'react';
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
  Grid
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

const PostList = () => {
  const [posts, setPosts] = useState([
    {
      post_id: 1,
      user_id: 1,
      media_id: 1,
      content: "这是一个示例帖子内容",
      posted_time: "2024-01-20T10:00:00",
      location_city: "北京",
      location_state: "北京",
      location_country: "中国",
      likes: 10,
      dislikes: 2,
      has_multimedia: true
    }
  ]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  
  const emptyPostData = {
    content: '',
    location_city: '',
    location_state: '',
    location_country: '',
    has_multimedia: false
  };

  const [formData, setFormData] = useState(emptyPostData);

  const PostForm = () => (
    <Box component="form" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="帖子内容"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="城市"
            value={formData.location_city}
            onChange={(e) => setFormData({...formData, location_city: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="省/州"
            value={formData.location_state}
            onChange={(e) => setFormData({...formData, location_state: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="国家"
            value={formData.location_country}
            onChange={(e) => setFormData({...formData, location_country: e.target.value})}
          />
        </Grid>
      </Grid>
    </Box>
  );

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
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: 2,
            '&:hover': { boxShadow: 4 }
          }}
        >
          发布帖子
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <List sx={{ p: 0 }}>
          {posts.map((post, index) => (
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPost(post);
                      setFormData(post);
                      setEditDialogOpen(true);
                    }}
                    sx={{
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.lighter' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPost(post);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{
                      color: 'error.main',
                      '&:hover': { bgcolor: 'error.lighter' }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      {post.content}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <LikeIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{post.likes}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <DislikeIcon fontSize="small" color="error" />
                        <Typography variant="body2">{post.dislikes}</Typography>
                      </Stack>
                      {post.has_multimedia && (
                        <ImageIcon fontSize="small" color="primary" />
                      )}
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        icon={<LocationIcon />}
                        label={`${post.location_city}, ${post.location_state}, ${post.location_country}`}
                        size="small"
                        sx={{ bgcolor: 'primary.lighter' }}
                      />
                      <Chip
                        label={new Date(post.posted_time).toLocaleString()}
                        size="small"
                        sx={{ bgcolor: 'secondary.lighter' }}
                      />
                    </Stack>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 添加帖子对话框 */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>发布新帖子</DialogTitle>
        <DialogContent>
          <PostForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddDialogOpen(false);
            setFormData(emptyPostData);
          }}>
            取消
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              // TODO: 实现添加逻辑
              setAddDialogOpen(false);
              setFormData(emptyPostData);
            }}
          >
            发布
          </Button>
        </DialogActions>
      </Dialog>

      {/* 编辑帖子对话框 */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>编辑帖子</DialogTitle>
        <DialogContent>
          <PostForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            取消
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              // TODO: 实现保存逻辑
              setEditDialogOpen(false);
            }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

      {/* 删除确认对话框 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确定要删除这条帖子吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button 
            color="error" 
            variant="contained"
            onClick={() => {
              // TODO: 实现删除逻辑
              setDeleteDialogOpen(false);
            }}
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PostList;