import React, { useState, useRef, useEffect } from 'react';
import './input.css';

const Input = () => {
    const [operator, setOperator] = useState('');
    const [phone, setPhone] = useState('');
    const [operatorName, setOperatorName] = useState('');
    const operatorInputRef = useRef(null);
    const phoneInputRef = useRef(null);

    const operatorsMap = {
        Kyivstar: ['67', '68', '96', '97', '98'],
        Vodafone: ['50', '66', '95', '99'],
        Lifecell: ['63', '73', '93'],
        '3mob': ['91'],
        'People.net': ['92'],
        intertelecom: ['89', '94'],
    };

    useEffect(() => {
        // Focus on the operator input when the component is mounted
        operatorInputRef.current.focus();
    }, []);

    const handleOperatorInput = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        if (value.length <= 2) {
            setOperator(value);
            if (value.length === 2) {
                // Determine the operator name based on input
                const foundOperator = Object.keys(operatorsMap).find(op =>
                    operatorsMap[op].includes(value)
                );
                setOperatorName(foundOperator || 'Unknown');
                phoneInputRef.current.focus(); // Move focus to phone input
            }
        }
    };

    const handlePhoneInput = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        if (value.length <= 7) {
            setPhone(value);
        }
    };

    const isPhoneComplete = operator.length === 2 && phone.length === 7;

    return (
        <div>
            <span data-testid="operator-name">{operatorName}</span>
            <span>+38 0</span>
            <input
                type="text"
                data-testid="operator-input"
                value={operator}
                onInput={handleOperatorInput}
                ref={operatorInputRef}
            />
            <span data-testid="check-icon">{isPhoneComplete ? '✔️' : ' - '}</span>
            <input
                type="text"
                data-testid="phone-input"
                value={phone}
                onInput={handlePhoneInput}
                ref={phoneInputRef}
            />
        </div>
    );
};

export default Input;
