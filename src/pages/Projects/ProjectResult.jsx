import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    IconButton,
    Paper,
    Box,
    Chip,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Divider
} from '@mui/material';
import {
    Add as AddIcon,
    Refresh as RefreshIcon,
    ExpandMore as ExpandMoreIcon,
    LocationOn as LocationIcon,
    Image as ImageIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    AccessTime as AccessTimeIcon,
    Person as PersonIcon,
    Article as ArticleIcon,
    Analytics as AnalyticsIcon
} from '@mui/icons-material';

const ProjectResult = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const { id: project_id } = useParams();
    const [fields, setFields] = useState([]);
    const [availablePosts, setAvailablePosts] = useState([]);

    const [postToAdd, setPostToAdd] = useState([]);  //添加

    const [postsList, setPostsList] = useState([]); //posts展示
    const [projectPosts, setprojectPosts] = useState([]); //项目的postids

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const postAll = [
        {
            project_post_id: '1',
            project_id: '1',
            post_id: '1',
            content: '北京欢迎你',
            user_id: '1',
            media_id: 'None',
            location_city: 'Beijing',
            location_state: '',
            location_country: 'China',
            has_multimedia: false,
            likes: 12,
            dislikes: 20,
            post_time: '2025/4/23 12:34:29',

            analysis: [
                { fieldid: '1', fieldname: 'sentiment', fieldvalue: 'positive' },
            ]
        }
    ]




    let postids = []
    // useEffect(() => {
    //     fetchPosts();
    // }, []);

    useEffect(() => {
        fetchProjectPosts();
        // fetchPosts();
    })
    useEffect(() => {
        // In a real application, you would fetch this data from an API
        const mockPosts = [
            {
                project_post_id: '1',
                project_id: '1',
                post_id: '1',
                content: '北京欢迎你',
                user_id: '1',
                media_id: 'None',
                location_city: 'Beijing',
                location_state: '',
                location_country: 'China',
                has_multimedia: false,
                likes: 12,
                dislikes: 20,
                post_time: '2025/4/23 12:34:29',
                analysis: [
                    { fieldid: '1', fieldname: 'sentiment', fieldvalue: 'positive' },
                    { fieldid: '2', fieldname: 'topic', fieldvalue: 'tourism' }
                ]
            },

        ];
        setPosts(mockPosts);
    }, []);
    useEffect(() => {
        fetchFields();
    }, [project_id]);
    const fetchFields = async () => {
        try {
            // setLoading(true);
            const response = await window.$api.projectField.list(project_id);
            setFields(response || []);
        } catch (error) {
            console.error('Failed to fetch field list:', error);
            setFields([]);
        } finally {
            // setLoading(false);
        }
    };
    //弹窗表单
    const fetchPosts = async (postids) => {
        try {
            const response = await window.$api.post.list();
            setPostToAdd(response || []);
        } catch (error) {
            console.error('Failed to fetch post list:', error);
            // setPosts([]);
        }
    };
    // 项目的postids_setprojectPosts
    const fetchProjectPosts = async () => {
        try {
            const response = await window.$api.post.getPorjectPost(project_id);
            let project_posts = response || [];
            postids = project_posts.map(post => post.post_id);
            postids = [set(postids)];
            postAll = response || [];
            setprojectPosts(response || []);
            await fetchAvianPosts();
            await fetchAnalystResult();
        } catch (error) {
            console.error('获取可用帖子失败:', error);
        }
    };
    //获取posts展示
    const fetchAvianPosts = async () => {
        try {
            const response = await window.$api.post.getPostBatchById(postids, true);

            const mergedPosts = postAll.map(post => {
                // 在 response 里找同一个 post_id
                const extra = response.find(p => p.post_id === post.post_id);
                return extra ? { ...post, ...extra } : post;
            });
            postAll = mergedPosts;

            setPostsList(response || []);

        } catch (error) {
            console.error('获取可用帖子失败:', error);
        }
    }
    //获取分析结果
    const fetchAnalystResult = async (post) => {
        try {
            // project_post_id
            const response = await window.$api.analysisResult.list({ project_post_id });



            let analysis = response || [];
        } catch (error) {
            console.error('Failed to fetch post list:', error);
            // setPosts([]);
        }
    };


    const [formData, setFormData] = useState({
        fieldname: '',
        fieldvalue: ''
    });

    // Mock data for demonstration


    const handleSaveFromDialog = async () => {
        try {
            // 准备批量转发的数据
            const bulkProjectsData = {
                project_id: project_id, // 使用当前用户ID
                post_ids: selectedIds // 已选择的帖子ID数组
            };
            // 调用批量转发API
            await window.$api.projectPost.bulkProjectPost(bulkProjectsData);
            // 重新获取转发列表
            await fetchProjectPosts();
            // 清理状态
            setSelectedIds([]);
            setAddDialogOpen(false);
        } catch (error) {
            console.error('批量转发失败:', error);
        }
    };

    const handleOpenDialog = (postId) => {
        setCurrentPostId(postId);
        setOpen(true);
    };

    const toggleId = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setFormData({
            fieldname: '',
            fieldvalue: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddAnalysis = () => {
        if (!formData.fieldname || !formData.fieldvalue) {
            return;
        }

        // const updatedPosts = posts.map(post => {
        //     if (post.post_id === currentPostId) {
        //         const newFieldId = post.analysis.length > 0
        //             ? (Math.max(...post.analysis.map(a => parseInt(a.fieldid))) + 1).toString()
        //             : '1';

        //         return {
        //             ...post,
        //             analysis: [
        //                 ...post.analysis,
        //                 {
        //                     fieldid: newFieldId,
        //                     fieldname: formData.fieldname,
        //                     fieldvalue: formData.fieldvalue
        //                 }
        //             ]
        //         };
        //     }
        //     return post;
        // });

        setPosts(updatedPosts);
        handleCloseDialog();
    };

    const navigateToProjectField = () => {
        navigate('/projectfield');
    };

    const handleAddPost = () => {
        // This would typically open a form to add a new post
        // For demonstration, we'll just add a dummy post
        const newPostId = (Math.max(...posts.map(p => parseInt(p.post_id))) + 1).toString();
        const newPost = {
            post_id: newPostId,
            content: 'New Post',
            user_id: '1',
            media_id: '',
            location_city: '',
            location_state: '',
            location_country: '',
            has_multimedia: false,
            likes: 0,
            dislikes: 0,
            post_time: new Date().toISOString(),
            analysis: []
        };

        setPosts([...posts, newPost]);
    };

    // Format the location string
    const formatLocation = (city, state, country) => {
        const parts = [city, state, country].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : '未知';
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page header */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 2,
                    background: (theme) => theme.palette.grey[50],
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Typography variant="h4" gutterBottom fontWeight="500">
                        结果分析
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        查看并管理所有帖子分析结果
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <div>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={() => setPosts([...posts])} // Mock refresh
                        >
                            刷新
                        </Button>
                    </div>
                    <div>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={async () => {
                                // fetchProjectPosts();
                                fetchPosts();
                                setAddDialogOpen(true);
                            }}
                            disableElevation
                        >
                            添加帖子
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={navigateToProjectField}
                            disableElevation
                        >
                            项目字段
                        </Button>
                    </div>
                </Box>
            </Paper>

            {/* Posts list as accordions */}


            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="lg">
                <DialogTitle>批量转发</DialogTitle>
                <DialogContent dividers>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>选择</TableCell>
                                <TableCell>content</TableCell>
                                <TableCell>location_city</TableCell>
                                <TableCell>location_state</TableCell>
                                <TableCell>location_country</TableCell>
                                <TableCell>has_multimedia</TableCell>
                                <TableCell>likes</TableCell>
                                <TableCell>dislikes</TableCell>
                                <TableCell>post_time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {postToAdd.map((row) => (
                                <TableRow key={row.post_id} hover>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedIds.includes(row.post_id)}
                                            onChange={() => toggleId(row.post_id)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.content}</TableCell>
                                    <TableCell>{row.location_city}</TableCell>
                                    <TableCell>{row.location_state}</TableCell>
                                    <TableCell>{row.location_country}</TableCell>
                                    <TableCell>{row.has_multimedia.toString()}</TableCell>
                                    <TableCell>{row.likes}</TableCell>
                                    <TableCell>{row.dislikes}</TableCell>
                                    <TableCell>{new Date(row.post_time).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>取消</Button>
                    <Button variant="contained" disabled={selectedIds.length === 0} onClick={handleSaveFromDialog}>
                        保存
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Analysis Form Dialog */}
            <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} />
                        添加分析结果
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Box sx={{ mt: 1 }}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="fieldname-label">字段名称</InputLabel>
                            <Select
                                labelId="fieldname-label"
                                id="fieldname"
                                name="fieldname"
                                value={formData.fieldname}
                                label="字段名称"
                                onChange={handleInputChange}
                            >
                                {fields.map((option) => (
                                    <MenuItem key={option.field_id} value={option.field_id}>
                                        {option.field_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="字段值"
                            name="fieldvalue"
                            value={formData.fieldvalue}
                            onChange={handleInputChange}
                            variant="outlined"
                            multiline
                            rows={2}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="outlined"
                    >
                        取消
                    </Button>
                    <Button
                        onClick={handleAddAnalysis}
                        variant="contained"
                        color="primary"
                        disabled={!formData.fieldname || !formData.fieldvalue}
                    >
                        添加
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProjectResult;