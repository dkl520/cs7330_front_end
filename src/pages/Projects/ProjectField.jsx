import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container, Box, Typography, Button, Paper, List, ListItem,
    ListItemText, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Stack, Chip, Avatar
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Field form component
const FieldForm = ({ formData, setFormData }) => (
    <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
            fullWidth
            type="text"
            label="Field Name"
            required
            variant="outlined"
            value={formData.field_name}
            onChange={e => setFormData({ ...formData, field_name: e.target.value })}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                }
            }}
        />
    </Stack>
);

const ProjectField = () => {
    const { id: project_id } = useParams();
    const [fields, setFields] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const emptyFieldData = {
        field_id: '',
        field_name: '',
        project_id: project_id
    };

    const [formData, setFormData] = useState(emptyFieldData);

    const fetchFields = async () => {
        try {
            setLoading(true);
            const response = await window.$api.projectField.list(project_id);
            setFields(response || []);
        } catch (error) {
            console.error('Failed to fetch field list:', error);
            setFields([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFields();
    }, [project_id]);

    const handleAdd = async () => {
        try {
            await window.$api.projectField.create(formData);
            setAddDialogOpen(false);
            setFormData(emptyFieldData);
            await fetchFields();
        } catch (error) {
            console.error('Failed to create field:', error);
        }
    };

    const handleEdit = async () => {
        try {
            await window.$api.projectField.update(currentField.field_id, formData);
            setEditDialogOpen(false);
            setCurrentField(null);
            setFormData(emptyFieldData);
            await fetchFields();
        } catch (error) {
            console.error('Failed to update field:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await window.$api.projectField.delete(currentField.field_id);
            setDeleteDialogOpen(false);
            setCurrentField(null);
            await fetchFields();
        } catch (error) {
            console.error('Failed to delete field:', error);
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
                    background: (theme) => theme.palette.grey[50]
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                }}>
                    <Box>
                        <Typography variant="h4" fontWeight="500" gutterBottom>
                            Project Fields
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Manage and view project analysis fields
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
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        Add Field
                    </Button>
                </Box>
            </Paper>

            <Paper 
                elevation={3} 
                sx={{ 
                    borderRadius: 3, 
                   
                    overflow: 'auto',  maxHeight: '70vh',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
            >
                <List sx={{ p: 0 }}>
                    {loading ? (
                        <ListItem sx={{ py: 4, justifyContent: 'center' }}>
                            <Typography>Loading...</Typography>
                        </ListItem>
                    ) : fields.length === 0 ? (
                        <ListItem sx={{ py: 6, justifyContent: 'center' }}>
                            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                No fields available
                            </Typography>
                        </ListItem>
                    ) : (
                        fields.map((field, index) => (
                            <ListItem
                                key={field.field_id}
                                sx={{
                                    p: 3,
                                    borderBottom: index < fields.length - 1 ? '1px solid #f0f0f0' : 'none',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                                secondaryAction={
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            onClick={() => {
                                                setCurrentField(field);
                                                setFormData(field);
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
                                            onClick={() => {
                                                setCurrentField(field);
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
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar 
                                        sx={{ 
                                            bgcolor: 'primary.light',
                                            mr: 2
                                        }}
                                    >
                                        {field.field_name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                            {field.field_name}
                                        </Typography>
                                        <Chip
                                            label={`ID: ${field.field_id}`}
                                            size="small"
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                </Box>
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>

            {/* Add Field Dialog */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>Add New Field</DialogTitle>
                <DialogContent>
                    <FieldForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Field Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Field</DialogTitle>
                <DialogContent>
                    <FieldForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEdit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Field Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this field? This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProjectField;