import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import zhLocale from 'date-fns/locale/zh-CN';
import { useParams, useNavigate } from 'react-router-dom';
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
    alpha,
    TextField
} from '@mui/material';
import {
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    School as SchoolIcon
} from '@mui/icons-material';


const ProjectForm = ({ formData, setFormData }) => {


    // 格式化 Date → "YYYY-MM-DD"
    const formatDate = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };
    // 把 "YYYY-MM-DD" 转成 Date
    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhLocale}>
            <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Project Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />

                <TextField
                    fullWidth
                    required
                    label="Manager First Name"
                    value={formData.manager_first_name}
                    onChange={e => setFormData({ ...formData, manager_first_name: e.target.value })}
                />

                <TextField
                    fullWidth
                    required
                    label="Manager Last Name"
                    value={formData.manager_last_name}
                    onChange={e => setFormData({ ...formData, manager_last_name: e.target.value })}
                />

                <DatePicker
                    label="Start Date"
                    value={parseDate(formData.start_date)}
                    onChange={date => {
                        setFormData({ ...formData, start_date: formatDate(date) });
                    }}
                    slotProps={{
                        textField: { fullWidth: true, required: true }
                    }}
                />

                <DatePicker
                    label="End Date"
                    value={parseDate(formData.end_date)}
                    onChange={date => {
                        setFormData({ ...formData, end_date: formatDate(date) });
                    }}
                    slotProps={{
                        textField: { fullWidth: true, required: true }
                    }}
                />
            </Stack>
        </LocalizationProvider>

    );
};




const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const emptyProjectData = {
        name: '',
        manager_first_name: '',
        manager_last_name: '',
        institute_id: id,
        start_date: '',
        end_date: ''
    };
    const [formData, setFormData] = useState(emptyProjectData);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await window.$api.project.list({ institute_id: id });
            setProjects(response || []);
        } catch (error) {
            console.error('获取项目列表失败:', error);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAdd = async () => {
        try {
            await window.$api.project.create(formData);
            setAddDialogOpen(false);
            setFormData(emptyProjectData);
            await fetchProjects();
        } catch (error) {
            console.error('创建项目失败:', error);
        }
    };

    const handleEdit = async () => {
        try {
            await window.$api.project.update(currentProject.project_id, formData);
            setEditDialogOpen(false);
            setCurrentProject(null);
            setFormData(emptyProjectData);
            await fetchProjects();
        } catch (error) {
            console.error('更新项目失败:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await window.$api.project.delete(currentProject.project_id);
            setDeleteDialogOpen(false);
            setCurrentProject(null);
            await fetchProjects();
        } catch (error) {
            console.error('删除项目失败:', error);
        }
    };

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
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
                    Add Project
                </Button>
            </Box>


            <Paper elevation={3}>
                <List>
                    {loading ? (
                        <ListItem>
                            <Typography>loading...</Typography>
                        </ListItem>
                    ) : projects.length === 0 ? (
                        <ListItem>
                            <Typography>No project data available</Typography>
                        </ListItem>

                    ) : (
                        projects.map((project, index) => (
                            <ListItem
                                onClick={() => navigate(`/projectresult/${project.project_id}`)}
                                key={project.project_id}
                                sx={{
                                    p: 3,
                                    borderBottom: index < projects.length - 1 ? 1 : 0,
                                    borderColor: 'divider'
                                }}
                                secondaryAction={
                                    <Stack direction="row" spacing={1}>
                                        {/* <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentProject(project);
                                                setFormData(project);
                                                setEditDialogOpen(true);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton> */}



                                        <Tooltip title="Edit">
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentProject(project);
                                                    setFormData(project);
                                                    setEditDialogOpen(true);
                                                }}
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

                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentProject(project);
                                                setDeleteDialogOpen(true);
                                            }}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="h6">{project.name}</Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Stack spacing={2}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <PersonIcon fontSize="small" />
                                                    <Typography variant="body2">
                                                        {`${project.manager_first_name} ${project.manager_last_name}`}
                                                    </Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <SchoolIcon fontSize="small" />
                                                    <Typography variant="body2">
                                                        {`Institute ID: ${project.institute_id}`}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" spacing={2}>
                                                <Chip
                                                    icon={<CalendarIcon />}
                                                    label={`start: ${project.start_date}`}
                                                    size="small"
                                                />
                                                <Chip
                                                    icon={<CalendarIcon />}
                                                    label={`end: ${project.end_date}`}
                                                    size="small"
                                                />
                                            </Stack>
                                        </Stack>
                                    }
                                    secondaryTypographyProps={{ component: 'div' }}
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>

            {/* 添加项目对话框 */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle component="div">添加新项目</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>请填写项目基本信息</DialogContentText>
                    <ProjectForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>取消</Button>
                    <Button onClick={handleAdd} variant="contained">
                        添加
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 编辑项目对话框 */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle component="div">Edit Project</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>Please modify the project information</DialogContentText>
                    <ProjectForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEdit} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle component="div">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the project "{currentProject?.name}"? This action cannot be undone.
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

export default ProjectList;
