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

    // 获取研究所列表
    const fetchInstitutes = async () => {
        try {
            setLoading(true);
            const response = await window.$api.institute.list();
            setInstitutes(response || []);
        } catch (error) {
            console.error('获取研究所列表失败:', error);
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
            console.error('更新研究所失败:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await window.$api.institute.delete(currentInstitute.institute_id);
            await fetchInstitutes();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('删除研究所失败:', error);
        }
    };

    const handleAddSubmit = async () => {
        try {
            await window.$api.institute.create(newInstituteData);
            await fetchInstitutes();
            setAddDialogOpen(false);
            setNewInstituteData({ name: '', description: '' });
        } catch (error) {
            console.error('创建研究所失败:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" gutterBottom>研究所列表</Typography>
                    <Typography variant="subtitle1" color="text.secondary">管理和查看所有研究所信息</Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
                    添加研究所
                </Button>
            </Box>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <List>
                    {loading ? (
                        <ListItem>
                            <Typography>加载中...</Typography>
                        </ListItem>
                    ) : institutes.length === 0 ? (
                        <ListItem>
                            <Typography>暂无研究所数据</Typography>
                        </ListItem>
                    ) : (
                        institutes.map((institute) => (
                            <ListItem
                                key={institute.institute_id}
                                sx={{ p: 3, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                                onClick={() => navigate(`/institutes/${institute.institute_id}`)}
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
                        ))
                    )}
                </List>
            </Paper>

            {/* 添加研究所对话框 */}
            <Dialog 
                open={addDialogOpen} 
                onClose={() => setAddDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>添加新研究所</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="研究所名称"
                            fullWidth
                            value={newInstituteData.name}
                            onChange={(e) => setNewInstituteData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        {/* <TextField
                            label="研究所描述"
                            fullWidth
                            multiline
                            rows={4}
                            value={newInstituteData.description}
                            onChange={(e) => setNewInstituteData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                        /> */}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>取消</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleAddSubmit}
                        disabled={!newInstituteData.name.trim()}
                    >
                        确认添加
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 编辑研究所对话框 */}
            <Dialog 
                open={editDialogOpen} 
                onClose={() => setEditDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>编辑研究所</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="研究所名称"
                            fullWidth
                            value={editFormData.name}
                            onChange={(e) => setEditFormData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        {/* <TextField
                            label="研究所描述"
                            fullWidth
                            multiline
                            rows={4}
                            value={editFormData.description}
                            onChange={(e) => setEditFormData(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                        /> */}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>取消</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleEditSubmit}
                        disabled={!editFormData.name.trim()}
                    >
                        保存更改
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
                    <Typography>
                        确定要删除研究所 "{currentInstitute?.name}" 吗？此操作无法撤销。
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
                    <Button 
                        color="error" 
                        variant="contained"
                        onClick={handleDeleteConfirm}
                    >
                        确认删除
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default InstituteList;