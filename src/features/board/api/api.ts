import { axiosInstance } from "../../../apis/axiosInstance";

// 게시판 목록 조회 API
export const getBoardList = async (page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get(
      `/boards?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("게시판 목록 조회 실패:", error);
    throw error;
  }
};

// 게시판 글 상세 조회 API
export const getBoardDetail = async (boardId: string) => {
  try {
    const response = await axiosInstance.get(`/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("게시판 글 조회 실패:", error);
    throw error;
  }
};

// 게시판 글 삭제 API
export const deleteBoard = async (boardId: string) => {
  try {
    const response = await axiosInstance.delete(`/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("게시판 글삭제 실패:", error);
    throw error;
  }
};

type UpdateBoardData = {
  title: string;
  content: string;
  category: string;
};

// 게시판 글 작성 API
export const createBoard = async (data: {
  request: UpdateBoardData;
  file?: File;
}) => {
  try {
    if (data.file) {
      const formData = new FormData();

      formData.append(
        "request",
        new Blob([JSON.stringify(data.request)], { type: "application/json" })
      );
      formData.append("file", data.file);

      return await axiosInstance.post("/boards", formData, {
        // 경로 수정
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      return await axiosInstance.post(
        "/boards", // 경로 수정
        {
          request: data.request,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("게시판 글쓰기 실패:", error);
    throw error;
  }
};

// 카테고리 목록 조회 API
export const getBoardCategories = async () => {
  try {
    const response = await axiosInstance.get("/boards/categories");
    return response.data;
  } catch (error) {
    console.error("게시판 카테고리 조회 실패:", error);
    throw error;
  }
};
