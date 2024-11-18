import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchCategories from "../hooks/useFetchCategories";
import { usePostDetail } from "../hooks/usePostDetail";
import { axiosInstance } from "../../../apis/axiosInstance";
import { toast } from "react-toastify";

const BoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 게시글 상세 조회
  const {
    postDetail,
    loading: postLoading,
    error: postError,
  } = usePostDetail(id);

  // 카테고리 목록 조회
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useFetchCategories();

  // 폼 데이터 관리
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [file, setFile] = useState<File | null>(null);

  // 게시글 상세 데이터를 폼에 반영
  useEffect(() => {
    if (postDetail) {
      setFormData({
        title: postDetail.title,
        content: postDetail.content,
        category: postDetail.category,
      });
    }
  }, [postDetail]);

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 폼 입력값 처리
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 수정 요청 처리
  const handleEdit = async () => {
    try {
      if (!id) {
        alert("게시글 ID를 찾을 수 없습니다.");
        return;
      }

      const updateData = {
        request: {
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category,
        },
        ...(file && { file }),
      };

      const headers = {
        "Content-Type": file ? "multipart/form-data" : "application/json",
      };

      // 파일 포함 여부에 따라 FormData 처리
      if (file) {
        const formData = new FormData();
        formData.append(
          "request",
          new Blob([JSON.stringify(updateData.request)], {
            type: "application/json",
          })
        );
        formData.append("file", file);
        await axiosInstance.patch(`/boards/${id}`, formData, { headers });
      } else {
        await axiosInstance.patch(`/boards/${id}`, updateData, { headers });
      }

      toast.success("수정 성공");
      navigate(`/boards/${id}`);
    } catch (error) {
      toast.error("수정 실패");
    }
  };

  if (postLoading || categoryLoading) {
    return <div>로딩 중...</div>;
  }

  if (postError || categoryError) {
    return <div>{postError || categoryError}</div>;
  }

  if (!postDetail) {
    return <div>게시글 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>게시글 수정</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <div>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              rows={5}
            />
          </div>
          <div>
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">카테고리를 선택하세요</option>
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="file">이미지 업로드</label>
            <input type="file" id="file" onChange={handleFileChange} />
            {postDetail.imageUrl && (
              <img
                src={`https://front-mission.bigs.or.kr${postDetail.imageUrl}`}
                alt={postDetail.title}
                width="300"
              />
            )}
          </div>
        </div>
        <div>
          <Link to="/boards">취소</Link>
          <button onClick={handleEdit}>수정</button>
        </div>
      </form>
    </div>
  );
};

export default BoardEdit;
