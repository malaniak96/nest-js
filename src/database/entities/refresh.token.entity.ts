import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.REFRESH_TOKEN)
export class RefreshTokenEntity extends BaseEntity {
  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column()
  user_id: string;
  @OneToMany(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity[];
}
