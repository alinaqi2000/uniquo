import { User } from "./User";

export class Category {
  constructor(public id: number = 0,
    public title: string = "",
    public slug: string = "",
    public suggested_by: User | null = null,
    public verified: boolean = false
  ) { }
}
