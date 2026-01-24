"use client";

import { useState } from "react";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Popconfirm } from "./popconfirm";

interface DataTableRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function DataTableRowActions({ onEdit, onDelete }: DataTableRowActionsProps) {
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            수정
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenPopconfirm} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
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
