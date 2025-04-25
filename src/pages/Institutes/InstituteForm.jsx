// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Paper
// } from '@mui/material';

// const InstituteForm = ({ mode = 'create' }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // 处理表单提交逻辑
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ py: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           {mode === 'create' ? '创建研究所' : '编辑研究所'}
//         </Typography>

//         <Paper elevation={3} sx={{ mt: 4, p: 4, borderRadius: 2 }}>
//           <Box component="form" onSubmit={handleSubmit} noValidate>
//             <TextField
//               fullWidth
//               required
//               label="研究所名称"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               variant="outlined"
//               sx={{ mb: 4 }}
//             />

//             <Stack direction="row" spacing={2} justifyContent="flex-end">
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate('/institutes')}
//                 sx={{ px: 4 }}
//               >
//                 取消
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{ px: 4 }}
//               >
//                 {mode === 'create' ? '创建' : '保存'}
//               </Button>
//             </Stack>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default InstituteForm;