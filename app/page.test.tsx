import { render, screen } from "@testing-library/react";
import UserTable from "./_components/UserTable";

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
];

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UserTable", () => {
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
