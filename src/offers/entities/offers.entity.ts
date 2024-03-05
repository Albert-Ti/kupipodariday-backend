import { GeneralEntityProperties } from 'src/general-properties.entity';
import { User } from 'src/users/entities/users.entity';
import { Wish } from 'src/wishes/entities/wishes.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'offers' })
export class Offer extends GeneralEntityProperties {
  @Column()
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;
}
