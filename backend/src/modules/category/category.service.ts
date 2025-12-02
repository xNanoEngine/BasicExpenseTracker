import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto) {
    const newcategory = this.categoryRepository.create(CreateCategoryDto);
    return await this.categoryRepository.save(newcategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`La categoría con ID ${id} no existe`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, updateCategoryDto);
    if (result.affected === 0) {
      throw new NotFoundException(
        `No se pudo actualizar: ID ${id} no encontrado`,
      );
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `No se puede eliminar: ID ${id} no encontrado`,
      );
    }
    return { deleted: true };
  }
}
