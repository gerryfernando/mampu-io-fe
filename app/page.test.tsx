import { fireEvent, render, screen } from "@testing-library/react";
import UserTable from "./_components/UserTable";
import { useRouter } from "next/navigation";
import { mockUserList } from "@/src/const/const";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UserTable", () => {
  const users = mockUserList;

  describe("Render", () => {
    it("renders title", () => {
      render(<UserTable users={users} />);

      expect(screen.getByText("User List")).toBeInTheDocument();
    });

    it("renders header", () => {
      render(<UserTable users={users} />);

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Website")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Phone")).toBeInTheDocument();
      expect(screen.getByText("Detail")).toBeInTheDocument();
    });

    it("renders table", () => {
      render(<UserTable users={users} />);

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
      render(<UserTable users={users} />);

      fireEvent.click(screen.getByText("Detail"));

      expect(mockPush).toHaveBeenCalledWith("/users/1");
    });
  });
});
