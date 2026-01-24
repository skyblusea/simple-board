import { infiniteQueryOptions, mutationOptions, queryOptions } from "@tanstack/react-query";

import { http } from "@/lib/http";

import type { PostDetail, PostListRequestParams, PostListResponse } from "./types";

const API_URL = {
  list: "/boards",
  category: "/boards/categories",
};

export const POST_ROOT_KEY = "POSTS";

export const postService = {
  getPosts: ({ page, size }: PostListRequestParams) =>
    http.get<PostListResponse>(API_URL.list, {
      params: { page, size },
    }),
  getPost: async (id: string) => {
    const res = await http.get<PostDetail>(`/boards/${id}`);
    return res.data;
  },
  deletePost: (id: string) => http.delete(`/boards/${id}`),
  create,
};

export const boardQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: [POST_ROOT_KEY, "detail", id],
      queryFn: () => postService.getPost(id),
    }),
  infiniteList: (size = 10) =>
    infiniteQueryOptions({
      queryKey: [POST_ROOT_KEY, "list", size],
      queryFn: async ({ pageParam }) => {
        const response = await postService.getPosts({ page: pageParam, size });
        return response.data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    }),
};

export const mutations = {
  delete: (id: string) =>
    mutationOptions({
      mutationKey: [POST_ROOT_KEY, id, "delete"],
      mutationFn: () => postService.deletePost(id),
    }),
};
