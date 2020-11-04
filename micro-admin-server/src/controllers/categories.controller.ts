import { Controller, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CreateCategoryDto } from "src/dtos/create-category.dto";
import { CategoriesService } from "src/services/categories.service";

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  logger = new Logger(CategoriesController.name);

  @EventPattern('create-category')
  async create(@Payload() createCategoryDto: CreateCategoryDto) {
    this.logger.log(createCategoryDto);

    return this.categoriesService.create(createCategoryDto);
  }
}