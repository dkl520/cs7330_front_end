import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import {
    Container, Box, Typography, Button, Paper, List, ListItem,
    ListItemText, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Stack
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProjectField = () => {
    const { id: project_id } = useParams();
    const [fields, setFields] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const { id } = useParams();
    const emptyFieldData = {
        field_id: '',
        field_name: '',
        project_id: project_id
    };

    const [formData, setFormData] = useState(emptyFieldData);

    const fetchFields = async () => {
        try {
            setLoading(true);
            const response = await window.$api.projectField.list({ project_id });
            setFields(response || []);
        } catch (error) {
            console.error('获取字段列表失败:', error);
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
            console.error('创建字段失败:', error);
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
            console.error('更新字段失败:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await window.$api.projectField.delete(currentField.field_id);
            setDeleteDialogOpen(false);
            setCurrentField(null);
            await fetchFields();
        } catch (error) {
            console.error('删除字段失败:', error);
        }
    };

    // 字段表单组件
    const FieldForm = ({ formData, setFormData }) => (
        <Stack spacing={2} sx={{ mt: 2 }}>
            {/* <TextField
                fullWidth
                required
                label="字段ID"
                value={formData.field_id}
                onChange={e => setFormData({ ...formData, field_id: e.target.value })}
            /> */}
            <TextField
                fullWidth
                required
                label="字段名称"
                value={formData.field_name}
                onChange={e => setFormData({ ...formData, field_name: e.target.value })}
            />
        </Stack>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        项目字段列表
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        管理和查看项目的分析字段
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
                    添加字段
                </Button>
            </Box>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
                <List>
                    {loading ? (
                        <ListItem>
                            <Typography>加载中...</Typography>
                        </ListItem>
                    ) : fields.length === 0 ? (
                        <ListItem>
                            <Typography>暂无字段数据</Typography>
                        </ListItem>
                    ) : (
                        fields.map((field) => (
                            <ListItem
                                key={field.field_id}
                                secondaryAction={
                                    <Box>
                                        <IconButton
                                            edge="end"
                                            onClick={() => {
                                                setCurrentField(field);
                                                setFormData(field);
                                                setEditDialogOpen(true);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            onClick={() => {
                                                setCurrentField(field);
                                                setDeleteDialogOpen(true);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <ListItemText
                                    primary={field.field_name}
                                    secondary={`ID: ${field.field_id}`}
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>

            {/* 添加字段对话框 */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>添加新字段</DialogTitle>
                <DialogContent>
                    <FieldForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>取消</Button>
                    <Button onClick={handleAdd} variant="contained">添加</Button>
                </DialogActions>
            </Dialog>

            {/* 编辑字段对话框 */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>编辑字段</DialogTitle>
                <DialogContent>
                    <FieldForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>取消</Button>
                    <Button onClick={handleEdit} variant="contained">保存</Button>
                </DialogActions>
            </Dialog>

            {/* 删除字段确认对话框 */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>确认删除</DialogTitle>
                <DialogContent>
                    <Typography>确定要删除这个字段吗？此操作不可撤销。</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">删除</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProjectField;