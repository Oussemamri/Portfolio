import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const ScrollReveal = ({ 
    children, 
    animation = 'fade-up', 
    delay = 0, 
    duration = 800,
    threshold = 0.1,
    className = '',
    style = {}
}) => {
    const [ref, isVisible] = useScrollReveal({ threshold });

    const baseStyles = {
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        ...style,
    };

    const animationStyles = {
        'fade-up': {
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        },
        'fade-down': {
            transform: isVisible ? 'translateY(0)' : 'translateY(-40px)',
        },
        'fade-left': {
            transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
        },
        'fade-right': {
            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
        },
        'fade': {
            transform: 'none',
        },
        'scale': {
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        },
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{ ...baseStyles, ...animationStyles[animation] }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
