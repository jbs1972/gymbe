const swaggerJsdoc = require("swagger-jsdoc");

const config = require("./env.config");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Gym Member Profile REST API",
      version: "1.0.0",
      description:
        "Professional REST API for Gym Member Profile Management using Express.js and MongoDB",

      contact: {
        name: "API Support",
        email: "support@example.com",
      },

      license: {
        name: "MIT",
      },
    },

    servers: [
      {
        url: "http://localhost:3001",
        description: "Development Server",
      },

      {
        url: "https://uat.example.com",
        description: "UAT Server",
      },

      {
        url: "https://api.example.com",
        description: "Production Server",
      },
    ],

    components: {
      schemas: {
        MemberProfile: {
          type: "object",

          required: ["memberName", "dob", "contactNumber", "memberEmail", "memberAddr", "memberGender", "memberBloodGroup"],

          properties: {
            _id: {
              type: "string",
              description: "MongoDB ObjectId",
              example: "689ad54cb72e4c0012d91f11",
            },

            memberName: {
              type: "string",
              description: "Member full name",

              minLength: 5,
              maxLength: 50,

              example: "Mayukh Neogi",
            },

            dob: {
              type: "string",
              format: "date",
              description: "Date of birth (YYYY-MM-DD)",

              example: "2001-05-15",
            },

            contactNumber: {
              type: "string",
              description: "Primary contact number",

              minLength: 5,
              maxLength: 50,

              example: "9876543210",
            },

            memberEmail: {
              type: "string",
              format: "email",
              description: "Member email address",

              minLength: 5,
              maxLength: 100,

              example: "mayukh@example.com",
            },

            memberAddr: {
              type: "string",
              description: "Member residential address",

              minLength: 5,
              maxLength: 200,

              example: "Kolkata, West Bengal",
            },

            memberGender: {
              type: "string",
              description: "Member gender",
              enum: ["Male", "Female", "Other"],

              example: "Male",
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Record creation timestamp",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Record last update timestamp",
            },
          },
        },

        MemberProfileCreateRequest: {
          type: "object",

          required: ["memberName", "dob", "contactNumber", "memberEmail", "memberAddr", "memberGender", "memberBloodGroup"],

          properties: {
            memberName: {
              type: "string",

              minLength: 5,
              maxLength: 50,

              example: "John Doe",
            },

            dob: {
              type: "string",
              format: "date",

              example: "2001-05-15",
            },

            contactNumber: {
              type: "string",

              minLength: 5,
              maxLength: 50,

              example: "9876543210",
            },

            memberEmail: {
              type: "string",
              format: "email",

              minLength: 5,
              maxLength: 100,

              example: "john@example.com",
            },

            memberAddr: {
              type: "string",

              minLength: 5,
              maxLength: 200,

              example: "Mumbai, Maharashtra",
            },

            memberGender: {
              type: "string",
              enum: ["Male", "Female", "Other"],

              example: "Male",
            },

            memberBloodGroup: {
              type: "string",
              enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],

              example: "A+",
            },
          },
        },

        MemberProfileUpdateRequest: {
          type: "object",

          properties: {
            memberName: {
              type: "string",

              minLength: 5,
              maxLength: 50,

              example: "Jane Doe",
            },

            dob: {
              type: "string",
              format: "date",

              example: "2000-03-20",
            },

            contactNumber: {
              type: "string",

              minLength: 5,
              maxLength: 50,

              example: "9999999999",
            },

            memberEmail: {
              type: "string",
              format: "email",

              minLength: 5,
              maxLength: 100,

              example: "jane@example.com",
            },

            memberAddr: {
              type: "string",

              minLength: 5,
              maxLength: 200,

              example: "Delhi, India",
            },

            memberGender: {
              type: "string",
              enum: ["Male", "Female", "Other"],

              example: "Female",
            },

            memberBloodGroup: {
              type: "string",
              enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],

              example: "A+",
            },
          },
        },

        MemberProfilePatchRequest: {
          type: "object",

          properties: {
            memberName: {
              type: "string",

              minLength: 5,
              maxLength: 50,

              example: "Jane Doe",
            },

            dob: {
              type: "string",
              format: "date",

              example: "2000-03-20",
            },

            contactNumber: {
              type: "string",

              minLength: 5,
              maxLength: 50,

              example: "9999999999",
            },

            memberEmail: {
              type: "string",
              format: "email",

              minLength: 5,
              maxLength: 100,

              example: "jane@example.com",
            },

            memberAddr: {
              type: "string",

              minLength: 5,
              maxLength: 200,

              example: "Delhi, India",
            },

            memberGender: {
              type: "string",
              enum: ["Male", "Female", "Other"],

              example: "Female",
            },

            memberBloodGroup: {
              type: "string",
              enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],

              example: "A+",
            },
          },
        },

        SuccessResponse: {
          type: "object",

          properties: {
            status: {
              type: "string",
              example: "success",
            },

            data: {
              type: "object",
            },
          },
        },

        ErrorResponse: {
          type: "object",

          properties: {
            status: {
              type: "string",
              example: "error",
            },

            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },
      },
    },

    tags: [
      {
        name: "Member Profiles",
        description: "Member Profile Management APIs",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
