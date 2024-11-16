/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { createBoard, getBoardCategories } from "../api/api";

interface BoardFormData {
  title: string;
  content: string;
  category: string;
}

const BoardWrite = () => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<BoardFormData>({
    title: "",
    content: "",
    category: "",
  });

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
      [id]: value, // id 값에 해당하는 필드만 업데이트
    }));
  };

  // 카테고리 조회
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getBoardCategories();
        console.log(categories);
        setCategory(categories);
      } catch (error) {
        console.error("카테고리 목록 조회 실패:", error);
      }
    };
    fetchCategory();
  }, []);

  // 폼 제출
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 유효성 검사
      if (!formData.title.trim()) {
        alert("제목을 입력해주세요.");
        return;
      }
      if (!formData.content.trim()) {
        alert("내용을 입력해주세요.");
        return;
      }
      if (!formData.category) {
        alert("카테고리를 선택해주세요.");
        return;
      }

      const requestData = {
        request: {
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category,
        },
        ...(file && { file }),
      };

      const response = await createBoard(requestData);
      console.log("게시글 작성 성공:", response);

      // 성공 시 처리 (예: 목록 페이지로 이동)
      // navigate('/boards');
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">카테고리를 선택하세요</option>
            {Object.entries(category).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="file">파일 첨부 (선택)</label>
          <input
            id="file"
            type="file"
            css={FileInput}
            onChange={handleFileChange}
          />
        </FormGroup>
        <SubmitButton type="submit">등록</SubmitButton>
      </form>
    </Container>
  );
};
export default BoardWrite;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
  }

  textarea {
    resize: vertical;
    height: 120px;
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
