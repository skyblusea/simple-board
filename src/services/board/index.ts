import { infiniteQueryOptions } from "@tanstack/react-query";

import { http } from "@/lib/http";

import type { PostDetail, PostListRequestParams, PostListResponse } from "./types";

const BOARD_API_URL = {
  list: "/boards",
  category: "/boards/categories",
};

const ROOT_KEY = "BOARDS";

export const boardService = {
  getBoards: ({ page, size }: PostListRequestParams) =>
    http.get<PostListResponse>(BOARD_API_URL.list, {
      params: { page, size },
    }),
  getBoard: (id: string) => http.get<PostDetail>(`/boards/${id}`),
};

export const boardQueries = {
  infiniteList: (size = 10) =>
    infiniteQueryOptions({
      queryKey: [ROOT_KEY, "list", size],
      queryFn: async ({ pageParam }) => {
        const response = await boardService.getBoards({ page: pageParam, size });
        return response.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    }),
};
