import React from 'react';


export default function AmountBox({text,type,amount}) {
    return (
        <div className='col'>
            <div className='card'>
                <div className={`card-header bg-${type} text-white`}>
                    {text}
                </div>
                {amount}
            </div>
        </div>
    )

}
