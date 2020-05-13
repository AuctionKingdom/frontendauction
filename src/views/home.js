import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => (
    <div>
        <div className="container">
        <h1 style={{fontFamily: "Italic"}}>Auction Kingdom</h1>
        <br />
        <Link className="btn btn-raised btn-info mr-5" to={`/signup`}>
            Signup
        </Link>
        <Link className="btn btn-raised btn-info mr-5" to={`/signin`}>
            Signin
        </Link>
        </div>
    </div>
);

export default Home;