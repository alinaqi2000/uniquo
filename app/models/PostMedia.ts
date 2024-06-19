export class PostMedia {
  constructor(
    public id: number,
    public type: "image" | "video",
    public url: string,
    public thumbnail: string = ""
  ) { }

}
