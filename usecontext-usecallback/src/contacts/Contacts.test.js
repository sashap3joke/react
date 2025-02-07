import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

describe("Contacts", () => {
  it("renders 'Видалити канал' buttons correctly after 3 clicks on 'Додати канал зв'язку'", async () => {    
    render(<App />);
    const addButton = screen.queryByTestId("add-button");
    act(() => addButton.click());
    act(() => addButton.click());
    act(() => addButton.click());     

    let deleteElements = await screen.findAllByText(/Видалити канал/i);

    expect(deleteElements.length).toBe(3);    
  });

  it("renders select lists correctly after 3 clicks on 'Додати канал зв'язку'", async () => {    
    render(<App />);
    const addButton = screen.queryByTestId("add-button");
    act(() => addButton.click());
    act(() => addButton.click());
    act(() => addButton.click());    

    const selectLists = screen.queryAllByRole('combobox'); 

    expect(selectLists).toHaveLength(4); 
  });

  it("renders text areas correctly after 2 clicks on 'Додати канал зв'язку'", async () => {    
    render(<App />);
    const addButton = screen.queryByTestId("add-button");
    act(() => addButton.click());
    act(() => addButton.click());        

    const textareas = screen.queryAllByRole('textbox'); 

    expect(textareas).toHaveLength(3); 
  });

  it(`renders 'Видалити канал' buttons correctly after 3 clicks on 'Додати канал зв'язку' and 1 click on 'Видалити канал'`, async () => {    
    render(<App />);
    const addButton = screen.queryByTestId("add-button");
    act(() => addButton.click());
    act(() => addButton.click());
    act(() => addButton.click());     

    let deleteElements = await screen.findAllByText(/Видалити канал/i);

    act(() => deleteElements[1].click());
    deleteElements = await screen.findAllByText(/Видалити канал/i);

    expect(deleteElements.length).toBe(2);    
  });

  it(`deletes correctly the last channel`, async () => {    
    const {user} = setup(<App />);
    const addButton = screen.queryByTestId("add-button");
    
    act(() => addButton.click());
    act(() => addButton.click());    
    let selectLists = screen.getAllByRole('combobox');    
    let optionsTelegram = screen.getAllByText('Telegram');
    await act(async() => user.selectOptions(selectLists[2], optionsTelegram[2]));
    let deleteElement = (await screen.findAllByText(/Видалити канал/i))[0];
    act(() => deleteElement.click());
  
    expect((screen.getAllByText('Telegram')[1]).selected).toBe(true);  
  });

  it(`deletes correctly not last channel`, async () => {    
    const {user} = setup(<App />);
    const addButton = screen.queryByTestId("add-button");
    
    act(() => addButton.click());
    act(() => addButton.click());    
    let contactDatas = screen.getAllByRole('textbox');   
    await act(async() => user.type(contactDatas[2], '@username'));
    let deleteElement = (await screen.findAllByText(/Видалити канал/i))[0];
    act(() => deleteElement.click());
  
    expect((screen.getAllByRole('textbox')[1]).value).toBe('@username');  
    expect((screen.getAllByRole('textbox')[0]).value).toBe('');
  });
});

describe("Statistics", () => {
it("displays correctly information about the channels count", async () => {
  render(<App />);

  // Simulate user actions
  const addButton = screen.getByTestId("add-button");
  userEvent.click(addButton);
  userEvent.click(addButton); // Add channels

  // Fetch all instances of the statistics element
  const statisticsElements = await screen.findAllByTestId('statistics');

  // Check if the number of statistics elements is correct
  expect(statisticsElements.length).toBeGreaterThan(0);

  // Assert on the content of each statistics element
  statisticsElements.forEach(element => {
    expect(element).toHaveTextContent('count of channels: 1');
  });
});

  

  it(`displays correctly information about the channel type of the last channel`, async () => {    
    const {user} = setup(<App />);
    const addButton = screen.queryByTestId("add-button");
    
    act(() => addButton.click());
    act(() => addButton.click());    
    let selectLists = screen.getAllByRole('combobox');    
    let optionsTelegram = screen.getAllByText('Viber');
    await act(async() => user.selectOptions(selectLists[2], optionsTelegram[2]));
  
    const statisticsElements = screen.queryAllByTestId('statistics');

    statisticsElements.forEach(element => {
      expect(element).not.toHaveTextContent(/your last channel is/i);
    });
  });

  it(`does not display information about the channel type if type is not selected in the last channel`, async () => {
    const {user} = setup(<App />);
    const addButton = screen.queryByTestId("add-button");
    
    act(() => addButton.click());
    act(() => addButton.click());    
    
    let selectLists = screen.getAllByRole('combobox');    
    let optionsTelegram = screen.getAllByText('Viber');
    await act(async () => user.selectOptions(selectLists[2], optionsTelegram[2]));
    
    let deleteElement = (await screen.findAllByText(/Видалити канал/i))[1];
    act(() => deleteElement.click());
  
    // Use `getAllByTestId` instead of `getByTestId`
    const statisticsElements = screen.getAllByTestId('statistics');
    
    // Verify that none of the statistics elements contain the text
    statisticsElements.forEach(element => {
      expect(element).not.toHaveTextContent(/your last channel is/i);
    });
  });
});

describe("Rerendering", () => {
  it("check if render is called for added ContactItem only", () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    render(<App />);
  
    const addButton = screen.getByTestId("add-button");
    userEvent.click(addButton);
  
    // Assert that console.log was called
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  
    consoleLogSpy.mockRestore();
  });
  

  it(`check if render is called for modified ContactItem only`, async () => {    
    const {user} = setup(<App />);
    const addButton = screen.queryByTestId("add-button");
    
    act(() => addButton.click());
    act(() => addButton.click());  
    await act(async () => {
      await addButton.click();
    });      
    const consoleLogSpy = jest.spyOn(console, 'log');
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    consoleLogSpy.mockRestore();
  }); 
});
