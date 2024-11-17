import React from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import useBoardList from "../hooks/useBoardList";
import BoardTable from "../components/BoardTable";
import PaginationComponent from "../components/PaginationComponent";

const BoardList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") || "0", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);

  const { boards, totalPages, loading, error } = useBoardList(page, size);

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
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", textAlign: "center" }}
      >
        게시판 목록
      </Typography>
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
        <>
          <Box sx={{ textAlign: "right", marginBottom: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/boards/write"
            >
              글쓰기
            </Button>
          </Box>
          <BoardTable boards={boards} onRowClick={detailLink} />
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
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
              sx={{ minWidth: "80px" }}
            >
              <MenuItem value={10}>10개</MenuItem>
              <MenuItem value={20}>20개</MenuItem>
              <MenuItem value={30}>30개</MenuItem>
            </Select>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BoardList;
