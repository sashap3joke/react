import React from "react";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { shallow, configure } from "enzyme";
import NewPostForm from "../tasks/01-ui-integration/NewPostForm";
import PostsList from "../tasks/01-ui-integration/PostsList";
import store from "../tasks/01-ui-integration/store";
import * as actions from "../tasks/01-ui-integration/actions";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

configure({ adapter: new Adapter() });

describe("NewPostForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("State should have array from Store", () => {
    const wrapper = shallow(<NewPostForm />);
    expect(wrapper.state().authors).toBe(store.getState().authors);
  });

  function setup(jsx) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  it("Action creator should be called", async () => {
    const { user } = setup(<NewPostForm />);
    const creator = jest.spyOn(actions, "addNewPost");

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Obi-Wan Kenobi" })
    );
    await user.type(screen.getByRole("textbox"), "Hello Kitty");
    await user.click(screen.getByRole("button"));

    expect(creator).toHaveBeenCalled();
  });

  it("Action creator should have matching arguments", async () => {
    const { user } = setup(<NewPostForm />);
    const creator = jest.spyOn(actions, "addNewPost");

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Obi-Wan Kenobi" })
    );
    await user.type(screen.getByRole("textbox"), "Hello Kitty");
    await user.click(screen.getByRole("button"));
    expect(creator).toBeCalledWith("bkenobi", "Hello Kitty");
  });

  it("Title should be cleared", async () => {
    const { user } = setup(<NewPostForm />);

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Obi-Wan Kenobi" })
    );
    const titleInput = screen.getByRole("textbox");
    await user.type(titleInput, "Hello Kitty");
    await user.click(screen.getByRole("button"));
    expect(titleInput).toHaveValue("");
  });

  it("Store should dispatch with action", async () => {
    const { user } = setup(<NewPostForm />);
    const creator = jest.spyOn(store, "dispatch");

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Obi-Wan Kenobi" })
    );
    await user.type(screen.getByRole("textbox"), "Hello Kitty");
    await user.click(screen.getByRole("button"));

    expect(creator).toHaveBeenCalledWith({
      type: "ADD_NEW_POST",
      id: expect.any(String),
      authorId: "bkenobi",
      title: "Hello Kitty",
    });
  });

  it("Store should not dispatch if author is null", async () => {
    const { user } = setup(<NewPostForm />);
    const creator = jest.spyOn(store, "dispatch");

    await user.type(screen.getByRole("textbox"), "Hello Kitty");
    await user.click(screen.getByRole("button"));

    expect(creator).not.toHaveBeenCalled();
  });

  it("Store should not dispatch if title is empty", async () => {
    const { user } = setup(<NewPostForm />);
    const creator = jest.spyOn(store, "dispatch");

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Obi-Wan Kenobi" })
    );

    await user.click(screen.getByRole("button"));
    expect(creator).not.toHaveBeenCalled();
  });
});

describe("PostsList", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("State should have array from Store", () => {
    const wrapper = shallow(<PostsList />);
    expect(wrapper.state().authors).toBe(store.getState().authors);
    expect(wrapper.state().posts).toBe(store.getState().posts);
  });

  it("Store should be subscribed", () => {
    const creator = jest.spyOn(store, "subscribe");
    shallow(<PostsList />);
    expect(creator).toHaveBeenCalled();
  });

  it("Callback should be passed", () => {
    const creator = jest.spyOn(store, "subscribe");
    const wrapper = shallow(<PostsList />);
    expect(creator).toHaveBeenCalledWith(wrapper.instance().onStoreUpdated);
  });

  it("Adding new post should trigger state update", () => {
    const wrapper = shallow(<PostsList />);
    store.dispatch(actions.addNewPost("bkenobi", "Hello!"));
    expect(wrapper.state().posts.length).toBeGreaterThanOrEqual(4);
    expect(
      wrapper
        .state()
        .posts.filter(
          (el) => el.authorId === "bkenobi" && el.title === "Hello!"
        ).length
    ).toBe(1);
  });
});
