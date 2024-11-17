import { useState, useEffect } from "react";
import { PostData } from "../../../types/type";
import { getBoardDetail } from "../api/api";

type UsePostDetailResult = {
  postDetail: PostData | null;
  loading: boolean;
  error: string | null;
};

export const usePostDetail = (id: string | undefined): UsePostDetailResult => {
  const [postDetail, setPostDetail] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("게시글 ID가 유효하지 않습니다.");
      return;
    }

    const fetchPostDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getBoardDetail(id);
        setPostDetail(res);
      } catch (err) {
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  return { postDetail, loading, error };
};
