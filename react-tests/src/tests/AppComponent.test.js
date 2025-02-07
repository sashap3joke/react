// describe("just fake tests for App Component", () => {
//   it("1st fake test of App Component", () => {
//     expect(true).toEqual(false);
//   });
// });

// TODO: Your test need to be here instead of fake tests
import { render, screen } from '@testing-library/react';
import App from '../components/App';

describe('App Component', () => {
  it('renders App with Hello World and Info components', () => {
    render(<App />);

    expect(screen.getByText(/Hello World!/)).toBeInTheDocument();
    expect(screen.getAllByText(/GitHub User Info/).length).toBe(2); // Two Info components
  });
});

