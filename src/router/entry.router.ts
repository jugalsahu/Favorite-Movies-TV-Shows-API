import { Router } from "express";
import { createEntry, deleteEntry, editEntry, listEntries, searchEntries } from "../controller/entry.controller";

const EntryRouter = Router();

EntryRouter.post("/", createEntry)
EntryRouter.put("/:id", editEntry)
EntryRouter.delete("/:id", deleteEntry)
EntryRouter.get("/", listEntries)
EntryRouter.get("/search", searchEntries)

export default EntryRouter
