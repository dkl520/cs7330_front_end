// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Stack,
//   Box,
//   Divider,
//   Grid
// } from '@mui/material';
// import { Edit as EditIcon } from '@mui/icons-material';

// const InstituteDetail = () => {
//   const navigate = useNavigate();
//   const [institute, setInstitute] = useState(null);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ mb: 4 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography variant="h4" component="h1">
//             {institute?.name}
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<EditIcon />}
//             onClick={() => navigate(`/institutes/edit/${id}`)}
//           >
//             编辑
//           </Button>
//         </Stack>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 基本信息
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Stack spacing={2}>
//                 <Typography variant="body1">
//                   ID: {institute?.institute_id}
//                 </Typography>
//                 <Typography variant="body1">
//                   名称: {institute?.name}
//                 </Typography>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 相关项目
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               {/* 项目列表 */}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default InstituteDetail;