import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Box, Typography, Button, Paper, List, ListItem,
    ListItemText, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Stack, Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const InstituteList = () => {
    const navigate = useNavigate();
    const [institutes, setInstitutes] = useState([
        { institute_id: 1, name: "Tsinghua University AI Research Institute", description: "Focusing on cutting-edge AI technology research" }
    ]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentInstitute, setCurrentInstitute] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', description: '' });
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newInstituteData, setNewInstituteData] = useState({ name: '', description: '' });

    const handleEditClick = (institute, e) => {
        e.stopPropagation();
        setCurrentInstitute(institute);
        setEditFormData({ name: institute.name, description: institute.description });
        setEditDialogOpen(true);
    };

    const handleEditSubmit = () => {
        setInstitutes(institutes.map(institute => 
            institute.institute_id === currentInstitute.institute_id
                ? { ...institute, ...editFormData }
                : institute
        ));
        setEditDialogOpen(false);
    };

    const handleDeleteConfirm = () => {
        setInstitutes(institutes.filter(institute => 
            institute.institute_id !== currentInstitute.institute_id
        ));
        setDeleteDialogOpen(false);
    };

    const handleAddSubmit = () => {
        const newInstitute = {
            institute_id: institutes.length + 1,
            ...newInstituteData
        };
        setInstitutes([...institutes, newInstitute]);
        setAddDialogOpen(false);
        setNewInstituteData({ name: '', description: '' });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" gutterBottom>Institute List</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Manage and view all research institute information</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
                    Add Institute
                </Button>
            </Box>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <List>
                    {institutes.map((institute) => (
                        <ListItem
                            key={institute.institute_id}
                            sx={{ p: 3, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                            onClick={() => navigate(`/projects`)}
                            secondaryAction={
                                <Stack direction="row" spacing={1}>
                                    <IconButton onClick={(e) => handleEditClick(institute, e)}><EditIcon /></IconButton>
                                    <IconButton onClick={(e) => { e.stopPropagation(); setCurrentInstitute(institute); setDeleteDialogOpen(true); }}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Stack>
                            }
                        >
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="h6" gutterBottom>
                                    {institute.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    {institute.description}
                                </Typography>
                                <Chip
                                    label={`ID: ${institute.institute_id}`}
                                    size="small"
                                    sx={{ bgcolor: 'grey.100' }}
                                />
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Add Institute Dialog */}
            <Dialog 
                open={addDialogOpen} 
                onClose={() => setAddDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Add New Institute</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Institute Name"
                            fullWidth
                            value={newInstituteData.name}
                            onChange={(e) => setNewInstituteData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        <TextField
                            label="Institute Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={newInstituteData.description}
                            onChange={(e) => setNewInstituteData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleAddSubmit}
                        disabled={!newInstituteData.name.trim()}
                    >
                        Confirm Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Institute Dialog */}
            <Dialog 
                open={editDialogOpen} 
                onClose={() => setEditDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit Institute</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Institute Name"
                            fullWidth
                            value={editFormData.name}
                            onChange={(e) => setEditFormData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        <TextField
                            label="Institute Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={editFormData.description}
                            onChange={(e) => setEditFormData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleEditSubmit}
                        disabled={!editFormData.name.trim()}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete the institute "{currentInstitute?.name}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button 
                        color="error" 
                        variant="contained"
                        onClick={handleDeleteConfirm}
                    >
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default InstituteList;