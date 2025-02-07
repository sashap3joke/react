// describe("Data Service fake Tests", () => {
//   it("just 1st fake test", () => {
//     expect(1).toEqual(2);
//   });
// });

// TODO: Your test need to be here instead of fake tests
import axios from 'axios';
import getGitHubUser from '../services/DataService';

jest.mock('axios');

describe('getGitHubUser', () => {
  it('fetches successfully data from an API', async () => {
    const user = 'yurkovskiy';
    const responseData = { data: { login: user, id: 12345 } };
    axios.get.mockResolvedValueOnce(responseData);

    const result = await getGitHubUser(user);

    expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${user}`);
    expect(result).toEqual(responseData);
  });

  it('fetches erroneous data from an API', async () => {
    const user = 'nonexistentuser';
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getGitHubUser(user)).rejects.toThrow(errorMessage);
  });
});
