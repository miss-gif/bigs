import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { getBoardList } from "../api/api";

interface BoardItem {
  id: number;
  category: string;
  title: string;
  createdAt: string;
}

const BoardList = () => {
  const [boards, setBoards] = useState<BoardItem[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
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

  useEffect(() => {
    fetchBoardList();
  }, [fetchBoardList]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(event.target.value));
    setPage(0); // 페이지 크기 변경 시 0페이지로 이동
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <BoardListContainer>
      <h2>게시판 목록</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>생성일</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((board) => (
                <tr key={board.id}>
                  <td>{board.id}</td>
                  <td>{board.category}</td>
                  <td>{board.title}</td>
                  <td>{new Date(board.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <button
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              이전
            </button>
            {[...Array(totalPages).keys()].map((pageNum) => (
              <button
                key={pageNum}
                className={page === pageNum ? "active" : ""}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages - 1}
              onClick={() => handlePageChange(page + 1)}
            >
              다음
            </button>
          </Pagination>
          <SizeSelector>
            <label htmlFor="size">페이지 당 게시글 수: </label>
            <select id="size" value={size} onChange={handleSizeChange}>
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={30}>30개</option>
            </select>
          </SizeSelector>
        </>
      )}
    </BoardListContainer>
  );
};

export default BoardList;

// 스타일링
const BoardListContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;

    &:disabled {
      background-color: #eee;
      cursor: not-allowed;
    }

    &.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
  }
`;

const SizeSelector = styled.div`
  text-align: center;
  margin-top: 20px;

  label {
    margin-right: 10px;
  }

  select {
    padding: 5px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;
