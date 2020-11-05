import { Controller, Logger } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateCategoryDto } from "src/dtos/create-category.dto";
import { CategoriesService } from "src/services/categories.service";

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  logger = new Logger(CategoriesController.name);

  @EventPattern('create-category')
  async create(@Payload() createCategoryDto: CreateCategoryDto) {
    this.logger.log(createCategoryDto);

    return await this.categoriesService.create(createCategoryDto);
  }

  @MessagePattern('find-categories')
  async findAllCategories(@Payload() id: string) {
    if(id) {
      return this.categoriesService.findById(id);
    }

    return this.categoriesService.findAll();
  }
}