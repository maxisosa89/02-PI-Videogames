import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return (
        <div>
            <div>
                <div>
                    <h1>Welcome to Videogames Project</h1>
                    <div>
                        <Link to = '/home'>
                            <button>Go!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}