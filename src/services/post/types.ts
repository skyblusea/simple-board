import type { PageResponse } from "@/types/page";

export type CategoriesResponse = Record<string, string>;

export interface PostListItem {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

export interface PostDetail {
  id: number;
  title: string;
  content: string;
  boardCategory: string;
  imageUrl: string;
  createdAt: string;
}

export interface PostListRequestParams {
  page: number;
  size: number;
}

export type PostListResponse = PageResponse<PostListItem>;

export interface PostPayload {
  title: string;
  content: string;
  category: string;
}

export type PostFormData = {
  request: PostPayload;
  file?: File;
};
