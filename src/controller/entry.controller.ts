import { Request, Response } from "express"
import { z as zod } from "zod"
import validateEntry from "../validators/entry.validators"
import EntryModel from "../model/entry.model"


export const createEntry = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const result = validateEntry.parse(body)
    const entry = await EntryModel.create(result)
    res.status(201).json(entry)
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    res.status(500).json({ message: "Server error", error })
  }
}

export const editEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const body = req.body

    const result = validateEntry.parse(body)
    const updated = await EntryModel.findByIdAndUpdate(id, result, { new: true })

    if (!updated) {
      return res.status(404).json({ message: "Entry not found" })
    }

    res.json(updated)
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: error.issues })
    }
    res.status(500).json({ message: "Server error", error })
  }
}


export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await EntryModel.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" })
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}


export const listEntries = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const entries = await EntryModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
    const total = await EntryModel.countDocuments()

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: entries,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const searchEntries = async (req: Request, res: Response) => {
  try {
    const { title } = req.query

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Search query 'title' is required" })
    }

    const results = await EntryModel.find({
      title: { $regex: title, $options: "i" },
    })

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
