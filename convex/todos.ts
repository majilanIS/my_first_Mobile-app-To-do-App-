import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTodo = query({
    handler: async (ctx) => {
        const todos = await ctx.db
            .query("todos")
            .order("desc")
            .collect();

        return todos;
    },
});

export const addTodo = mutation({
    args: { text: v.string() },

    handler: async (ctx, { text }) => {
        const todoId = await ctx.db.insert("todos", {
            text,
            isComplete: false,
            createdAt: Date.now(),
        });
        return todoId;
    },
});

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, { id }) => {
        const todo = await ctx.db.get(id);
        if (!todo) return;
        await ctx.db.patch(id, { isComplete: !todo.isComplete });
    },
});


export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, { id }) => {
        const todo = await ctx.db.get(id);
        if (!todo) return;
        await ctx.db.delete(id);
    },
});


export const updateTodo = mutation({
    args: { id: v.id("todos"), text: v.string() },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) return;
        await ctx.db.patch(args.id, { text: args.text });
    },
});

export const deleteAllTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }
    }
});

