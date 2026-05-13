import { render, screen } from "@testing-library/react";
import UserDetail from "../_components/UserDetail";
import { mockUserDetail } from "@/src/const/const";

describe("UserDetail", () => {
  const users = mockUserDetail;

  describe("Render", () => {
    it("renders title", () => {
      render(<UserDetail userDetail={users} />);

      expect(screen.getByText(users.name)).toBeInTheDocument();
    });
  });
});
