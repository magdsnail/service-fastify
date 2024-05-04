import { Column, CreateDateColumn, Index, UpdateDateColumn } from "typeorm";

export class BaseEntity {
  /* 创建时间 */
  @CreateDateColumn({ name: 'create_time', default: () => "CURRENT_TIMESTAMP(6)", comment: '创建时间' })
  createTime: Date

  /* 更新时间 */
  @UpdateDateColumn({ name: 'update_time', default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", comment: '更新时间' })
  updateTime: Date
}