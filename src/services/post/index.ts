import { infiniteQueryOptions, mutationOptions, queryOptions } from "@tanstack/react-query";

import { http } from "@/lib/http";
import { headerConfigs } from "@/lib/http/config/headers";

import type {
  CategoriesResponse,
  PostDetail,
  PostFormData,
  PostListRequestParams,
  PostListResponse,
} from "./types";

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
  createPost: (data: PostFormData) => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(data.request)], { type: "application/json" }),
    );
    if (data.file) {
      formData.append("file", data.file);
    }
    return http.post(API_URL.list, formData, {
      headers: headerConfigs.multipart,
    });
  },
  getCategories: async () => {
    const res = await http.get<CategoriesResponse>(API_URL.category);
    return res.data;
  },
  editPost: (id: string, data: PostFormData) => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(data.request)], { type: "application/json" }),
    );
    if (data.file) {
      formData.append("file", data.file);
    }
    return http.patch(`/boards/${id}`, formData, {
      headers: headerConfigs.multipart,
    });
  },
};

export const postQueries = {
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
  categories: () =>
    queryOptions({
      queryKey: [POST_ROOT_KEY, "categories"],
      queryFn: postService.getCategories,
    }),
};

export const postMutations = {
  delete: (id: string) =>
    mutationOptions({
      mutationKey: [POST_ROOT_KEY, id, "delete"],
      mutationFn: () => postService.deletePost(id),
    }),
  create: () =>
    mutationOptions({
      mutationKey: [POST_ROOT_KEY, "create"],
      mutationFn: (data: PostFormData) => postService.createPost(data),
    }),
  edit: (id: string) =>
    mutationOptions({
      mutationKey: [POST_ROOT_KEY, id, "edit"],
      mutationFn: (data: PostFormData) => postService.editPost(id, data),
    }),
};
