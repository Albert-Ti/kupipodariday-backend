import { GeneralEntityProperties } from 'src/general-properties.entity';
import { Offer } from 'src/offers/entities/offers.entity';
import { Wish } from 'src/wishes/entities/wishes.entity';
import { Wishlist } from 'src/wishlists/entities/wishlists.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User extends GeneralEntityProperties {
  @Column({ unique: true })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlists) => wishlists.user)
  wishlists: Wishlist[];
}
