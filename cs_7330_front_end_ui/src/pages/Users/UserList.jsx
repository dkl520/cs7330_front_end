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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerifiedUser as VerifiedIcon
} from '@mui/icons-material';

const UserList = () => {
  const [users, setUsers] = useState([
    {
      user_id: 1,
      username: "john_doe",
      first_name: "John",
      last_name: "Doe",
      country_of_birth: "USA",
      country_of_residence: "China",
      age: 28,
      gender: "male",
      is_verified: true
    }
  ]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const emptyUserData = {
    username: '',
    first_name: '',
    last_name: '',
    country_of_birth: '',
    country_of_residence: '',
    age: '',
    gender: '',
    is_verified: false
  };

  const [formData, setFormData] = useState(emptyUserData);

  const handleEditClick = (user, e) => {
    e.stopPropagation();
    setCurrentUser(user);
    setFormData(user);
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    // TODO: 实现添加逻辑
    setAddDialogOpen(false);
    setFormData(emptyUserData);
  };

  const handleSave = () => {
    // TODO: 实现保存逻辑
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    // TODO: 实现删除逻辑
    setDeleteDialogOpen(false);
  };

  const UserForm = ({ onSubmit, title }) => (
    <Box component="form" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="用户名"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="名"
            value={formData.first_name}
            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="姓"
            value={formData.last_name}
            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="年龄"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="出生国家"
            value={formData.country_of_birth}
            onChange={(e) => setFormData({...formData, country_of_birth: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="居住国家"
            value={formData.country_of_residence}
            onChange={(e) => setFormData({...formData, country_of_residence: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>性别</InputLabel>
            <Select
              value={formData.gender}
              label="性别"
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <MenuItem value="male">男</MenuItem>
              <MenuItem value="female">女</MenuItem>
              <MenuItem value="other">其他</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_verified}
                onChange={(e) => setFormData({...formData, is_verified: e.target.checked})}
              />
            }
            label="已验证"
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
            用户列表
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            管理和查看所有用户信息
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
            '&:hover': {
              boxShadow: 4
            }
          }}
        >
          添加用户
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <List sx={{ p: 0 }}>
          {users.map((user, index) => (
            <ListItem
              key={user.user_id}
              sx={{
                p: 3,
                borderBottom: index < users.length - 1 ? 1 : 0,
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <IconButton
                    edge="end"
                    onClick={(e) => handleEditClick(user, e)}
                    sx={{
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.lighter' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentUser(user);
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" component="div">
                      {user.username}
                    </Typography>
                    {user.is_verified && (
                      <VerifiedIcon color="primary" sx={{ fontSize: 20 }} />
                    )}
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {user.first_name} {user.last_name} • {user.age}岁 • {user.gender === 'male' ? '男' : user.gender === 'female' ? '女' : '其他'}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip
                        label={`出生地: ${user.country_of_birth}`}
                        size="small"
                        sx={{ bgcolor: 'primary.lighter' }}
                      />
                      <Chip
                        label={`居住地: ${user.country_of_residence}`}
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

      {/* 添加用户对话框 */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>添加用户</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddDialogOpen(false);
            setFormData(emptyUserData);
          }}>
            取消
          </Button>
          <Button onClick={handleAdd} variant="contained">
            添加
          </Button>
        </DialogActions>
      </Dialog>

      {/* 编辑用户对话框 */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>编辑用户</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            取消
          </Button>
          <Button onClick={handleSave} variant="contained">
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
            确定要删除用户 "{currentUser?.username}" 吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;