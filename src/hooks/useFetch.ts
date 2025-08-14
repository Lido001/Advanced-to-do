import { getTodos } from "@/api/services/todoservice";
import { useEffect, useState, useCallback } from "react";

const useFetchUser = () => {
  const [list, setList] = useState<any[]>([]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await getTodos();
      setList(response);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { list, fetchUserData };
};

export default useFetchUser;
