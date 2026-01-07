import React from 'react';
import './Card.css'; // Assuming you have a CSS file for styling the Card component

const Card = ({ title, description, image, link }) => {
    return (
        <div className="card">
            {image && <img src={image} alt={title} className="card-image" />}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <div className="card-description">{description}</div>
                {link && (
                    <a href={link} className="card-link">
                        Learn More
                    </a>
                )}
            </div>
        </div>
    );
};

export default Card;