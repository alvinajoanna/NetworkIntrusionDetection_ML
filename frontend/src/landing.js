import React, { useEffect } from "react";
import "./css/landing/animations.css";
import "./css/landing/nav-bar.css";
import "./css/landing/index.css";


function LandingPage(){

    useEffect(()=>{
        var domStrings = {
            title: document.getElementById('top-title'),
            getStarted: document.getElementById('get-started'),
            vector: document.getElementById('top-vector'),
            wwaTitle: document.getElementById('wwa-title'),
            wwaText: document.getElementById('wwa-text'),
            serviceTitle: document.getElementById('service-title'),
            service1: document.getElementById('service-card-1'),
            service2: document.getElementById('service-card-2'),
            service3: document.getElementById('service-card-3'),
            testimonialTitle: document.getElementById('testimonial-title'),
            testimonials: document.getElementsByClassName('testimonial-container'),
            bars: document.querySelector('#menu-bars > i'),
            navLinks: document.querySelector('#nav-links')
        };
        
        
        domStrings.bars.onclick = () => {
            if (domStrings.navLinks.style.display !== 'flex') {
                domStrings.navLinks.style.display = 'flex';
            } else {
                domStrings.navLinks.style.display = 'none'
            }
        }
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.0
        };
        
        var addAnimation = (target, type) => {
            switch (type) {
                case 'move-up':
                    target.style.animation = "move-up 1s linear"
                    break;
        
                case 'move-right':
                    target.style.animation = "move-right 1s linear"
                    break;
        
                case 'move-left':
                    target.style.animation = "move-left 1s linear"
                    break;
        
                case 'fade-in':
                    target.style.animation = "fade-in 1s linear"
                    break;
                default:
                    break;
            }
        }
        
        
        //observers
        var titleObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-up')}
        }, options);
        
        var getStartedObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-right')}
        }, options);
        
        var vectorObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-left') }
        }, options);
        
        var wwaTitleObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-right')}
        }, options);
        
        var wwaTextObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-left') }
        }, options);
        
        var serviceTitleObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-up')}
        }, options);
        
        var service1Observer = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-right')}
        }, options);
        
        var service2Observer = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-up') }
        }, options);
        
        var service3Observer = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-left') }
        }, options);
        
        var testimonialTitleObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'fade-in')}
        }, options);
        
        var testimonialOddObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-right')}
        }, options);
        
        var testimonialEvenObserver = new IntersectionObserver((entries, observer) => {
            if(entries[0].intersectionRatio !== 0) {addAnimation(entries[0].target, 'move-left')}
        }, options);
        
        
        // observing
        titleObserver.observe(domStrings.title);
        getStartedObserver.observe(domStrings.getStarted);
        vectorObserver.observe(domStrings.vector);
        wwaTitleObserver.observe(domStrings.wwaTitle);
        wwaTextObserver.observe(domStrings.wwaText);
        serviceTitleObserver.observe(domStrings.serviceTitle);
        service1Observer.observe(domStrings.service1);
        service2Observer.observe(domStrings.service2);
        service3Observer.observe(domStrings.service3);
        testimonialTitleObserver.observe(domStrings.testimonialTitle);
        
        var iterator = 0
        
        for (iterator; iterator < domStrings.testimonials.length; iterator += 1) {
            if (parseInt(domStrings.testimonials[iterator].id[domStrings.testimonials[iterator].id.length - 1]) % 2 == 0) {
                testimonialEvenObserver.observe(domStrings.testimonials[iterator])
            } else {
                testimonialOddObserver.observe(domStrings.testimonials[iterator])
            }
        
        }
    }, []);
    return(
        <div>
    {/* <!-- Top nav --> */}
    <header>
        <nav>
            <div className="container top-nav-landing">
                <div className="nav-logo">ISEE<span id="site-section">U</span></div>
                <ul id="nav-links">
                    <li className="nav-item"><a href="/">HOME</a></li>
                    <li className="nav-item"><a href="">CONTACT</a></li>
                    <li className="nav-item"><a href="">ABOUT</a></li>
                    <li className="nav-item"><a href="/login">LOGIN</a></li>
                </ul>
            </div>
        </nav>
    </header>
    {/* <!-- Top  ends --> */}

    {/* <!-- top section --> */}
    <div className="container">
        <div className="row">
            <div className="col-lg-4 top-left">
                <div id="top-title" className="title">We find and fix bugs on startup platforms.</div>
                <div className="get-started-container">
                    <button onClick={() => {window.location = "http://localhost:3000/login"}} id="get-started">Get Started</button>
                </div>
            </div>
            <div id="top-vector" className="col-lg-8 top-right">
                <img alt="__" width="100%" src="./assets/vectors/top.svg" />
            </div>
        </div>
    </div>
    {/* <!-- top section ends--> */}

    {/* <!-- who we are --> */}
    <div className="container who-we-are">
        <div id="wwa-title" className="section-title">
            <div>WHO WE ARE</div>
            <div id="line"></div>
        </div>
        <div id="wwa-text" className="who-we-are-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra neque eu mauris egestas commodo. Donec laoreet justo ut nibh luctus, vitae pulvinar purus lobortis. Praesent dui orci, vehicula ac odio sed, faucibus suscipit magna. Sed sit amet accumsan
            risus. Vestibulum ac justo ut dui ultrices scelerisque. Sed commodo varius lectus, finibus semper quam ullamcorper id. Mauris tincidunt dictum bibendum. Praesent consequat tellus ex, sed dignissim diam condimentum vitae. Quisque imperdiet,
            velit at iaculis interdum, orci quam convallis elit, in imperdiet risus leo ac tellus. Phasellus elementum, orci.
        </div>
    </div>
    {/* <!-- who we are ends--> */}

    {/* <!-- our services --> */}
    <div className="container our-services">
        <div id="service-title" className="section-title">
            <div>OUR SERVICES</div>
            <div id="line"></div>
        </div>
        <div className="row our-services-container">
            <div className="col-lg-4 col-md-6 card-container">
                <div id="service-card-1" className="card">
                    <div className="card-icon-1">
                        <img alt="__" height="100%" width="100%" src="./assets/vectors/service-1.svg" />
                    </div>
                    <div className="card-title">Bug hunting</div>
                    <div className="card-text">We focus primarily on cyber attacks and legit ways to find bugs in other startup platforms.</div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 card-container">
                <div id="service-card-2" className="card">
                    <div className="card-icon-2">
                        <img alt="__" height="100%" width="100%" src="./assets/vectors/service-2.svg" />
                    </div>
                    <div className="card-title">Security tips</div>
                    <div className="card-text">We tell and help startups fix their vulnerabilities.</div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 card-container">
                <div id="service-card-3" className="card">
                    <div className="card-icon-3">
                        <img alt="__" height="100%" width="100%" src="./assets/vectors/service-3.svg" />
                    </div>
                    <div className="card-title">Connect to Experts</div>
                    <div className="card-text">We put together cyber experts, researchers, students, hackers to work legally on our customers platforms.</div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- our services ends--> */}

    {/* <!-- testimonials --> */}
    <div className="container testimonials">
        <div className="row">
            <div id="testimonial-title" style={{fontWeight: "bold"}} className="testimonial-title">TESTIMONIALS</div>
        </div>
        <div className="row testimonial-container" id="testinomial-1">
            <div className="col-lg-4 testinomial-image-container">
                <div className="testimonial-image">
                    <img alt="__" src="assets/images/profile-photo.jpg" width="100%" height="100%" />
                </div>
            </div>
            <div className="col-lg-8 testinomial-content">
                <div className="testimonial-title">YOBAH BERTRAND YONKOU</div>
                <div className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor sollicitudin iaculis. Duis eleifend commodo malesuada. Aliquam placerat condimentum ex, quis porta mauris dapibus sit amet. Cras gravida erat a maximus ultrices.
                    Duis auctor, velit nec interdum volutpat, tortor nisl elementum mauris. Duis eleifend commodo malesuada. Aliquam placerat condimentum ex, quis porta mauris dapibus sit amet. Cras gravida erat a maximus ultrices. Duis auctor, velit
                    nec interdum volutpat, tortor nisl elementum mauris.</div>
            </div>
        </div>
        <div className="row testimonial-container" id="testinomial-2">

            <div className="col-lg-8 order-sm-last order-lg-first testinomial-content">
                <div className="testimonial-title">YOBAH BERTRAND YONKOU</div>
                <div className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor sollicitudin iaculis. Duis eleifend commodo malesuada. Aliquam placerat condimentum ex, quis porta mauris dapibus sit amet. Cras gravida erat a maximus ultrices.
                    Duis auctor, velit nec interdum volutpat, tortor nisl elementum mauris. Duis eleifend commodo malesuada. Aliquam placerat condimentum ex, quis porta mauris dapibus sit amet. Cras gravida erat a maximus ultrices. Duis auctor, velit
                    nec interdum volutpat, tortor nisl elementum mauris.</div>
            </div>
            <div className="col-lg-4 testinomial-image-container">
                <div className="testimonial-image">
                    <img alt="__" src="assets/images/profile-photo.jpg" width="100%" height="100%" />
                </div>
            </div>
        </div>
    </div>
    {/* <!-- testimonials --> */}

    {/* <!-- trusted by --> */}
    <div className="container trusted-by">
        <div className="section-title">
            <div>TRUSTED BY</div>
            <div id="line"></div>
        </div>
        <div className="row trusted-by-container">
            <div className="col-md-3 col-sm-4 trusted-comp">
                <img alt="__" width="100%" src="./assets/images/trusted-1.png" />
            </div>
            <div className="col-md-3 col-sm-4 trusted-comp">
                <img alt="__" width="100%" src="./assets/images/trusted-2.png" />
            </div>
            <div className="col-md-3 col-sm-4 trusted-comp">
                <img alt="__" width="100%" src="./assets/images/trusted-3.png" />
            </div>
            <div className="col-md-3 col-sm-4 trusted-comp">
                <img alt="__" width="100%" src="./assets/images/trusted-4.png" />
            </div>
            <div className="col-md-3 col-sm-4 trusted-comp">
                <img alt="__" width="100%" src="./assets/images/trusted-5.png" />
            </div>
        </div>
    </div>
    {/* <!-- trusted by --> */}

    {/* <!-- footer --> */}
    <footer>
        <div className="container-fluid footer-container">
            <div className="container ">
                <div className="row">
                    <div className="col-lg-6">&copy; <i>ISEEU 2023</i></div>
                </div>
            </div>
        </div>
    </footer>
    {/* <!-- footer ends--> */}

    {/* <!-- menu bars --> */}
    <div id="menu-bars">
        <i className="fas fa-bars"></i>
    </div>
    {/* <!-- menu bars ends--> */}

</div>
    )

}

export default LandingPage;