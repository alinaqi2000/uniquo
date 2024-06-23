import { User } from "./User";

export class Category {
  constructor(public id: number = 0,
    public title: string = "",
    public slug: string = "",
    public verified: boolean = false,
    public suggested_by: User | null = null,
  ) { }
}
