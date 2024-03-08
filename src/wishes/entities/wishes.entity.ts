import { GeneralEntityProperties } from 'src/general-properties.entity';
import { Offer } from 'src/offers/entities/offers.entity';
import { User } from 'src/users/entities/users.entity';
import { Wishlist } from 'src/wishlists/entities/wishlists.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'wishes' })
export class Wish extends GeneralEntityProperties {
  @Column({ length: 250 })
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  raised: number;

  @Column({ length: 1024 })
  description: string;

  @Column({ default: 0 })
  copied: number;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;
}
