/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import FinancialMovement from './FinancialMovement';

@Entity('financial_movement_category')
class FinancialMovementCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  movement_category_name: string;

  @OneToMany(
    () => FinancialMovement,
    financialMovement => financialMovement.category,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  @JoinColumn({ name: 'movement_category_name' })
  financial_movements: FinancialMovement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FinancialMovementCategory;
