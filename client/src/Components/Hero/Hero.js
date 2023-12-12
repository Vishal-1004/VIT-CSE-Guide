import React from 'react'
import './Hero.css'
import TypedComponent from './TypedComponent';
import Home from '../Home';

const Hero = () => {
  return (
    <div>
    <section className="section-hero">
        <div className="hero">
            <div className="hero-text-box">
                <h1 className="heading-primary">
                    ONE STOP <br/> SOLUTION
                </h1>
                <p className="hero-description">
                    We have got you covered with&nbsp;
                    <br/>
                    <span className='text-slider'><TypedComponent/></span>
                </p>
                <a href="#" className='btn btn--outline margin-rigth-btn'>Check Index &darr;</a>
            </div>
            <div className="hero-img-box">
                <img src="/Hero_img.png" alt="Image" className='hero-img'/>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Hero
