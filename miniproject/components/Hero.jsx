import Image from 'next/image'
import css from '../styles/Hero.module.css'
import Cherry from '../assets/Cherry.png'
// import HeroImage from '../assets/Heroimage.png';
import {UilPhone} from '@iconscout/react-unicons';
import Pizza1 from '../assets/p1.jpg';
export default function Hero(){
     return (
        <div className={css.container}>
            {/* left soide */}
             <div className={css.left}>

            <div className={css.cherryDiv}>
                <span>More Than faster</span>
                <Image src={Cherry} alt="" width={40} height={25}/>
            </div>


            <div className={css.heroText}>
                <span>Be the fastest</span>
                <span>In Delivering</span>
                <span>
                    Your <span style={{color: "var(--themeRed)"}}>Pizza</span>
                </span>
            </div>

            <span className={css.miniText}>
                Our mission is to fillion yoyur tummy with delicious food and 
                with taste and free delivery
            </span>
            
            <button className={'btn ${css.btn}'}>
                Get Started
            </button>

            </div>
            {/*right side */}
            <div className={css.right}>
                {/* <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="hero image" layout="intrinsic"/>
                </div> */}

                <div className={css.ContactUs}>
                    <span>Contact Us</span>
                <div>
                <UilPhone color='white'/>
                </div>
            </div>

            <div className={css.Pizza}>
                <div>
                    <Image src={Pizza1} alt='' objectFit='cover' layout='intrinsic'/>
                </div>
                <div className={css.details}>
                    <span>Italian Pizza</span>
                    <span><span style={{color:"var(--themeRed)"}}>$</span>7.48</span>
                </div>
            </div>

            </div>
        </div>
     )
}