import { fireEvent, render, screen } from "@testing-library/react";
import UserDetail from "../_components/UserDetail";
import { mockPostList, mockTodoList, mockUserDetail } from "@/src/const/const";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
describe("UserDetail", () => {
  const users = mockUserDetail;
  const posts = mockPostList;
  const todos = mockTodoList;

  describe("Render", () => {
    const mockBack = jest.fn();

    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        back: mockBack,
      });
      render(<UserDetail userDetail={users} posts={posts} todos={todos} />);
    });

    it("renders label", () => {
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Website")).toBeInTheDocument();
      expect(screen.getByText("Company")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
    });

    it("renders value", () => {
      const address = `${users.address.street}, ${users.address.suite}, ${users.address.city} (${users.address.zipcode})`;

      expect(screen.getByText(users.email)).toBeInTheDocument();
      expect(screen.getByText(users.website)).toBeInTheDocument();
      expect(screen.getByText(users.company.name)).toBeInTheDocument();
      expect(screen.getByText(users.company.catchPhrase)).toBeInTheDocument();
      expect(screen.getByText(address)).toBeInTheDocument();
    });

    it("renders posts", () => {
      expect(screen.getByText(posts[0].title)).toBeInTheDocument();
      expect(screen.getByText(posts[0].body)).toBeInTheDocument();
    });

    it("renders posts", () => {
      fireEvent.click(document.querySelector("#post-button")!);

      expect(screen.getByText(posts[0].title)).toBeInTheDocument();
      expect(screen.getByText(posts[0].body)).toBeInTheDocument();
      expect(screen.queryByText(posts[5].title)).not.toBeInTheDocument();
      expect(screen.queryByText(posts[5].body)).not.toBeInTheDocument();
    });

    it("renders hidden posts", () => {
      fireEvent.click(document.querySelector("#show-more-button")!);

      expect(screen.queryByText(posts[5].title)).toBeInTheDocument();
      expect(screen.queryByText(posts[5].body)).toBeInTheDocument();
    });

    it("renders todos", () => {
      fireEvent.click(document.querySelector("#todo-button")!);

      expect(screen.getByText(todos[0].title)).toBeInTheDocument();
    });

    it("trigger filter completed in todos", () => {
      fireEvent.click(document.querySelector("#todo-button")!);
      fireEvent.click(document.querySelector("#filter-completed")!);

      expect(screen.queryByText(todos[0].title)).not.toBeInTheDocument();
      expect(screen.getByText(todos[1].title)).toBeInTheDocument();
    });

    it("trigger filter pending in todos", () => {
      fireEvent.click(document.querySelector("#todo-button")!);
      fireEvent.click(document.querySelector("#filter-pending")!);

      expect(screen.queryByText(todos[1].title)).not.toBeInTheDocument();
      expect(screen.getByText(todos[0].title)).toBeInTheDocument();
    });

    it("trigger back button", () => {
      fireEvent.click(document.querySelector("#back-button")!);

      expect(mockBack).toHaveBeenCalledWith();
    });
  });
});
