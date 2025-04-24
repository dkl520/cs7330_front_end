import { useState, useEffect } from 'react';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Stack,
    Divider,
    Tooltip,
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Refresh as RefreshIcon,
    Web as WebIcon
} from '@mui/icons-material';

// Media form component
const MediaForm = ({ formData, setFormData }) => (
    <Box component="form" sx={{ mt: 3 }}>
        <Stack spacing={3}>
            {/* <TextField
                fullWidth
                required
                label="Media ID"
                variant="outlined"
                value={formData.media_id}
                onChange={e => setFormData({ ...formData, media_id: e.target.value })}
                InputProps={{
                    sx: { borderRadius: 1.5 }
                }}
            /> */}
            <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                InputProps={{
                    sx: { borderRadius: 1.5 }
                }}
            />
        </Stack>
    </Box>
);

const MediaList = () => {
    const [medias, setMedias] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentMedia, setCurrentMedia] = useState(null);
    const [loading, setLoading] = useState(false);

    const emptyMediaData = {
        media_id: '',
        name: ''
    };

    const [formData, setFormData] = useState(emptyMediaData);

    const fetchMedias = async () => {
        try {
            setLoading(true);
            const response = await window.$api.media.list();
            setMedias(response || []);
        } catch (error) {
            console.error('Failed to fetch media list:', error);
            setMedias([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedias();
    }, []);

    const handleAdd = async () => {
        try {
            await window.$api.media.create(formData);
            setAddDialogOpen(false);
            setFormData(emptyMediaData);
            await fetchMedias();
        } catch (error) {
            console.error('Failed to create media:', error);
        }
    };

    const handleEdit = async () => {
        try {
            await window.$api.media.update(currentMedia.media_id, formData);
            setEditDialogOpen(false);
            setCurrentMedia(null);
            setFormData(emptyMediaData);
            await fetchMedias();
        } catch (error) {
            console.error('Failed to update media:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await window.$api.media.delete(currentMedia.media_id);
            setDeleteDialogOpen(false);
            setCurrentMedia(null);
            await fetchMedias();
        } catch (error) {
            console.error('Failed to delete media:', error);
        }
    };

    // Get random color for avatar based on media name
    const getAvatarColor = (name) => {
        const colors = [
            '#1976d2', '#2196f3', '#03a9f4', '#00bcd4',
            '#009688', '#4caf50', '#8bc34a', '#cddc39',
            '#ff9800', '#ff5722', '#f44336', '#e91e63',
            '#9c27b0', '#673ab7', '#3f51b5'
        ];
        const charCode = name.charCodeAt(0) || 0;
        return colors[charCode % colors.length];
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'M';
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header section */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 2,
                    background: (theme) => theme.palette.grey[50],
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="500" gutterBottom>
                        Media Platforms
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Manage and view all media platforms
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Tooltip title="Refresh list">
                        <div>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={fetchMedias}
                                disabled={loading}
                            >
                                Refresh
                            </Button>
                        </div>
                    </Tooltip>
                    <div>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setAddDialogOpen(true)}
                            disableElevation
                        >
                            Add Media
                        </Button>
                    </div>
                </Box>
            </Paper>

            {/* Media list */}
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    overflow: 'auto',
                    // height: '70vh',
                    // height: 'calc(100vh - 250px)',
                    maxHeight: '70vh'
                }}
            >
                {medias.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <WebIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                        <Typography variant="h6" color="text.secondary">
                            No media platforms available
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Click "Add Media" to create your first platform
                        </Typography>
                    </Box>
                ) : (
                    <List disablePadding>
                        {medias.map((media, index) => (
                            <ListItem
                                key={media.media_id}
                                divider={index < medias.length - 1}
                                sx={{
                                    py: 2,
                                    "&:hover": {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    }
                                }}
                                secondaryAction={
                                    <Box sx={{ display: 'flex' }}>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                onClick={() => {
                                                    setCurrentMedia(media);
                                                    setFormData(media);
                                                    setEditDialogOpen(true);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>


                                            
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => {
                                                    setCurrentMedia(media);
                                                    setDeleteDialogOpen(true);
                                                }}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                }
                            >
                                <Avatar
                                    sx={{
                                        mr: 2,
                                        bgcolor: getAvatarColor(media.name),
                                        width: 40,
                                        height: 40
                                    }}
                                >
                                    {getInitials(media.name)}
                                </Avatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" fontWeight={500}>
                                            {media.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            ID: {media.media_id}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>

            {/* Add media dialog */}
            <Dialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ pb: 1 }}>Add New Media Platform</DialogTitle>
                <Divider />
                <DialogContent sx={{ pt: 2 }}>
                    <DialogContentText sx={{ mb: 2 }}>
                        Please fill in the basic information for the media platform
                    </DialogContentText>
                    <MediaForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setAddDialogOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        disableElevation
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit media dialog */}
            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ pb: 1 }}>Edit Media Platform</DialogTitle>
                <Divider />
                <DialogContent sx={{ pt: 2 }}>
                    <DialogContentText sx={{ mb: 2 }}>
                        Modify media platform information
                    </DialogContentText>
                    <MediaForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setEditDialogOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEdit}
                        variant="contained"
                        disableElevation
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete confirmation dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ color: 'error.main', pb: 1 }}>Confirm Deletion</DialogTitle>
                <Divider />
                <DialogContent sx={{ pt: 2 }}>
                    <DialogContentText>
                        Are you sure you want to delete this media platform? This action cannot be undone.
                    </DialogContentText>
                    {currentMedia && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: 'error.light', borderRadius: 1, opacity: 0.8 }}>
                            <Typography variant="subtitle2" sx={{ color: 'error.contrastText' }}>
                                Platform: {currentMedia.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'error.contrastText' }}>
                                ID: {currentMedia.media_id}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        disableElevation
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MediaList;