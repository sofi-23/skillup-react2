import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error404  from './Error404.jsx';

it("Has h3", () => {
    render(<Error404 />);
    const h3 = screen.getByText(/Page not found/i);
    expect(h3).toBeInTheDocument();
});