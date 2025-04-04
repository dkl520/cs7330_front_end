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
    const [institutes] = useState([
        { institute_id: 1, name: "清华大学人工智能研究院", description: "专注于AI前沿技术研究" }
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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" gutterBottom>研究所列表</Typography>
                    <Typography variant="subtitle1" color="text.secondary">管理和查看所有研究机构信息</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
                    添加研究所
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
        </Container>
    );
};

export default InstituteList;
