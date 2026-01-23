import type { ComponentProps } from "react";

import { CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogProps = ComponentProps<typeof Dialog>;

interface PopconfirmProps extends DialogProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
}

export function Popconfirm({ title, description, onConfirm, ...props }: PopconfirmProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <CircleAlert fill="var(--warning)" stroke="white" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="sm:justify-end">
          <Button onClick={onConfirm}>확인</Button>
          <DialogClose
            render={
              <Button variant="outline" type="button">
                취소
              </Button>
            }
          ></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
