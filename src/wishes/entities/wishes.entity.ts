import { GeneralEntityProperties } from 'src/general-properties.entity';
import { Offer } from 'src/offers/entities/offers.entity';
import { User } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'wishes' })
export class Wish extends GeneralEntityProperties {
  @Column({ length: 250, unique: true })
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  raised: number;

  @Column({ length: 1024 })
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ default: 0 })
  copied: number;
}
