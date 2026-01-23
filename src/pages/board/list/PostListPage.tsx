import { useState } from "react";
import { useNavigate } from "react-router";

import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { PenSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import type { PostListItem } from "@/services/board/types";

export default function PostListPage() {
  const posts = [
    {
      id: 5,
      title: "공지1",
      category: "NOTICE",
      createdAt: "2024-11-11T09:29:45.721114",
    },
    {
      id: 6,
      title: "공지2",
      category: "NOTICE",
      createdAt: "2024-11-11T09:42:12.11129",
    },
    {
      id: 12,
      title: "공지3",
      category: "NOTICE",
      createdAt: "2024-11-13T09:13:07.432346",
    },
    {
      id: 13,
      title: "공지4",
      category: "NOTICE",
      createdAt: "2024-11-13T09:13:34.721977",
    },
    {
      id: 15,
      title: "공지5",
      category: "NOTICE",
      createdAt: "2024-11-13T10:41:39.424863",
    },
    {
      id: 16,
      title: "공지6",
      category: "NOTICE",
      createdAt: "2024-11-13T10:43:26.716577",
    },
    {
      id: 17,
      title: "공지7",
      category: "NOTICE",
      createdAt: "2024-11-13T10:45:15.267487",
    },
    {
      id: 18,
      title: "공지8",
      category: "NOTICE",
      createdAt: "2024-11-13T10:46:29.278927",
    },
  ] as PostListItem[];

  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/board/new");
  };

  const columns: ColumnDef<PostListItem>[] = [
    {
      accessorKey: "id",
      header: "번호",
      size: 20,
      cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "title",
      header: "제목",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Badge variant="outline">{row.original.category}</Badge>
          <span className="max-w-[500px] truncate font-medium">{row.getValue("title")}</span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "작성일",
      cell: ({ row }) => (
        <div className="text-center">{dayjs(row.getValue("createdAt")).format("YYYY-MM-DD")}</div>
      ),
      size: 50,
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions onDelete={() => {}} onEdit={() => {}} row={row} />,
      size: 20,
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  return (
    <>
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex justify-end">
          <Button onClick={handleCreateClick}>
            <PenSquare className="mr-2 h-4 w-4" />
            글쓰기
          </Button>
        </div>
        <DataTable
          data={posts}
          columns={columns}
          pagination={{
            ...pagination,
            total: 200,
          }}
          onPaginationChange={setPagination}
        />
      </div>
    </>
  );
}
