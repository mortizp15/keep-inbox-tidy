

import { action, internalQuery, mutation } from "./_generated/server"
import { api, internal } from "./_generated/api"
import { v } from "convex/values";

export const getUser = internalQuery({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const usersByEmail = ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect()
        
        return usersByEmail
    }
})

export const insertUser = mutation({
    args: { 
        email: v.string(), // User's email
        firstName: v.string(), // User's first name
        connected: v.boolean(), // Whether the user is connected to any email provider
        provider: v.union(v.string(), v.null()), // Email provider (e.g., 'Gmail', 'Outlook', null if not connected)
        accessToken: v.union(v.string(), v.null()), // Access token for the email provider 
        refreshToken: v.union(v.string(), v.null())
    }, 
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            email: args.email,
            firstName: args.firstName,
            connected: args.connected,
            provider: args.provider,
            accessToken: args.accessToken,
            refreshToken: args.refreshToken
        })
    }
})

export const createUser = action({
    args: {
        email: v.string(), // User's email
        firstName: v.string(), // User's first name
        connected: v.boolean(), // Whether the user is connected to any email provider
        provider: v.union(v.string(), v.null()), // Email provider (e.g., 'Gmail', 'Outlook', null if not connected)
        accessToken: v.union(v.string(), v.null()), // Access token for the email provider 
        refreshToken: v.union(v.string(), v.null())
    },
    handler: async (ctx, args) => {
        const user = await ctx.runQuery(internal.users.getUser, {
            email: args.email
        })

        if(user.length === 0) {
            await ctx.runMutation(api.users.insertUser, {
                email: args.email,
                firstName: args.firstName,
                connected: args.connected,
                provider: args.provider,
                accessToken: args.accessToken,
                refreshToken: args.refreshToken
            })
        }
    }
})
