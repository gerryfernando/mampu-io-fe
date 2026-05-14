import { fireEvent, render, screen } from "@testing-library/react";
import UserList from "./_components/UserList";
import { useRouter, useSearchParams } from "next/navigation";
import {
  mockMultiUserList,
  mockPostList,
  mockTodoList,
  mockUserList,
} from "@/src/const/const";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("UserList", () => {
  const users = mockUserList;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
      push: jest.fn(),
      back: jest.fn(),
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          search: "",
        };
        return params[key] ?? null;
      },
    });
  });
  describe("Render", () => {
    beforeEach(() => {
      render(
        <UserList users={users} posts={mockPostList} todos={mockTodoList} />,
      );
    });

    it("renders title", () => {
      expect(screen.getByText("User List")).toBeInTheDocument();
    });

    it("renders header", () => {
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Website")).toBeInTheDocument();
      expect(screen.getByText("Phone")).toBeInTheDocument();
      expect(screen.getByText("Detail")).toBeInTheDocument();
    });

    it("renders table", () => {
      expect(screen.getByText(users[0].email)).toBeInTheDocument();
      expect(screen.getByText(users[0].website)).toBeInTheDocument();
      expect(screen.getByText(users[0].phone)).toBeInTheDocument();
    });
  });

  describe("Click", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        replace: jest.fn(),
        back: jest.fn(),
      });
    });

    afterEach(() => jest.clearAllMocks());
    it("navigate when click detail", () => {
      render(
        <UserList users={users} posts={mockPostList} todos={mockTodoList} />,
      );

      fireEvent.click(screen.getByText("Detail"));

      expect(mockPush).toHaveBeenCalledWith("/users/1");
    });
  });

  describe("Search Input", () => {
    const twoUsers = mockMultiUserList;

    it("initializes search from url params", () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: (key: string) => {
          const params: Record<string, string> = {
            search: "John",
          };
          return params[key] ?? null;
        },
      });

      render(
        <UserList users={twoUsers} posts={mockPostList} todos={mockTodoList} />,
      );

      const input = screen.getByPlaceholderText(
        "Search user and press enter to search",
      );
      expect(input).toHaveValue("John");
      expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
      expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
    });

    it("updates value when typing", () => {
      render(
        <UserList users={twoUsers} posts={mockPostList} todos={mockTodoList} />,
      );

      const input = screen.getByPlaceholderText(
        "Search user and press enter to search",
      );

      fireEvent.change(input, { target: { value: "Leanne" } });

      expect(input).toHaveValue("Leanne");
    });

    it("triggers search on Enter key", () => {
      render(
        <UserList users={twoUsers} posts={mockPostList} todos={mockTodoList} />,
      );
      const input = screen.getByPlaceholderText(
        "Search user and press enter to search",
      );

      fireEvent.change(input, { target: { value: "Leanne" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
      expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
    });

    it("not triggers search when press another button", () => {
      render(
        <UserList users={twoUsers} posts={mockPostList} todos={mockTodoList} />,
      );
      const input = screen.getByPlaceholderText(
        "Search user and press enter to search",
      );

      fireEvent.change(input, { target: { value: "Leanne" } });
      fireEvent.keyDown(input, { key: "Shift" });

      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
      expect(screen.queryByText("Ervin Howell")).toBeInTheDocument();
    });

    it("reset search when value empty", () => {
      render(
        <UserList users={twoUsers} posts={mockPostList} todos={mockTodoList} />,
      );
      const input = screen.getByPlaceholderText(
        "Search user and press enter to search",
      );

      fireEvent.change(input, { target: { value: "Leanne" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();

      fireEvent.change(input, { target: { value: "" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
    });
  });

  describe("sort user", () => {
    const twoUsers = mockMultiUserList;

    it("sorts asc as default", () => {
      render(
        <UserList users={twoUsers} posts={mockPostList} todos={mockTodoList} />,
      );

      const names = screen
        .getAllByTestId("user-name")
        .map((el) => el.textContent);

      expect(names).toEqual(["Ervin Howell", "Leanne Graham"]);
    });

    it("sorts desc when sort button clicked", () => {
      render(
        <UserList users={twoUsers} posts={mockPostList} todos={mockTodoList} />,
      );

      fireEvent.click(document.querySelector("#sort-button")!);

      const names = screen
        .getAllByTestId("user-name")
        .map((el) => el.textContent);

      expect(names).toEqual(["Leanne Graham", "Ervin Howell"]);
    });
  });
});
