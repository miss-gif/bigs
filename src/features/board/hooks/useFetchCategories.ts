import { useEffect, useState } from "react";
import { getBoardCategories } from "../api/api";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await getBoardCategories();
        setCategories(fetchedCategories);
        setError(null); // 오류 초기화
      } catch (err) {
        setError("카테고리 목록 조회 실패");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, loading };
};

export default useFetchCategories;
