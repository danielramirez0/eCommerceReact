import React from "react";

const FlexNav = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <div className="navbar-nav me-auto btn-group-horizontal">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => props.callback(props.callbackParam)}
                        >
                            {props.buttonText}
                        </button>
                        {props.data.map((category, index) => (
                            <li key={index} className="nav-item">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => props.callback(category.name)}
                                >
                                    {category.name}
                                    <span className="visually-hidden">(current)</span>
                                </button>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default FlexNav;
