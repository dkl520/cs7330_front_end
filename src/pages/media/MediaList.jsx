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
    Stack
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';

// 媒体表单组件
const MediaForm = ({ formData, setFormData }) => (
    <Box component="form" sx={{ mt: 3 }}>
        <Stack spacing={2}>
            <TextField
                fullWidth
                required
                label="媒体ID"
                variant="outlined"
                value={formData.media_id}
                onChange={e => setFormData({ ...formData, media_id: e.target.value })}
            />
            <TextField
                fullWidth
                required
                label="名称"
                variant="outlined"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
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
            console.error('获取媒体列表失败:', error);
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
            console.error('创建媒体失败:', error);
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
            console.error('更新媒体失败:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await window.$api.media.delete(currentMedia.media_id);
            setDeleteDialogOpen(false);
            setCurrentMedia(null);
            await fetchMedias();
        } catch (error) {
            console.error('删除媒体失败:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        媒体列表
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        管理和查看所有媒体平台
                    </Typography>
                </Box>
                <Box>
                    <IconButton
                        onClick={fetchMedias}
                        sx={{ mr: 1 }}
                        disabled={loading}
                    >
                        <RefreshIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setAddDialogOpen(true)}
                    >
                        添加媒体
                    </Button>
                </Box>
            </Box>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
                <List>
                    {medias.map((media, index) => (
                        <ListItem
                            key={media.media_id}
                            divider={index < medias.length - 1}
                            secondaryAction={
                                <Box>
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
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            setCurrentMedia(media);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText
                                primary={media.name}
                                secondary={`ID: ${media.media_id}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* 添加媒体对话框 */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>添加新媒体</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        请填写媒体平台的基本信息
                    </DialogContentText>
                    <MediaForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>取消</Button>
                    <Button onClick={handleAdd} variant="contained">添加</Button>
                </DialogActions>
            </Dialog>

            {/* 编辑媒体对话框 */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>编辑媒体</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        修改媒体平台信息
                    </DialogContentText>
                    <MediaForm formData={formData} setFormData={setFormData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>取消</Button>
                    <Button onClick={handleEdit} variant="contained">保存</Button>
                </DialogActions>
            </Dialog>

            {/* 删除确认对话框 */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>确认删除</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        确定要删除这个媒体平台吗？此操作无法撤销。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        删除
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MediaList;