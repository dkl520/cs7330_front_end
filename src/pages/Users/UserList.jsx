import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
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
  FormControlLabel,
  Grid,
  Avatar,
  Divider,
  Tooltip,
  alpha
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerifiedUser as VerifiedIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// 用户表单组件
// 用户表单组件：一列布局，每个字段独占一行
const UserForm = ({ formData, setFormData }) => (
  <Box component="form" sx={{ mt: 3 }}>
    <Stack spacing={2}>
      <TextField
        fullWidth
        required
        label="Media ID"
        variant="outlined"
        value={formData.media_id}
        onChange={e => setFormData({ ...formData, media_id: e.target.value })}
      />
      <TextField
        fullWidth
        required
        label="Username"
        variant="outlined"
        value={formData.username}
        onChange={e => setFormData({ ...formData, username: e.target.value })}
      />
      <TextField
        fullWidth
        required
        label="First Name"
        variant="outlined"
        value={formData.first_name}
        onChange={e => setFormData({ ...formData, first_name: e.target.value })}
      />
      <TextField
        fullWidth
        required
        label="Last Name"
        variant="outlined"
        value={formData.last_name}
        onChange={e => setFormData({ ...formData, last_name: e.target.value })}
      />
      <TextField
        fullWidth
        type="number"
        label="Age"
        variant="outlined"
        value={formData.age}
        onChange={e => setFormData({ ...formData, age: e.target.value })}
      />
      <TextField
        fullWidth
        label="Country of Birth"
        variant="outlined"
        value={formData.country_of_birth}
        onChange={e => setFormData({ ...formData, country_of_birth: e.target.value })}
      />
      <TextField
        fullWidth
        label="Country of Residence"
        variant="outlined"
        value={formData.country_of_residence}
        onChange={e => setFormData({ ...formData, country_of_residence: e.target.value })}
      />
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          value={formData.gender}
          label="Gender"
          onChange={e => setFormData({ ...formData, gender: e.target.value })}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={formData.is_verified}
            onChange={e => setFormData({ ...formData, is_verified: e.target.checked })}
          />
        }
        label="Verified"
      />
    </Stack>
  </Box>
);


// 用户头像组件
const UserAvatar = ({ user }) => {
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const bgColor = stringToColor(user.username);
  const initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  return (
    <Avatar sx={{ bgcolor: bgColor, width: 50, height: 50, mr: 2 }}>
      {initials}
    </Avatar>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emptyUserData = {
    media_id: '',
    user_id: '',
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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await window.$api.user.list();
      setUsers(response || []);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    try {
      await window.$api.user.create(formData);
      setAddDialogOpen(false);
      setFormData(emptyUserData);
      await fetchUsers();
    } catch (error) {
      console.error('创建用户失败:', error);
    }
  };

  const handleEditClick = (user, e) => {
    e.stopPropagation();
    setCurrentUser(user);
    setFormData(user);
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      await window.$api.user.update(currentUser.user_id, formData);
      setEditDialogOpen(false);
      await fetchUsers();
    } catch (error) {
      console.error('更新用户失败:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await window.$api.user.delete(currentUser.user_id);
      setDeleteDialogOpen(false);
      await fetchUsers();
    } catch (error) {
      console.error('删除用户失败:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          overflow: 'auto',
          maxHeight: 'calc(100vh - 250px)',
          background: (theme) => alpha(theme.palette.primary.main, 0.05),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="500">
            User Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            View and manage all user information
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchUsers}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
            disableElevation
          >
            Add User
          </Button>
        </Box>
      </Paper>


      <Paper
        elevation={2}

        sx={{
          borderRadius: 3,
          overflow: 'auto',
          // height: '70vh',
          maxHeight: '70vh',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}
      >
        {users.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <PersonIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No user data available
            </Typography>
            <Button variant="text" sx={{ mt: 2 }} onClick={() => setAddDialogOpen(true)}>
              Add the first user
            </Button>
          </Box>
        )
          : (
            <List disablePadding>
              {users.map((user, index) => (
                <Box key={user.user_id}>
                  <ListItem
                    sx={{
                      py: 2.5,
                      px: 3,
                      transition: 'all 0.2s',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' },
                    }}
                    onClick={() => navigate(`/posts?user_id=${user.user_id}&media_id=${user.media_id}`)}
                  >
                    <UserAvatar user={user} />
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            {user.username}
                          </Typography>
                          {user.is_verified && (
                            <Tooltip title="Verified User">
                              <VerifiedIcon color="primary" sx={{ fontSize: 20 }} />
                            </Tooltip>
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {user.first_name} {user.last_name} • {user.age} years old •{' '}
                            {user.gender === 'male'
                              ? 'Male'
                              : user.gender === 'female'
                                ? 'Female'
                                : 'Other'}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={`Birth: ${user.country_of_birth}`}
                              size="small"
                              variant="outlined"
                              sx={{ borderRadius: 1 }}
                            />
                            <Chip
                              label={`Residence: ${user.country_of_residence}`}
                              size="small"
                              variant="outlined"
                              sx={{ borderRadius: 1 }}
                            />
                          </Stack>
                        </>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={(e) => handleEditClick(user, e)}
                          sx={{
                            color: 'primary.main',
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                            '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2) },
                          }}
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentUser(user);
                            setDeleteDialogOpen(true);
                          }}
                          sx={{
                            color: 'error.main',
                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                            '&:hover': { bgcolor: (theme) => alpha(theme.palette.error.main, 0.2) },
                          }}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </ListItem>
                  {index < users.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
      </Paper>

      {/* 添加用户对话框 */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{ elevation: 24, sx: { borderRadius: 2 } }}
      >
        <DialogTitle component="div" sx={{ pb: 1, pt: 3, px: 3 }}>
          <Typography variant="h5" fontWeight="500">
            Add New User
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <UserForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setAddDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained" disableElevation>
            Add
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{ elevation: 24, sx: { borderRadius: 2 } }}
      >
        <DialogTitle component="div" sx={{ pb: 1, pt: 3, px: 3 }}>
          <Typography variant="h5" fontWeight="500">
            Edit User
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <UserForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disableElevation>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ elevation: 24, sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ pt: 3 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user "{currentUser?.username}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error" disableElevation>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default UserList;
