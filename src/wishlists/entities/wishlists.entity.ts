import { GeneralEntityProperties } from 'src/general-properties.entity';
import { User } from 'src/users/entities/users.entity';
import { Wish } from 'src/wishes/entities/wishes.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'wishlists' })
export class Wishlist extends GeneralEntityProperties {
  @Column({ length: 250 })
  name: string;

  @Column({ length: 1500 })
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;

  @OneToMany(() => Wish, (wish) => wish.wishlist)
  items: Wish[];
}
