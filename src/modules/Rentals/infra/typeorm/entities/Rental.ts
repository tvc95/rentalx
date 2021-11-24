import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../../../Accounts/infra/typeorm/entities/User";
import { Car } from "../../../../Cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string;

  // foreign key
  @ManyToOne(() => Car)
  @JoinColumn({ name: "carId" })
  car: Car;

  @Column()
  carId: string;

  // foreign key
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  expectedReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.createdAt = new Date();
      this.startDate = new Date();
    }
  }
}

export { Rental };
