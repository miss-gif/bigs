import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { usePostDelete } from "../hooks/usePostDelete";
import { usePostDetail } from "../hooks/usePostDetail";
import styled from "@emotion/styled";

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
    <BoardDetailWrapper>
      <div className="button__list">
        <Button variant="contained" component={Link} to="/boards">
          목록
        </Button>
        <div>
          <Button
            variant="contained"
            component={Link}
            to={`/boards/edit/${id}`}
          >
            수정
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </div>

      <div>
        <div className="info">
          <div className="category">{postDetail.boardCategory}</div>
          <div className="title">{postDetail.title}</div>
          <div className="createdAt">{formatDate(postDetail.createdAt)}</div>
        </div>
        <div className="content">{postDetail.content}</div>
        <div className="image">
          {postDetail.imageUrl && (
            <img
              src={`https://front-mission.bigs.or.kr${postDetail.imageUrl}`}
              alt={postDetail.title}
            />
          )}
        </div>
      </div>
    </BoardDetailWrapper>
  );
};

export default BoardDetail;

const BoardDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  gap: 20px;

  .button__list {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      gap: 4px;
    }
  }

  .info {
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .category {
    color: green;
  }
  .title {
    font-size: 2rem;
    padding: 10px 0;
  }
  .createdAt {
    color: gray;
  }
  .content {
    padding: 40px 0;
  }
  .image {
    max-width: 400px;
    width: 100%;
  }
`;
