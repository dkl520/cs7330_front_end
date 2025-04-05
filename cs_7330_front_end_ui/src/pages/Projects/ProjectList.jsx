import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

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
    DialogActions,
    TextField,
    Grid,
    DialogContentText
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

import zhLocale from 'date-fns/locale/zh-CN';

const ProjectList = () => {
    const [projects, setProjects] = useState([
        {
            project_id: 1,
            name: "AI Research Project",
            manager_first_name: "Zhang",
            manager_last_name: "San",
            institute_id: 1,
            start_date: "2024-01-01",
            end_date: "2024-12-31"
        }
    ]);

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    const emptyProjectData = {
        name: '',
        manager_first_name: '',
        manager_last_name: '',
        institute_id: '',
        start_date: null,
        end_date: null
    };

    const [formData, setFormData] = useState(emptyProjectData);

    const ProjectForm = () => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhLocale}>
            <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} width={"100%"}>
                        <TextField
                            fullWidth
                            required
                            label="Project Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width={"100%"} >
                        <TextField
                            fullWidth
                            required
                            label="Manager First Name"
                            value={formData.manager_first_name}
                            onChange={(e) => setFormData({ ...formData, manager_first_name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} width={"100%"}>
                        <TextField
                            fullWidth
                            required
                            label="Manager Last Name"
                            value={formData.manager_last_name}
                            onChange={(e) => setFormData({ ...formData, manager_last_name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <DatePicker
                            label="Start Date"
                            value={formData.start_date}
                            onChange={(date) => setFormData({ ...formData, start_date: date })}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <DatePicker
                            label="End Date"
                            value={formData.end_date}
                            onChange={(date) => setFormData({ ...formData, end_date: date })}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} width={"100%"}>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="Institute ID"
                            value={formData.institute_id}
                            onChange={(e) => setFormData({ ...formData, institute_id: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Project List
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Manage and view all project information
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
                    Add Project
                </Button>
            </Box>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <List sx={{ p: 0 }}>
                    {projects.map((project, index) => (
                        <ListItem
                            key={project.project_id}
                            sx={{
                                p: 3,
                                borderBottom: index < projects.length - 1 ? 1 : 0,
                                borderColor: 'divider',
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                            secondaryAction={
                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentProject(project);
                                            setFormData(project);
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
                                            setCurrentProject(project);
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
                                <Typography variant="h6" gutterBottom>
                                    {project.name}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    <Chip
                                        icon={<PersonIcon />}
                                        label={`Manager: ${project.manager_first_name} ${project.manager_last_name}`}
                                        size="small"
                                        sx={{ bgcolor: 'primary.lighter' }}
                                    />
                                    <Chip
                                        icon={<CalendarIcon />}
                                        label={`${project.start_date} ~ ${project.end_date}`}
                                        size="small"
                                        sx={{ bgcolor: 'secondary.lighter' }}
                                    />
                                </Stack>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Add Project Dialog */}
            <Dialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Add New Project</DialogTitle>
                <DialogContent>
                    <ProjectForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setAddDialogOpen(false);
                        setFormData(emptyProjectData);
                    }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // TODO: Implement add logic
                            setAddDialogOpen(false);
                            setFormData(emptyProjectData);
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Project Dialog */}
            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <ProjectForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // TODO: Implement save logic
                            setEditDialogOpen(false);
                        }}
                    >
                        Save
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
                    <DialogContentText>
                        Are you sure you want to delete project "{currentProject?.name}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            // TODO: Implement delete logic
                            setDeleteDialogOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProjectList;