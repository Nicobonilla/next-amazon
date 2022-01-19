import React from 'react'
import NumberFormat from 'react-number-format';

export default function FormatoPrecio({price}) {
    return (
        <>
            <NumberFormat
                value={price}
                displayType="text"
                prefix="$"
                decimalSeparator={','}
                thousandSeparator={'.'}
            />
        </>
    )
}
