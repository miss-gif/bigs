/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard, getBoardDetail } from "../api/api";

interface PostDetail {
  id: string;
  title: string;
  boardCategory: string;
  imageUrl: string;
  createdAt: string;
}

const BoardDetail = () => {
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPostDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getBoardDetail(id);
        setPostDetail(res);
      } catch (error) {
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  const deletePost = async () => {
    if (!id) {
      return;
    }

    try {
      await deleteBoard(id);
      alert("게시글이 삭제되었습니다.");
      navigate("/boards");
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            <button onClick={deletePost} css={deleteButtonStyle}>
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
              <strong>카테고리:</strong> {postDetail.boardCategory}
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
