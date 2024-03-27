import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./src/utils/build-route-path.js";
const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { id } = req.query;

      const users = database.select("users", id ? {
        id: id
      } : null);

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        nome: name,
        email: email,
      };
      database.insert("users", user);
      return res.writeHead(201).end(JSON.stringify(user));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, {
        name,
        email,
      });

      return res.writeHead(204).end(String(name));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);
      return res.writeHead(204).end();
    },
  },
];
