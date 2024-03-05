import { GeneralEntityProperties } from 'src/general-properties.entity';
import { User } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'wishlists' })
export class Wishlist extends GeneralEntityProperties {
  @Column({ length: 250 })
  name: string;

  @Column({ length: 1500 })
  description: string;

  @Column()
  image: string;

  @Column()
  item: number;

  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;
}
