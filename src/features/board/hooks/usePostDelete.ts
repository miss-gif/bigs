import { useState } from "react";
import { deleteBoard } from "../api/api";
import { toast } from "react-toastify";

type UsePostDeleteResult = {
  postDelete: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const usePostDelete = (): UsePostDeleteResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBoard(id);
      toast.success("삭제 성공");
    } catch (err) {
      setError("게시글 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { postDelete, loading, error };
};
