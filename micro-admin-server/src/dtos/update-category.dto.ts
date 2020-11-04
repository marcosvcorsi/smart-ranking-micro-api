
import { Event } from "../models/category.schema";

export class UpdateCategoryDto {
  description: string;
  events: Array<Event>
}