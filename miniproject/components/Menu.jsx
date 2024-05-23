import { urlFor } from '../lib/client';
import css from '../styles/Menu.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Menu({ pizzas }) {
    return (
        <div className={css.container}>
            <div className={css.heading}>
                <span className={css.title}>OUR MENU</span>
                <span>Menu that Always</span>
                <span>Make you Fall In Love</span>
            </div>
            <div className={css.menu}>
                {pizzas.map((pizza, id) => {
                    const src = urlFor(pizza.image).url();
                    return (
                        <Link key={id} href={`/pizza/${pizza.slug.current}`}>
                            <a className={css.pizza}>
                                <div className={css.ImageWrapper}>
                                    <Image
                                        loader={() => src}
                                        src={src}
                                        alt=""
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </div>
                                <span className={css.name}>{pizza.name}</span>
                                <span className={css.price}>
                                    <span className={css.currency}>$</span>
                                    {pizza.price[1]}
                                </span>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
