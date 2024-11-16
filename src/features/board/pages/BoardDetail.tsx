import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard, getBoardDetail } from "../api/api"; // API 호출 함수

const BoardDetail = () => {
  interface PostDetail {
    id: string;
    title: string;
    boardCategory: string;
    imageUrl: string;
    createdAt: string;
  }

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
      deleteBoard(id);
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
    <div>
      <h2>게시글 상세</h2>
      {postDetail ? (
        <>
          <div className="">
            <div className="">목록</div>
            <div className="" onClick={deletePost}>
              삭제
            </div>
          </div>
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
            <strong>이미지:</strong>{" "}
            <img
              src={`https://front-mission.bigs.or.kr${postDetail.imageUrl}`}
              alt={postDetail.title}
              width="300"
            />
          </div>
          <div>
            <strong>작성일:</strong> {formatDate(postDetail.createdAt)}
          </div>
        </>
      ) : (
        <div>게시글을 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default BoardDetail;
