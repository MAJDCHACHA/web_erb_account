// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Express API Documentation",
//       version: "1.0.0",
//       description: "API Documentation using Swagger with Controller Files",
//     },
//     servers: [
//       {
//         url: "http://localhost:3001", // Change this when deploying
//       },
//     ],
//   },
//   apis: ["./docs/*.js"], // Now Swagger reads documentation from controllers
// };

// const swaggerSpec = swaggerJSDoc(options);

// const setupSwagger = (app) => {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };

// export default setupSwagger;
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import path from "path";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Express API Documentation",
//       version: "1.0.0",
//       description: "API Documentation using Swagger with Controller Files",
//     },
//     servers: [
//       {
//         url: "http://localhost:3001", // غيرها عند النشر
//       },
//     ],
//   },
//   apis: [path.join(process.cwd(), "docs", "*.js")], // استخدم مسار مطلق
// };

// const swaggerSpec = swaggerJSDoc(options);

// const setupSwagger = (app) => {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   console.log("✅ Swagger UI متاح على: http://localhost:3001/api-docs");
// };

// export default setupSwagger;
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API Documentation using Swagger with Authentication",
    },
    servers: [
      {
        url: "http://localhost:3001", 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
export default setupSwagger;

