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
