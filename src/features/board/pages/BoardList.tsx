import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BoardTable from "../components/BoardTable";
import PaginationComponent from "../components/PaginationComponent";
import useBoardList from "../hooks/useBoardList";

const BoardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") || "0", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);

  const { boards, totalPages, loading, error, fetchBoardList } = useBoardList(
    page,
    size
  );

  useEffect(() => {
    fetchBoardList();
  }, [fetchBoardList]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams({ page: (value - 1).toString(), size: size.toString() });
  };

  const handleSizeChange = (event: SelectChangeEvent<number>) => {
    setSearchParams({
      page: "0",
      size: (event.target.value as string).toString(),
    });
  };

  const detailLink = (id: number) => {
    navigate(`/boards/${id}`);
  };

  return (
    <BoardListWrapper>
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="container">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/boards/write"
              >
                글쓰기
              </Button>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                component="label"
                sx={{ marginRight: "10px" }}
              >
                페이지 당 게시글 수:
              </Typography>
              <Select
                value={size}
                onChange={handleSizeChange}
                displayEmpty
                sx={{ minWidth: "20px" }}
              >
                <MenuItem value={10}>10개</MenuItem>
                <MenuItem value={20}>20개</MenuItem>
                <MenuItem value={30}>30개</MenuItem>
              </Select>
            </Box>
          </Box>
          <BoardTable boards={boards} onRowClick={detailLink} />
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </BoardListWrapper>
  );
};

export default BoardList;

const BoardListWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
`;
