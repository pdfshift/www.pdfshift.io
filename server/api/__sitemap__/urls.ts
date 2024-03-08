import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
    // Fetch all documents
    const docs = await serverQueryContent(event).find()

    return docs.filter(doc => doc?.draft !== true).map(doc => ({
        loc: doc._path
    }))
})