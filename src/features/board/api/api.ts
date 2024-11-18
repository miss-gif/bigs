import { toast } from "react-toastify";
import { axiosInstance } from "../../../apis/axiosInstance";

// 게시판 목록 조회 API
export const getBoardList = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/boards?page=${page}&size=${size}`);
  return response.data;
};

// 게시판 글 상세 조회 API
export const getBoardDetail = async (boardId: string) => {
  const response = await axiosInstance.get(`/boards/${boardId}`);
  return response.data;
};

// 게시판 글 삭제 API
export const deleteBoard = async (boardId: string) => {
  const response = await axiosInstance.delete(`/boards/${boardId}`);
  return response.data;
};

type UpdateBoardData = {
  title: string;
  content: string;
  boardCategory: string;
};

/**
 * ! 게시판 파일이 있는 경우만 글쓰기가 가능
 * ! 게시판 파일이 없는 경우는 글쓰기가 불가능
 */

// 게시판 글 작성 API
export const createBoard = async (data: {
  request: UpdateBoardData;
  file?: File | null; // 파일이 있을 수도, 없을 수도 있음
}) => {
  console.log(data);
  console.log(data.request);

  try {
    const headers = {
      "Content-Type": data.file ? "multipart/form-data" : "application/json",
    };

    // 파일이 있는 경우 FormData 사용
    if (data.file) {
      const formData = new FormData();
      formData.append(
        "request",
        new Blob([JSON.stringify(data.request)], { type: "application/json" })
      );
      formData.append("file", data.file); // 파일이 존재하면 파일을 첨부
      return await axiosInstance.post("/boards", formData, { headers });
    } else {
      // 파일이 없을 경우 JSON만 전송
      return await axiosInstance.post("/boards", data, { headers });
    }
  } catch (error) {
    toast.error("글쓰기 실패");
    throw error;
  }
};

// 카테고리 목록 조회 API
export const getBoardCategories = async () => {
  const response = await axiosInstance.get("/boards/categories");
  return response.data;
};
