import React from "react";
import { Box, Pagination } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
}) => (
  <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
    <Pagination
      count={totalPages}
      page={page + 1}
      onChange={onPageChange}
      color="primary"
    />
  </Box>
);

export default PaginationComponent;
