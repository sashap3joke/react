import { render, screen, fireEvent } from '@testing-library/react';
import Calculations from '../components/Calculations';

describe('Calculations Component', () => {
  it('should correctly add two numbers', () => {
    render(<Calculations />);
    const firstInput = screen.getByLabelText(/first number/i);
    const secondInput = screen.getByLabelText(/second number/i);
    const evaluateButton = screen.getByRole('button', { name: /evaluate/i });

    fireEvent.input(firstInput, { target: { value: '5' } });
    fireEvent.input(secondInput, { target: { value: '3' } });
    fireEvent.click(evaluateButton);

    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('should correctly subtract two numbers', () => {
    render(<Calculations />);
    const firstInput = screen.getByLabelText(/first number/i);
    const secondInput = screen.getByLabelText(/second number/i);
    const evaluateButton = screen.getByRole('button', { name: /evaluate/i });

    // Click the dropdown to show the operations
    const operationButton = screen.getByRole('button', { name: /operation/i });
    fireEvent.click(operationButton);

    // Select the subtraction option
    const [subtractOption] = screen.getAllByText('-');
    fireEvent.click(subtractOption);

    fireEvent.input(firstInput, { target: { value: '10' } });
    fireEvent.input(secondInput, { target: { value: '4' } });
    fireEvent.click(evaluateButton);

    expect(screen.getByText('6')).toBeInTheDocument();
  });
});
