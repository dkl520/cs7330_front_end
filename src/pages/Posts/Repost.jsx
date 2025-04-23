import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  Image as ImageIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Article as ArticleIcon
} from '@mui/icons-material';


export default function RepostList() {

  const [reposts, setReposts] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentRepost, setCurrentRepost] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [availablePosts, setAvailablePosts] = useState([]); // 新增状态
  const [originalMap, setOriginalMap] = useState({});
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');
  const mediaId = searchParams.get('media_id');

  // const emptyRepostData = {
  //   repost_id: '',
  //   post_id: '',
  //   user_id: '',
  //   repost_time: new Date().toISOString()
  // };

  useEffect(() => {
    fetchReposts();
    // fetchAvailablePosts()
  }, []);
  
  useEffect(() => {
    if (reposts.length) fetchOriginals(reposts);
  }, [reposts]);

  const fetchReposts = async () => {
    try {
      // setLoading(true);

      const response = await window.$api.post.getReposts(userId); // 修改为传入userId参数
      setReposts(response || []);
    } catch (error) {
      console.error('获取转发列表失败:', error);
      setReposts([]);
    } finally {
      // setLoading(false);
    }
  };

  const fetchOriginals = async (repostList) => {
    const uniqueIds = [...new Set(repostList.map(r => r.post_id))];
    const map = {};

    await Promise.all(
      uniqueIds.map(async id => {
        try {
          map[id] = await window.$api.post.detail(id);
        } catch (err) {
          console.error(`获取原帖 ${id} 失败`, err);
        }
      })
    );
    setOriginalMap(map);
  };

  // 获取可用帖子的函数
  const fetchAvailablePosts = async () => {
    try {
      const response = await window.$api.post.getAvailablePosts(userId, mediaId);
      setAvailablePosts(response || []);
    } catch (error) {
      console.error('获取可用帖子失败:', error);
      setAvailablePosts([]);
    }
  };

  /**********************
   * Handlers           *
   **********************/
  const toggleId = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSaveFromDialog = async () => {
    try {
      // 准备批量转发的数据
      const bulkRepostData = {
        user_id: userId, // 使用当前用户ID
        post_ids: selectedIds // 已选择的帖子ID数组
      };
      // 调用批量转发API
      await window.$api.post.bulk_repost(bulkRepostData);
      // 重新获取转发列表
      await fetchReposts();
      // 清理状态
      setSelectedIds([]);
      setAddDialogOpen(false);
    } catch (error) {
      console.error('批量转发失败:', error);
    }
  };


  const handleDelete = async () => {
    try {
      await window.$api.post.deleteRepost(currentRepost.repost_id);
      await fetchReposts();  // 重新获取数据
      setDeleteDialogOpen(false);
      setCurrentRepost(null);
    } catch (error) {
      console.error('删除转发失败:', error);
    }
  };

  // Format the location string
  const formatLocation = (city, state, country) => {
    const parts = [city, state, country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '未知';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/** Page header **/}
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
            转发管理
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            查看并管理所有转发记录
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Fixed button nesting issue by using div instead of span */}
          <div>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchReposts}
            >
              刷新
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={async () => {
                fetchAvailablePosts();
                setAddDialogOpen(true);
              }}
              disableElevation
            >
              添加转发
            </Button>
          </div>
        </Box>
      </Paper>

      {/** Repost list as accordions **/}
      <Paper
        elevation={3}
        sx={{ borderRadius: 3, overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}
      >
        {reposts.length === 0 ? (
          <Box p={3}>
            <Typography>暂无转发数据</Typography>
          </Box>
        ) : (
          reposts.map((repost, index) => {
            const original = originalMap[repost.post_id];
            if (!original) return null;

            return (
              <Accordion key={repost.repost_id} disableGutters square>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">
                      转发ID: {repost.repost_id}
                    </Typography>
                    <Chip
                      label={`原帖ID: ${repost.post_id}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`用户ID: ${repost.user_id}`}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                      转发时间: {new Date(repost.repost_time).toLocaleString()}
                    </Typography>
                  </Stack>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentRepost(repost);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{ color: 'error.main', ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: 'grey.50', p: 0 }}>
                  {original ? (
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
                        <Box sx={{ mb: 2 }}>
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
                            帖子内容
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
                            {original.content}
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
                                  <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>帖子ID:</Box>
                                  {original.post_id}
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
                                  <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>用户ID:</Box>
                                  {original.user_id}
                                </Typography>
                              </Box>

                              {/* Media */}
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <ImageIcon sx={{ mr: 1, fontSize: 16, color: original.has_multimedia ? 'success.main' : 'text.disabled' }} />
                                  <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>媒体:</Box>
                                  {original.has_multimedia ? (
                                    <Chip
                                      label="包含多媒体"
                                      size="small"
                                      color="success"
                                      variant="outlined"
                                      sx={{ height: 20, fontSize: '0.75rem' }}
                                    />
                                  ) : (
                                    <Chip
                                      label="无多媒体"
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
                                {/* Fixed div inside p issue by changing from Typography component="span" to div */}
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                  <LocationIcon sx={{ mr: 1, fontSize: 16, color: 'info.main' }} />
                                  <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>位置:</Box>
                                  {formatLocation(
                                    original.location_city,
                                    original.location_state,
                                    original.location_country
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
                                {/* Fixed div inside p issue by changing from Typography component="span" to div */}
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                  <AccessTimeIcon sx={{ mr: 1, fontSize: 16, color: 'warning.main' }} />
                                  <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>发布时间:</Box>
                                  {new Date(original.post_time).toLocaleString()}
                                </Box>
                              </Box>

                              {/* Engagement Stats */}
                              <Box sx={{ display: 'flex', gap: 3 }}>
                                {/* Fixed div inside p issue by changing Typography components */}
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                  <ThumbUpIcon sx={{ mr: 1, fontSize: 16, color: 'success.main' }} />
                                  <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>点赞:</Box>
                                  {original.likes}
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                  <ThumbDownIcon sx={{ mr: 1, fontSize: 16, color: 'error.main' }} />
                                  <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>踩:</Box>
                                  {original.dislikes}
                                </Box>
                              </Box>

                              {/* Additional fields can be added here */}
                            </Stack>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  ) : (
                    <Box sx={{ p: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        未找到原帖信息
                      </Typography>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Paper>

      {/** Add dialog with table **/}
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
              {availablePosts.map((row) => (
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

      {/** Delete confirmation **/}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography variant="body2">确定要删除这条转发记录吗？此操作无法撤销。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}