import { User } from "./User";

export class PostComment {
  constructor(
    public id: number,
    public post_id: number,
    public type: "comment" | "reply",
    public text: string,
    public by: User,
    public date: string,
    public replies: PostComment[] = []
  ) {}
}
