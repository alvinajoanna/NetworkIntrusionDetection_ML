import { useState } from "react";
import "./css/landing/animations.css";
import "./css/landing/nav-bar.css";
import "./css/login/index.css";


function Login(){

    // login error status
    const [error, setError] = useState(null);

    const [showLoader, setShowLoader] = useState(false);

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
    <div className="container main-container">
    { error !== null &&
    <div className="container">
        <div className="row">
        <div id="error-container">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <span id="error-text">{error}</span>
        </div>
    </div> 
        </div>
    </div>
    }
        <div className="row main-row">
            <div className=" col-sm-12col-lg-5 col-md-5">
                <div id="login-container">
                    <div id="title">LOGIN</div>
                    <form id="login-form" method="POST">
                        <input type="email" name="email" placeholder="Email" id="email" required 
                         onChange={() => setError(null)} />
                        <input type="password" name="password" placeholder="Password" id="password" required 
                        onChange={() => setError(null)} />
                        <input id="login-btn" type="button" value="Log In" onClick={() => {

                            let email = document.getElementById("email").value;
                            let password = document.getElementById("password").value;

                            if (email.toString().trim() === "" || password.toString().trim() === ""){
                                setError("All fields are required");
                            }else if( email.toString().trim() === "iseeu@gmail.com" && password.toString().trim() === "iseeu12345"){
                                setShowLoader(true);
                                setTimeout(() => {
                                    window.location.replace("http://localhost:3000/dashboard");
                                }, 2000);
                               
                            }else{
                                setError("Invalid email or password.");
                            }
                        }} />
                    </form>
                    <div id="alternative-login">
                        <ul>
                            <li><i className="fab fa-google"></i></li>
                            <li><i className="fab fa-github"></i></li>
                            <li><i className="fab fa-facebook-f"></i></li>
                        </ul>
                    </div>
                    <div id="glass"></div>
                </div>
            </div>
            <div id="filler-column" className="col-lg-2 col-md-1  col-sm-1"></div>
            <div id="right-vector" className=" col-sm-12 col-lg-5 col-md-6  ">
                <img alt="__" width="100%" src="./assets/vectors/toplogin.svg" />
            </div>
        </div>
    </div>
    {/* <!-- top section ends--> */}

    

    {/* <!-- loader --> */}
    {/* <div id="loader">
        <div className="spinner-grow text-primary" style={{width: "3rem", height: "3rem"}}></div>
    </div> */}
    {/* <!-- loader ends--> */}
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

    {
        showLoader &&
       
        <div className="loader-container">
          <div className="loader">ISEEU</div>
          <div className="loader spinner-border text-dark" role='status'>
            <span className='sr-only'></span>
          </div>
        </div>
    }
    {/* <!-- menu bars ends--> */}
    
</div>
    );
}

export default Login;