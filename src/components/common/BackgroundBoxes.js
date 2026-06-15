import React from 'react';
import { motion } from 'framer-motion';

const COLORS = [
    'rgb(125, 211, 252)', // sky-300
    'rgb(249, 168, 212)', // pink-300
    'rgb(134, 239, 172)', // green-300
    'rgb(253, 224, 71)',  // yellow-300
    'rgb(252, 165, 165)', // red-300
    'rgb(216, 180, 254)', // purple-300
    'rgb(147, 197, 253)', // blue-300
    'rgb(165, 180, 252)', // indigo-300
    'rgb(196, 181, 253)', // violet-300
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// Defining outside component so React.memo truly avoids re-creation.
// Counts are sized to cover the footer after the skew/scale transform —
// far fewer than the original 150×100 (15k nodes) for performance, and
// the reduced width is fully contained by the footer's overflow:hidden.
const ROWS = new Array(60).fill(null);
const COLS = new Array(24).fill(null);
const BORDER = '#334155'; // slate-700

const containerStyle = {
    transform: 'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)',
    position: 'absolute',
    left: '25%',
    padding: '1rem',
    top: '-25%',
    display: 'flex',
    width: '100%',
    height: '100%',
    zIndex: 0,
};

const rowStyle = {
    width: '4rem',   // w-16
    position: 'relative',
    borderLeft: `1px solid ${BORDER}`,
    flexShrink: 0,
};

const colStyle = {
    width: '4rem',
    height: '2rem',  // h-8
    borderRight: `1px solid ${BORDER}`,
    borderTop: `1px solid ${BORDER}`,
    position: 'relative',
};

const svgStyle = {
    position: 'absolute',
    height: '1.5rem',
    width: '2.5rem',
    top: '-14px',
    left: '-22px',
    pointerEvents: 'none',
};

const BoxesCore = () => {
    return (
        <div style={containerStyle}>
            {ROWS.map((_, i) => (
                <motion.div key={`row-${i}`} style={rowStyle}>
                    {COLS.map((_, j) => (
                        <motion.div
                            key={`col-${j}`}
                            style={colStyle}
                            whileHover={{
                                backgroundColor: getRandomColor(),
                                transition: { duration: 0 },
                            }}
                            animate={{ transition: { duration: 2 } }}
                        >
                            {j % 2 === 0 && i % 2 === 0 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke={BORDER}
                                    style={svgStyle}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
