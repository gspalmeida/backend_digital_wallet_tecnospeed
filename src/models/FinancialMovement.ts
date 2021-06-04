/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import FinancialMovementCategory from './FinancialMovementCategory';

@Entity('financial_movement')
class FinancialMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  movement_category: string;

  @Column()
  description: string;

  @ManyToOne(() => FinancialMovementCategory)
  @JoinColumn({ name: 'movement_category' })
  category: FinancialMovementCategory;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  value: string;

  @Column()
  isMoneyIn: boolean;

  @Column()
  movement_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FinancialMovement;
