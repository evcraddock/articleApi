import mongoose, { Schema } from 'mongoose'

const linkSchema = new Schema({
  title: {
    type: String
  },
  linkTitle: {
    type: String
  },
  url: {
    type: String
  },
  banner: {
    type: String
  },
  categories: {
    type: [String]
  },
  tags: {
    type: [String]
  }
}, {
  timestamps: true
})

linkSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      linkTitle: this.linkTitle,
      url: this.url,
      banner: this.banner,
      categories: this.categories,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Link', linkSchema)
