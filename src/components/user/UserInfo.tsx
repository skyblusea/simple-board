import type { User } from "@/types/user";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Typography } from "../ui/typography";

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-end">
        <Typography variant="body2Normal">{user.username}</Typography>
        <Typography variant="caption1" className="text-muted-foreground">
          {user.name}
        </Typography>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
          {user.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
