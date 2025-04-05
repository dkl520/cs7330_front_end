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
  FormControlLabel,
  Grid
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
    setAddDialogOpen(false);
    setFormData(emptyUserData);
  };

  const handleSave = () => {
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(false);
  };

  const UserForm = ({ onSubmit, title }) => (
    <Box component="form" sx={{ mt: 3 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} width={"100%"}>
          <TextField
            fullWidth
            required
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} width={"100%"}>
          <TextField
            fullWidth
            required
            label="First Name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}  width={"100%"}>
          <TextField
            fullWidth
            required
            label="Last Name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} width={"100%"}>
          <TextField
            fullWidth
            type="number"
            label="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </Grid>
        <Grid item xs={12 } width={"100%"}>
          <TextField
            fullWidth
            label="Country of Birth"
            value={formData.country_of_birth}
            onChange={(e) => setFormData({ ...formData, country_of_birth: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} width={"100%"}>
          <TextField
            fullWidth
            label="Country of Residence"
            value={formData.country_of_residence}
            onChange={(e) => setFormData({ ...formData, country_of_residence: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} width={"100%"}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              label="Gender"
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} width={"100%"}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_verified}
                onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
              />
            }
            label="Verified"
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
            User List
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage and view all user information
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
          Add User
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
                      {user.first_name} {user.last_name} • {user.age} years • {user.gender === 'male' ? 'Male' : user.gender === 'female' ? 'Female' : 'Other'}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip
                        label={`Birth: ${user.country_of_birth}`}
                        size="small"
                        sx={{ bgcolor: 'primary.lighter' }}
                      />
                      <Chip
                        label={`Residence: ${user.country_of_residence}`}
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

      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddDialogOpen(false);
            setFormData(emptyUserData);
          }}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user "{currentUser?.username}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;