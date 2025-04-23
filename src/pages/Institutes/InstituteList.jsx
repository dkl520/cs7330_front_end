import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Box, Typography, Button, Paper, List, ListItem,
    ListItemText, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Stack, Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const InstituteList = () => {
    const navigate = useNavigate();
    const [institutes, setInstitutes] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentInstitute, setCurrentInstitute] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', description: '' });
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newInstituteData, setNewInstituteData] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);

    // Fetch institute list
    const fetchInstitutes = async () => {
        try {
            setLoading(true);
            const response = await window.$api.institute.list();
            setInstitutes(response || []);
        } catch (error) {
            console.error('Failed to fetch institutes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutes();
    }, []);

    const handleEditClick = (institute, e) => {
        e.stopPropagation();
        setCurrentInstitute(institute);
        setEditFormData({ name: institute.name, description: institute.description });
        setEditDialogOpen(true);
    };

    const handleEditSubmit = async () => {
        try {
            await window.$api.institute.update(currentInstitute.institute_id, editFormData);
            await fetchInstitutes();
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Failed to update institute:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await window.$api.institute.delete(currentInstitute.institute_id);
            await fetchInstitutes();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Failed to delete institute:', error);
        }
    };

    const handleAddSubmit = async () => {
        try {
            await window.$api.institute.create(newInstituteData);
            await fetchInstitutes();
            setAddDialogOpen(false);
            setNewInstituteData({ name: '', description: '' });
        } catch (error) {
            console.error('Failed to create institute:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mb={4}
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 },
                    alignItems: { xs: 'flex-start', sm: 'center' }
                }}
            >
                <Box>
                    <Typography 
                        variant="h4" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 600,
                            color: 'primary.main'
                        }}
                    >
                        Institute List
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        color="text.secondary"
                        sx={{ fontSize: '1.1rem' }}
                    >
                        Manage and view all institute information
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
                        boxShadow: 3,
                        textTransform: 'none',
                        fontSize: '1rem'
                    }}
                >
                    Add Institute
                </Button>
            </Box>

            <Paper 
                elevation={3} 
                sx={{ 
                    borderRadius: 4,
                    overflow: 'auto',
                    maxHeight: 'calc(100vh - 250px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
            >
                <List sx={{ p: 0 }}>
                    {loading ? (
                        <ListItem sx={{ py: 4, justifyContent: 'center' }}>
                            <Typography>Loading...</Typography>
                        </ListItem>
                    ) : institutes.length === 0 ? (
                        <ListItem sx={{ py: 6, justifyContent: 'center' }}>
                            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                No institutes available
                            </Typography>
                        </ListItem>
                    ) : (
                        institutes.map((institute, index) => (
                            <ListItem
                                key={institute.institute_id}
                                sx={{ 
                                    p: 3,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'action.hover' },
                                    borderBottom: index < institutes.length - 1 ? '1px solid #f0f0f0' : 'none'
                                }}
                                onClick={() => navigate(`/projects/${institute.institute_id}`)}
                                secondaryAction={
                                    <Stack direction="row" spacing={1}>
                                        <IconButton 
                                            onClick={(e) => handleEditClick(institute, e)}
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
                                                setCurrentInstitute(institute); 
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
                                <Box sx={{ width: '100%' }}>
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {institute.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2, lineHeight: 1.6 }}
                                    >
                                        {institute.description}
                                    </Typography>
                                    <Chip
                                        label={`ID: ${institute.institute_id}`}
                                        size="small"
                                        sx={{ 
                                            bgcolor: 'primary.lighter',
                                            color: 'primary.dark',
                                            fontWeight: 500
                                        }}
                                    />
                                </Box>
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>

            {/* Add Institute Dialog */}
            <Dialog 
                open={addDialogOpen} 
                onClose={() => setAddDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 }
                }}
            >
                <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Add New Institute
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ px: 3 }}>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <TextField
                            label="Institute Name"
                            fullWidth
                            value={newInstituteData.name}
                            onChange={(e) => setNewInstituteData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                            variant="outlined"
                        />
                        {/* <TextField
                            label="Institute Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={newInstituteData.description}
                            onChange={(e) => setNewInstituteData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                            variant="outlined"
                        /> */}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 3 }}>
                    <Button 
                        onClick={() => setAddDialogOpen(false)}
                        sx={{ 
                            textTransform: 'none',
                            fontWeight: 500
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleAddSubmit}
                        disabled={!newInstituteData.name.trim()}
                        sx={{ 
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                            fontWeight: 500
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Institute Dialog */}
            <Dialog 
                open={editDialogOpen} 
                onClose={() => setEditDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3 }
                }}
            >
                <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Edit Institute
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ px: 3 }}>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <TextField
                            label="Institute Name"
                            fullWidth
                            value={editFormData.name}
                            onChange={(e) => setEditFormData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                            variant="outlined"
                        />
                        {/* <TextField
                            label="Institute Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={editFormData.description}
                            onChange={(e) => setEditFormData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                            variant="outlined"
                        /> */}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 3 }}>
                    <Button 
                        onClick={() => setEditDialogOpen(false)}
                        sx={{ 
                            textTransform: 'none',
                            fontWeight: 500
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleEditSubmit}
                        disabled={!editFormData.name.trim()}
                        sx={{ 
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                            fontWeight: 500
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: { borderRadius: 3 }
                }}
            >
                <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Confirm Deletion
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ px: 3 }}>
                    <Typography sx={{ mt: 1 }}>
                        Are you sure you want to delete the institute "{currentInstitute?.name}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 3 }}>
                    <Button 
                        onClick={() => setDeleteDialogOpen(false)}
                        sx={{ 
                            textTransform: 'none',
                            fontWeight: 500
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="error" 
                        variant="contained"
                        onClick={handleDeleteConfirm}
                        sx={{ 
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 3,
                            fontWeight: 500
                        }}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default InstituteList;