/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../apis/axiosInstance";
import useFetchCategories from "../hooks/useFetchCategories";
import { usePostDetail } from "../hooks/usePostDetail";

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

  interface BoardFormData {
    title: string;
    content: string;
    category: string;
    file?: string;
  }

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<BoardFormData>({
    title: "",
    content: "",
    category: "",
    file: "",
  });

  // 게시글 상세 데이터를 폼에 반영
  useEffect(() => {
    if (postDetail) {
      setFormData({
        title: postDetail.title,
        content: postDetail.content,
        category: postDetail.boardCategory,
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
    <Container>
      <Title>글 수정</Title>

      <form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
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
        </FormGroup>

        <FormGroup>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            rows={5}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="file">
            파일 첨부 <em>(필수)</em> ※ 기능상 문제로 이미지를 필수로
            첨부해야합니다.
          </label>
          <input
            type="file"
            id="file"
            css={FileInput}
            onChange={handleFileChange}
          />
          {postDetail.imageUrl && (
            <img
              src={`https://front-mission.bigs.or.kr${postDetail.imageUrl}`}
              alt={postDetail.title}
              width="300"
            />
          )}
        </FormGroup>
        <SubmitButton onClick={handleEdit}>수정</SubmitButton>
      </form>
    </Container>
  );
};

export default BoardEdit;

const Container = styled.div`
  width: 100%;
  padding: 40px 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
  }

  textarea {
    resize: none;
    height: 220px;
  }
`;

const FileInput = css`
  display: block;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 18px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003d80;
  }
`;
