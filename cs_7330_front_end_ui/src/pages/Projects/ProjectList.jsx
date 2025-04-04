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
    Person as PersonIcon
} from '@mui/icons-material';



import zhLocale from 'date-fns/locale/zh-CN';

const ProjectList = () => {
    const [projects, setProjects] = useState([
        {
            project_id: 1,
            name: "AI研究项目",
            manager_first_name: "张",
            manager_last_name: "三",
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="项目名称"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            label="项目经理姓"
                            value={formData.manager_first_name}
                            onChange={(e) => setFormData({ ...formData, manager_first_name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            required
                            label="项目经理名"
                            value={formData.manager_last_name}
                            onChange={(e) => setFormData({ ...formData, manager_last_name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="开始日期"
                            value={formData.start_date}
                            onChange={(date) => setFormData({ ...formData, start_date: date })}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="结束日期"
                            value={formData.end_date}
                            onChange={(date) => setFormData({ ...formData, end_date: date })}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="研究所ID"
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
                        项目列表
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        管理和查看所有项目信息
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
                    添加项目
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
                                        label={`项目经理: ${project.manager_first_name}${project.manager_last_name}`}
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

            {/* 添加项目对话框 */}
            <Dialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>添加新项目</DialogTitle>
                <DialogContent>
                    <ProjectForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setAddDialogOpen(false);
                        setFormData(emptyProjectData);
                    }}>
                        取消
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // TODO: 实现添加逻辑
                            setAddDialogOpen(false);
                            setFormData(emptyProjectData);
                        }}
                    >
                        添加
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 编辑项目对话框 */}
            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>编辑项目</DialogTitle>
                <DialogContent>
                    <ProjectForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>
                        取消
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // TODO: 实现保存逻辑
                            setEditDialogOpen(false);
                        }}
                    >
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
                        确定要删除项目 "{currentProject?.name}" 吗？此操作无法撤销。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            // TODO: 实现删除逻辑
                            setDeleteDialogOpen(false);
                        }}
                    >
                        删除
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProjectList;









// const ProjectList = () => {
//     const [value, setValue] = useState(null);

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//                 label="选择日期"
//                 value={value}
//                 onChange={(newValue) => setValue(newValue)}
//                 slotProps={{ textField: { fullWidth: true } }}
//             />
//         </LocalizationProvider>
//     );
// };

// export default ProjectList;