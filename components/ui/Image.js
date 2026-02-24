import React from 'react'

const Image = ({
    src,
    alt,
    width = '100%',
    height = 'auto',
    className = '',
    ...rest
}) => {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            {...rest}
        />
    )
}

export default Image
