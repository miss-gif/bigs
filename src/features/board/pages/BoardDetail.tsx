/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { usePostDetail } from "../hooks/usePostDetail";
import { usePostDelete } from "../hooks/usePostDelete";

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
    await postDelete(id);
    navigate("/boards");
  };

  console.log(postDetail);

  if (postLoading || deleteLoading) {
    return <div>로딩 중...</div>;
  }

  if (postError || deleteError) {
    return <div>{postError}</div>;
  }

  if (!postDetail) {
    return <div>게시글 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div css={containerStyle}>
      <h2>게시글 상세</h2>
      {postDetail ? (
        <>
          <div css={buttonContainerStyle}>
            <Link to="/boards" css={buttonStyle}>
              목록
            </Link>
            <Link to={`/boards/edit/${id}`} css={buttonStyle}>
              수정
            </Link>
            <button onClick={handleDelete} css={deleteButtonStyle}>
              삭제
            </button>
          </div>
          <div css={infoStyle}>
            <div>
              <strong>아이디:</strong> {postDetail.id}
            </div>
            <div>
              <strong>제목:</strong> {postDetail.title}
            </div>
            <div>
              <strong>카테고리:</strong>
              {postDetail.boardCategory}
            </div>
            <div>
              <strong>이미지:</strong>
              <img
                src={`https://front-mission.bigs.or.kr${postDetail.imageUrl}`}
                alt={postDetail.title}
                width="300"
              />
            </div>
            <div>
              <strong>작성일:</strong> {formatDate(postDetail.createdAt)}
            </div>
          </div>
        </>
      ) : (
        <div>게시글을 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

const containerStyle = css`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const buttonStyle = css`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const deleteButtonStyle = css`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const infoStyle = css`
  margin-top: 20px;
  line-height: 1.8;
  font-size: 16px;

  strong {
    color: #333;
  }
`;

export default BoardDetail;
