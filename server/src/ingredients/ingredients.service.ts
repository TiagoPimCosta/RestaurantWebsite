import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/typeorm/entities/ingredient.entity';
import { Repository } from 'typeorm';
import { CreateIngredientParams, UpdateIngredientParams } from './params';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  create(ingredientDetails: CreateIngredientParams) {
    const newIngredient = this.ingredientRepository.create({
      ...ingredientDetails,
      createdAt: new Date(),
    });
    return this.ingredientRepository.save(newIngredient);
  }

  findAll() {
    return this.ingredientRepository.find();
  }

  findOne(id: number) {
    return this.ingredientRepository.findOneBy({ id });
  }

  update(id: number, updateIngredientDetails: UpdateIngredientParams) {
    return this.ingredientRepository.update(
      { id },
      { ...updateIngredientDetails },
    );
  }

  delete(id: number) {
    return this.ingredientRepository.delete({ id });
  }
}
