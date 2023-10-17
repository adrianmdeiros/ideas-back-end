"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express5 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/routes/index.ts
var import_express4 = require("express");

// src/routes/user.routes.ts
var import_express = require("express");

// src/database/index.ts
var import_client = require("@prisma/client");
var database = new import_client.PrismaClient();

// src/controllers/UserController.ts
var import_http_status_codes = require("http-status-codes");
BigInt.prototype.toJSON = function() {
  return this.toString();
};
var UserController = class {
  async create(req, res) {
    const { id, name, email, phone, avatarURL, bond, bio } = req.body;
    try {
      const user = await database.user.create({
        data: {
          id,
          name,
          email,
          phone,
          avatarURL,
          bond,
          bio
        }
      });
      return res.status(import_http_status_codes.StatusCodes.CREATED).json(user);
    } catch (e) {
      return res.status(import_http_status_codes.StatusCodes.CONFLICT).json({
        message: "User already exists!"
      });
    }
  }
  async read(req, res) {
    try {
      const users = await database.user.findMany();
      if (users.length === 0) {
        res.status(import_http_status_codes.StatusCodes.NOT_FOUND).json({
          message: "Cannot find users!"
        });
      }
      return res.status(import_http_status_codes.StatusCodes.OK).json(users);
    } catch (e) {
      res.status(import_http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json();
    }
  }
};

// src/routes/user.routes.ts
var userRouter = (0, import_express.Router)();
var userController = new UserController();
userRouter.post("/users", userController.create);
userRouter.get("/users", userController.read);
var user_routes_default = userRouter;

// src/routes/project.routes.ts
var import_express2 = require("express");

// src/controllers/ProjectController.ts
var import_http_status_codes2 = require("http-status-codes");
var ProjectController = class {
  async create(req, res) {
    const { title, description, studentsRequired, userId, categoryId } = req.body;
    try {
      const savedProject = await database.project.create({
        data: {
          title,
          description,
          studentsRequired,
          user: {
            connect: {
              id: userId
            }
          },
          category: {
            connect: {
              id: categoryId
            }
          }
        }
      });
      return res.status(import_http_status_codes2.StatusCodes.CREATED).json(savedProject);
    } catch (err) {
      if (userId === null || categoryId === null) {
        return res.status(import_http_status_codes2.StatusCodes.BAD_REQUEST).json({
          message: "userId and categoryId are required!"
        });
      }
      return res.status(import_http_status_codes2.StatusCodes.CONFLICT).json(
        {
          message: "Project already exists!"
        }
      );
    }
  }
  async read(req, res) {
    const { categoryId } = req.query;
    if (categoryId !== void 0 && typeof categoryId === "string") {
      const categoryIdInt = parseInt(categoryId);
      if (!isNaN(categoryIdInt)) {
        try {
          const projectsByCategory = await database.project.findMany({
            where: {
              category: {
                id: categoryIdInt
              }
            },
            select: {
              id: true,
              title: true,
              description: true,
              studentsRequired: true,
              category: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatarURL: true
                }
              }
            }
          });
          if (projectsByCategory.length === 0) {
            return res.status(import_http_status_codes2.StatusCodes.NOT_FOUND).json({
              message: "Category doesn't exists or has no projects!"
            });
          }
          return res.status(import_http_status_codes2.StatusCodes.OK).json(projectsByCategory);
        } catch (e) {
          return res.status(import_http_status_codes2.StatusCodes.INTERNAL_SERVER_ERROR).json();
        }
      }
    }
    try {
      const projects = await database.project.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          studentsRequired: true,
          category: true,
          user: {
            select: {
              id: true,
              name: true,
              avatarURL: true
            }
          }
        }
      });
      if (projects.length === 0) {
        return res.status(import_http_status_codes2.StatusCodes.NOT_FOUND).json();
      }
      return res.status(import_http_status_codes2.StatusCodes.OK).json(projects);
    } catch (e) {
      return res.status(import_http_status_codes2.StatusCodes.INTERNAL_SERVER_ERROR).json();
    }
  }
  async update(req, res) {
    const { title, description, studentsRequired } = req.body;
    const { id } = req.params;
    try {
      const updatedProject = await database.project.update({
        where: {
          id
        },
        data: {
          title,
          description,
          studentsRequired
        }
      });
      return res.status(import_http_status_codes2.StatusCodes.OK).json(updatedProject);
    } catch (e) {
      return res.status(import_http_status_codes2.StatusCodes.BAD_REQUEST).json();
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedProject = await database.project.delete({
        where: {
          id
        }
      });
      return res.status(import_http_status_codes2.StatusCodes.OK).json(deletedProject);
    } catch (e) {
      return res.status(import_http_status_codes2.StatusCodes.BAD_REQUEST).json();
    }
  }
};

// src/routes/project.routes.ts
var projectRouter = (0, import_express2.Router)();
var projectController = new ProjectController();
projectRouter.get("/projects", projectController.read);
projectRouter.post("/projects", projectController.create);
projectRouter.put("/projects/:id", projectController.update);
projectRouter.delete("/projects/:id", projectController.delete);
var project_routes_default = projectRouter;

// src/routes/category.routes.ts
var import_express3 = require("express");

// src/controllers/CategoryController.ts
var import_http_status_codes3 = require("http-status-codes");
var CategoryController = class {
  async create(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await database.category.create({
        data: {
          name
        }
      });
      return res.status(import_http_status_codes3.StatusCodes.CREATED).json(newCategory);
    } catch (e) {
      return res.status(import_http_status_codes3.StatusCodes.CONFLICT).send({
        messsage: "Category already exists!"
      });
    }
  }
  async read(req, res) {
    const categories = await database.category.findMany();
    return res.status(200).json(categories);
  }
};

// src/routes/category.routes.ts
var categoryRouter = (0, import_express3.Router)();
var categoryController = new CategoryController();
categoryRouter.post("/categories", categoryController.create);
categoryRouter.get("/categories", categoryController.read);
var category_routes_default = categoryRouter;

// src/routes/index.ts
var routes = (0, import_express4.Router)();
routes.use(user_routes_default);
routes.use(project_routes_default);
routes.use(category_routes_default);
var routes_default = routes;

// src/server.ts
var app = (0, import_express5.default)();
app.use(import_express5.default.json());
app.use((0, import_cors.default)());
app.use(routes_default);
app.listen(3e3, () => {
  console.clear();
  console.log("Server is running on port 3000 \u{1F680}");
});
