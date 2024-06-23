export class Notification {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public read: boolean,
    public usedfor: string,
    public data: string | [],
    public date: {
      relative: string,
      date: string
    }
  ) { }
}
