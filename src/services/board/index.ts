import { infiniteQueryOptions, mutationOptions, queryOptions } from "@tanstack/react-query";

import { http } from "@/lib/http";

import type { PostDetail, PostListRequestParams, PostListResponse } from "./types";

const BOARD_API_URL = {
  list: "/boards",
  category: "/boards/categories",
};

export const BOARD_ROOT_KEY = "BOARDS";

export const boardService = {
  getBoards: ({ page, size }: PostListRequestParams) =>
    http.get<PostListResponse>(BOARD_API_URL.list, {
      params: { page, size },
    }),
  getBoard: async (id: string) => {
    const res = await http.get<PostDetail>(`/boards/${id}`);
    return res.data;
  },
  deleteBoard: (id: string) => http.delete(`/boards/${id}`),
};

export const boardQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: [BOARD_ROOT_KEY, "detail", id],
      queryFn: () => boardService.getBoard(id),
    }),
  infiniteList: (size = 10) =>
    infiniteQueryOptions({
      queryKey: [BOARD_ROOT_KEY, "list", size],
      queryFn: async ({ pageParam }) => {
        const response = await boardService.getBoards({ page: pageParam, size });
        return response.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    }),
};

export const mutations = {
  delete: (id: string) =>
    mutationOptions({
      mutationKey: [BOARD_ROOT_KEY, id, "delete"],
      mutationFn: () => boardService.deleteBoard(id),
    }),
};
