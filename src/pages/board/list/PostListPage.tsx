import { Link, useNavigate } from "react-router";

import dayjs from "dayjs";
import { ChevronRight, PenSquare } from "lucide-react";

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { mock } from "./dummy";

export function PostListPage() {
  const navigate = useNavigate();

  const posts = mock.content;

  const handleCreateClick = () => {
    navigate("/new");
  };

  return (
    <Page
      title="게시글 목록"
      titleAction={
        <Button onClick={handleCreateClick}>
          <PenSquare className="mr-2 h-4 w-4" />
          글쓰기
        </Button>
      }
    >
      {/* 게시판 목록 */}
      <div className="divide-border divide-y">
        {posts?.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}`}
            className="hover:bg-muted/50 flex cursor-pointer items-center justify-between px-4 py-5 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Typography variant="body1Normal">{item.title}</Typography>
              </div>
              <div className="flex items-center gap-2">
                <Typography variant="caption1" className="text-muted-foreground">
                  {item.category}
                </Typography>
                <Typography variant="caption1" className="text-muted-foreground">
                  ·
                </Typography>
                <Typography variant="caption1" className="text-muted-foreground">
                  {dayjs(item.createdAt).format("YYYY.MM.DD")}
                </Typography>
              </div>
            </div>
            <ChevronRight className="text-muted-foreground h-5 w-5 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </Page>
  );
}
