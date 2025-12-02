import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsUUID,
  Min,
  IsOptional,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'El monto debe ser mayor a 0' })
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  date?: Date;
}
