import { Option, some, none } from "./util";

export const Neverthrow = () => {
  type User = {
    name: string;
    age: Option<number>;
  };

  const user: User = { name: "bob", age: none() };
  console.log(user);

  return (
    <div>
      <h1>Neverthrow</h1>
    </div>
  );
};
