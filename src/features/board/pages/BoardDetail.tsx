import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { usePostDelete } from "../hooks/usePostDelete";
import { usePostDetail } from "../hooks/usePostDetail";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    postDetail,
    loading: postLoading,
    error: postError,
  } = usePostDetail(id);
  const {
    postDelete,
    loading: deleteLoading,
    error: deleteError,
  } = usePostDelete();

  const handleDelete = async () => {
    if (!id) return;

    confirm("게시글을 삭제하시겠습니까?") && (await postDelete(id));
    navigate("/boards");
  };

  if (postLoading || deleteLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (postError || deleteError) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {postError || deleteError}
        </Typography>
      </Box>
    );
  }

  if (!postDetail) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          게시글 데이터를 찾을 수 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        게시글 상세
      </Typography>
      <Grid container spacing={3}>
        {/* Buttons */}
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/boards"
          >
            목록
          </Button>
          <Button
            variant="contained"
            color="warning"
            component={Link}
            to={`/boards/edit/${id}`}
          >
            수정
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            삭제
          </Button>
        </Grid>

        {/* Post Detail */}
        <Grid item xs={12}>
          <Card>
            {postDetail.imageUrl && (
              <CardMedia
                component="img"
                height="300"
                image={`https://front-mission.bigs.or.kr${postDetail.imageUrl}`}
                alt={postDetail.title}
              />
            )}
            <CardContent>
              <Typography variant="h6">
                <strong>아이디:</strong> {postDetail.id}
              </Typography>
              <Typography variant="h6">
                <strong>제목:</strong> {postDetail.title}
              </Typography>
              <Typography variant="h6">
                <strong>카테고리:</strong> {postDetail.boardCategory}
              </Typography>
              <Typography variant="h6">
                <strong>작성일:</strong> {formatDate(postDetail.createdAt)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoardDetail;
