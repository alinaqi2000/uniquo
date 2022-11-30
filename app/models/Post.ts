import { PostImage } from "./PostImage";
import { User } from "./User";

export class Post {
  constructor(
    public id: number,
    public description: string,
    public posted_at: string,
    public votes: string,
    public winner: boolean,
    public user: User,
    public images: PostImage[]
  ) {}
}
