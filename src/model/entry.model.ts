import { model, Schema } from "mongoose"

const entrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['MOVIE', 'TV_SHOW'],
        required: true
    },
    director: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    yearTime: {
        type: String,
        required: true
    }
}, { timestamps: true })


const EntryModel = model('Entry', entrySchema)

export default EntryModel