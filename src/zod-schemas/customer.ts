import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstname: (schema) => schema.firstname.min(1, "First name is required"),
  lastname: (schema) => schema.lastname.min(1, "Last name is required"),
  address1: (schema) => schema.address1.min(1, "Address is required"),
  city: (schema) => schema.city.min(1, "City is required"),
  state: (schema) =>
    schema.state.length(2, "State must be exactly 2 characters"),
  email: (schema) => schema.email.email("Invalid email address"),
  zip: (schema) =>
    schema.zip.regex(
      /^\d{5}$/,
      "Invalid Zip code. Use 5 digits 00000"
    ),
  phone: (schema) =>
    schema.phone.regex(
      /^\d{4}-\d{7}$/,
      "Invalid phone number format. Use 0311-1234567"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
