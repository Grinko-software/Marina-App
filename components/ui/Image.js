import React from 'react'

const Image = ({
    src,
    alt,
    width = '100%',
    height = 'auto',
    className = ''
}) => {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    )
}

export default Image
