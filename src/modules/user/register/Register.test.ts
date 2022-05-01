import { Connection } from "typeorm";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.destroy();
});

// @ts-ignore
const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
  it("create user", async () => {
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: "bobbobob",
            lastName: "bob2bob",
            email: "bob5@bob.com",
            password: "bowbewfwefewfwefwef",
          },
        },
      })
    );
  });
});
