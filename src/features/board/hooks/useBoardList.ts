import { useState, useCallback, useEffect } from "react";
import { BoardListType } from "../../../types/type";
import { getBoardList } from "../api/api";

const useBoardList = (page: number, size: number) => {
  const [boards, setBoards] = useState<BoardListType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoardList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBoardList(page, size);
      setBoards(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("게시판 목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  return { boards, totalPages, loading, error, fetchBoardList };
};

export default useBoardList;
