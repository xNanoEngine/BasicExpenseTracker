import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from '../category/entities/category.entity';
import { GetSummaryResponseDto } from './dto/get-sumary-response.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { categoryId, ...transactionData } = createTransactionDto;
    const categoryFound = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!categoryFound) {
      throw new NotFoundException(
        `La categoría con ID ${categoryId} no existe`,
      );
    }
    const newTransaction = this.transactionRepository.create({
      ...transactionData,
      category: categoryFound,
    });
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll() {
    return await this.transactionRepository.find();
  }

  async findOne(id: string) {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException(`La transacción con ID ${id} no existe`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findOne(id);
    const { categoryId, ...rest } = updateTransactionDto;
    if (categoryId) {
      const newCategory = await this.categoryRepository.findOneBy({
        id: categoryId,
      });

      if (!newCategory) {
        throw new NotFoundException(`La categoría ID ${categoryId} no existe`);
      }
      transaction.category = newCategory;
    }
    this.transactionRepository.merge(transaction, rest);
    return await this.transactionRepository.save(transaction);
  }

  async remove(id: string) {
    const transaction = await this.findOne(id);
    return await this.transactionRepository.remove(transaction);
  }

  async getSummary(): Promise<GetSummaryResponseDto> {
    const income = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('transaction.type = :type', { type: 'INCOME' })
      .getRawOne<{ total: number }>();

    const expense = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('transaction.type = :type', { type: 'EXPENSE' })
      .getRawOne<{ total: number }>();

    // Convertimos null a 0 si no hay datos
    const totalIncome = Number(income?.total) || 0;
    const totalExpense = Number(expense?.total) || 0;
    return {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    };
  }
}
