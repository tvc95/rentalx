import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

const create = async () => {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(`
    INSERT INTO users(id, name, email, password, "admin", "createdAt", "driverLicense")
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'ASD-4568')
  `);

  await connection.close();
};

create().then(() => console.log("User admin created!"));
