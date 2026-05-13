import { fireEvent, render, screen } from "@testing-library/react";
import UserList from "./_components/UserList";
import { useRouter } from "next/navigation";
import { mockPostList, mockTodoList, mockUserList } from "@/src/const/const";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UserList", () => {
  const users = mockUserList;

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
});
