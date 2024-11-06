import {varchar, serial, integer, primaryKey, boolean, timestamp, text, pgTable } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm"; 


// Customers Table Schema 
export const customers = pgTable("customers", {
    id: serial("id").primaryKey(),
    firstname: varchar("first_name").notNull(),
    lastname: varchar("last_name").notNull(),
    email: varchar("email").notNull().unique(),
    phone : varchar("phone").notNull().unique(),
    address1: varchar("address1").notNull(),
    address2: varchar("address2"),
    city: varchar("city").notNull(),
    state: varchar("state", {length : 3}).notNull(),
    zip: varchar("zip", {length: 10}).notNull(),
    note: text("notes"),
    active: boolean("active").notNull().default(true),
    created: timestamp("created_at").notNull().defaultNow(),
    updated: timestamp("updated_at").notNull().defaultNow().$onUpdate(()=>new Date())

})
// ========================================================================



// Tickets Table Schema
export const tickets = pgTable("tickets", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().references(()=>customers.id),
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    completed: boolean("completed").notNull().default(false),
    tech: varchar("tech").notNull().default("unassigned"),
    active: boolean("active").notNull().default(true),
    created: timestamp("created_at").notNull().defaultNow(),
    updated: timestamp("updated_at").notNull().defaultNow().$onUpdate(()=>new Date())

})

// ========================================================================


// Create relations (many to many) between customers and tickets

export const customersRelations = relations(customers,
    ({many})=>({
        tickets: many(tickets)
    })
)

// ========================================================================

// Create relations (one to many) between tickets and customers

export const ticketsRelations = relations(tickets,
    ({one})=>({
        customer: one(customers, {
            fields: [tickets.customerId],
            references: [customers.id]
        })
    })
)