import { PostMedia } from "./PostMedia";
import { User } from "./User";

export class Post {
  constructor(
    public id: number,
    public description: string,
    public posted_at: {
      relative: string,
      date: string
    },
    public votes: number,
    public winner: boolean,
    public approved: boolean,
    public user: User,
    public media: PostMedia[]
  ) { }

  static fromData(data: any) {
    return new Post(
      data.id,
      data.description,
      data.posted_at,
      data.votes,
      data.winner,
      data.approved,
      data.user,
      data.media,
    );
  }
}
