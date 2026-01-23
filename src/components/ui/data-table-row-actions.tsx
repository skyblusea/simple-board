"use client";

import { useState } from "react";

import { type Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Popconfirm } from "./popconfirm";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: () => void;
  onDelete: () => void;
}

export function DataTableRowActions<TData>({ onEdit, onDelete }: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleOpenPopconfirm = () => setShowDeleteDialog(true);

  const handleDeleteConfirm = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted size-8">
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={onEdit}>수정</DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenPopconfirm} variant="destructive">
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Popconfirm
        title="삭제 확인"
        description="정말로 삭제하시겠습니까?"
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
