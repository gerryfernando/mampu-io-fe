import { render, screen } from "@testing-library/react";
import UserDetail from "../_components/UserDetail";
import { mockPostList, mockTodoList, mockUserDetail } from "@/src/const/const";

describe("UserDetail", () => {
  const users = mockUserDetail;
  const posts = mockPostList;
  const todos = mockTodoList;

  describe("Render", () => {
    beforeEach(() => {
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
  });
});
