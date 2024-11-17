import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { BoardListType } from "../../../types/type";

interface Props {
  boards: BoardListType[];
  onRowClick: (id: number) => void;
}

const BoardTable: React.FC<Props> = ({ boards, onRowClick }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 50, textAlign: "center" }}>ID</TableCell>
        <TableCell sx={{ width: 50, textAlign: "center" }}>카테고리</TableCell>
        <TableCell sx={{ textAlign: "center" }}>제목</TableCell>
        <TableCell sx={{ width: 120, textAlign: "center" }}>생성일</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {boards.map((board) => (
        <TableRow
          key={board.id}
          hover
          onClick={() => onRowClick(board.id)}
          sx={{ cursor: "pointer" }}
        >
          <TableCell>{board.id}</TableCell>
          <TableCell>{board.category}</TableCell>
          <TableCell>{board.title}</TableCell>
          <TableCell>
            {new Date(board.createdAt).toLocaleDateString()}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default BoardTable;
