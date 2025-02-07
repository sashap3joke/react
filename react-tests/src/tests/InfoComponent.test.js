// describe("just fake tests for Info Component", () => {
//   it("1st fake test of Info Component", () => {
//     expect(true).toEqual(false);
//   });
// });

// TODO: Your test need to be here instead of fake tests
import { render, screen, waitFor } from '@testing-library/react';
import Info from '../components/Info';
import getGitHubUser from '../services/DataService';

jest.mock('../services/DataService');

describe('Info Component', () => {
  it('renders user info after data is fetched', async () => {
    const user = 'yurkovskiy';
    const mockResponse = { data: { login: 'yurkovskiy', id: 12345 } };
    getGitHubUser.mockResolvedValueOnce(mockResponse);

    render(<Info user={user} />);

    await waitFor(() => {
      expect(screen.getByText(/GitHub User Info/)).toBeInTheDocument();
      expect(screen.getByText(/login: yurkovskiy/)).toBeInTheDocument();
    });
  });

  it('renders error message if data fetching fails', async () => {
    const user = 'nonexistentuser';
    getGitHubUser.mockRejectedValueOnce(new Error('request error'));

    render(<Info user={user} />);

    await waitFor(() => {
      expect(screen.getByText(/GitHub User Info/)).toBeInTheDocument();
      expect(screen.getByText(/request error/)).toBeInTheDocument();
    });
  });
});
