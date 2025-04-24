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
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Checkbox
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
    const [currentProjectPostId, setCurrentProjectPostId] = useState(null);
    const { id: project_id } = useParams();
    const [fields, setFields] = useState([]);

    const [postToAdd, setPostToAdd] = useState([]);  //添加

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [postAll, setPostAll] = useState([]);

    useEffect(() => {
        fetchProjectPosts();
    }, [])

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
            const response = await window.$api.projectPost.postRemains({ project_id });
            setPostToAdd(response || []);
        } catch (error) {
            console.error('Failed to fetch post list:', error);
            // setPosts([]);
        }
    };

    const fetchProjectPosts = async () => {
        try {
            const response = await window.$api.projectPost.listall({ project_id });
            setPostAll(response || []);
        } catch (error) {
            console.error('获取可用帖子失败:', error);
        }
    };

    const [formData, setFormData] = useState({
        field_id: '',
        field_name: '',
        value: ''
    });

    const handleSaveFromDialog = async () => {
        try {
            const bulkProjectsData = {
                project_id: project_id, // 使用当前用户ID
                post_ids: selectedIds // 已选择的帖子ID数组
            };
            await window.$api.projectPost.bulkProjectPost(bulkProjectsData);
            await fetchProjectPosts();
            setSelectedIds([]);
            setAddDialogOpen(false);
        } catch (error) {
            console.error('批量转发失败:', error);
        }
    };

    const handleOpenDialog = (project_post_id) => {
        setCurrentProjectPostId(project_post_id);
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
            field_id: '',
            field_name: '',
            value: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value || '' // 确保value永远不会是undefined
        }));
    };

    const handleAddAnalysis = async () => {
        if (!formData.field_id || !formData.value) {
            return;
        }
        let bulkedData = {
            project_post_id: currentProjectPostId,
            field_id: formData.field_id,
            value: formData.value
        }
        try {
            await window.$api.analysisResult.create(bulkedData);
        } catch (error) {
            console.error('获取可用帖子失败:', error);
        }
        await fetchProjectPosts();
        handleCloseDialog();
    };

    const navigateToProjectField = () => {
        navigate(`/projectfield/${project_id}`)
    };

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
                        Result Analysis
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        View and manage all post analysis results
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <div>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={() => setPosts([...posts])} // Mock refresh
                        >
                            Refresh
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
                            Add Post
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={navigateToProjectField}
                            disableElevation
                        >
                            Project Fields
                        </Button>
                    </div>
                </Box>
            </Paper>

            {/* Posts list as accordions */}
            <Paper
                elevation={3}
                sx={{ borderRadius: 3, overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}
            >
                {postAll.length === 0 ? (
                    <Box p={3} sx={{ textAlign: 'center' }}>
                        <Typography color="text.secondary">No post data available</Typography>
                    </Box>
                ) : (
                    postAll.map((post) => (
                        <Accordion key={post.post_id} disableGutters square>
                            {/* FIX: Remove the expandIcon from AccordionSummary and add it differently */}
                            <AccordionSummary
                                // expandIcon has been removed from here
                                sx={{
                                    px: 3,
                                    // Add a container for our custom expand icon
                                    '& .MuiAccordionSummary-content': {
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }
                                }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1">
                                        Post ID: {post.post_id}
                                    </Typography>
                                    <Chip
                                        label={`User ID: ${post.user_id}`}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                                        Post Time: {new Date(post.post_time).toLocaleString()}
                                    </Typography>
                                </Stack>
                                {/* Add expand icon as a separate element that's not a button */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ExpandMoreIcon />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ bgcolor: 'grey.50', p: 0 }}>
                                <Box sx={{ p: 3 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            bgcolor: 'background.paper'
                                        }}
                                    >
                                        {/* Post Content Section */}
                                        <Box sx={{ mb: 3 }}>
                                            <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'text.primary',
                                                    fontWeight: 500
                                                }}
                                            >
                                                <ArticleIcon sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
                                                Post Content
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 1,
                                                    bgcolor: 'background.default',
                                                    border: '1px solid',
                                                    borderColor: 'divider'
                                                }}
                                            >
                                                {post.content}
                                            </Typography>
                                        </Box>

                                        <Grid container spacing={3}>
                                            {/* Left Column */}
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={2}>
                                                    {/* Post ID */}
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Post ID:</Box>
                                                            {post.post_id}
                                                        </Typography>
                                                    </Box>

                                                    {/* User Info */}
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <PersonIcon sx={{ mr: 1, fontSize: 16, color: 'secondary.main' }} />
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>User ID:</Box>
                                                            {post.user_id}
                                                        </Typography>
                                                    </Box>

                                                    {/* Media */}
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <ImageIcon sx={{ mr: 1, fontSize: 16, color: post.has_multimedia ? 'success.main' : 'text.disabled' }} />
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Media:</Box>
                                                            {post.has_multimedia ? (
                                                                <Chip
                                                                    label="Contains multimedia"
                                                                    size="small"
                                                                    color="success"
                                                                    variant="outlined"
                                                                    sx={{ height: 20, fontSize: '0.75rem' }}
                                                                />
                                                            ) : (
                                                                <Chip
                                                                    label="No multimedia"
                                                                    size="small"
                                                                    color="default"
                                                                    variant="outlined"
                                                                    sx={{ height: 20, fontSize: '0.75rem' }}
                                                                />
                                                            )}
                                                        </Typography>
                                                    </Box>

                                                    {/* Location */}
                                                    <Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                                            <LocationIcon sx={{ mr: 1, fontSize: 16, color: 'info.main' }} />
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Location:</Box>
                                                            {formatLocation(
                                                                post.location_city,
                                                                post.location_state,
                                                                post.location_country
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Stack>
                                            </Grid>

                                            {/* Right Column */}
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={2}>
                                                    {/* Post Time */}
                                                    <Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                                            <AccessTimeIcon sx={{ mr: 1, fontSize: 16, color: 'warning.main' }} />
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Post Time:</Box>
                                                            {new Date(post.post_time).toLocaleString()}
                                                        </Box>
                                                    </Box>

                                                    {/* Engagement Stats */}
                                                    <Box sx={{ display: 'flex', gap: 3 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                                            <ThumbUpIcon sx={{ mr: 1, fontSize: 16, color: 'success.main' }} />
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Likes:</Box>
                                                            {post.likes}
                                                        </Box>

                                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                                            <ThumbDownIcon sx={{ mr: 1, fontSize: 16, color: 'error.main' }} />
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Dislikes:</Box>
                                                            {post.dislikes}
                                                        </Box>
                                                    </Box>

                                                    {/* Media ID */}
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Media ID:</Box>
                                                            {post.media_id || 'None'}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                        {/* Analysis Results Section */}
                                        <Box sx={{ mt: 4 }}>
                                            <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'text.primary',
                                                    fontWeight: 500,
                                                    borderBottom: '1px solid',
                                                    borderColor: 'divider',
                                                    pb: 1
                                                }}
                                            >
                                                <AnalyticsIcon sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
                                                Analysis Results
                                            </Typography>

                                            {post.analysis.length > 0 ? (
                                                <Box sx={{ mt: 2 }}>

                                                    {post.analysis.map((analysis) => (
                                                        <Grid
                                                            container
                                                            key={analysis.field_id}
                                                            sx={{
                                                                py: 1.5,
                                                                px: 1,
                                                                borderBottom: '1px solid',
                                                                borderColor: 'divider',
                                                                '&:hover': { bgcolor: 'action.hover' },
                                                                alignItems: 'center' // 添加垂直居中对齐
                                                            }}
                                                        >
                                                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Chip
                                                                    label={analysis.field_id}
                                                                    size="small"
                                                                    color="primary"
                                                                    sx={{
                                                                        fontWeight: 'bold',
                                                                        mr: 2,  // 添加右侧边距
                                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',  // 添加轻微阴影效果
                                                                        border: '1px solid',  // 添加边框
                                                                        borderColor: 'primary.light'  // 边框颜色
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography variant="body2">{analysis.field_name}： </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography variant="body2">{analysis.value}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                    <Typography color="text.secondary" gutterBottom>
                                                        No analysis results available
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleOpenDialog(post.project_post_id)}
                                                        startIcon={<AddIcon />}
                                                        sx={{ mt: 1 }}
                                                    >
                                                        Please add analysis results
                                                    </Button>
                                                </Box>
                                            )}

                                            {post.analysis.length > 0 && (
                                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleOpenDialog(post.project_post_id)}
                                                        startIcon={<AddIcon />}
                                                    >
                                                        Add more analysis
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    </Paper>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))
                )}
            </Paper>

            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="lg">
                <DialogTitle>Add Post</DialogTitle>
                <DialogContent dividers>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Select</TableCell>
                                <TableCell>Content</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Has Multimedia</TableCell>
                                <TableCell>Likes</TableCell>
                                <TableCell>Dislikes</TableCell>
                                <TableCell>Post Time</TableCell>
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
                    <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" disabled={selectedIds.length === 0} onClick={handleSaveFromDialog}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Analysis Form Dialog */}
            <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} />
                        Add Analysis Results
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Box sx={{ mt: 1 }}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="fieldname-label">Field Name</InputLabel>
                            <Select
                                labelId="fieldname-label"
                                id="fieldname"
                                name="field_id"
                                value={formData.field_id}
                                label="Field Name"
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
                            label="Field Value"
                            name="value"
                            value={formData.value}
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
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddAnalysis}
                        variant="contained"
                        color="primary"
                        disabled={!formData.field_id || !formData.value}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProjectResult;