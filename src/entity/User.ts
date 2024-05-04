import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber } from "class-validator";

import { BaseEntity } from "./Base";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @IsNumber()
  id: number
}