import mongoose, { Schema } from 'mongoose'

const articleSchema = new Schema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  publishDate: { 
    type: Date, 
    default: Date.now 
  },
  content: {
    type: String
  },
  dataSource: {
    type: String
  },
  banner: {
    type: String
  },
  author: {
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

articleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      url: this.url,
      publishDate: this.publishDate,
      content: this.content,
      dataSource: this.dataSource,
      banner: this.banner,
      author: this.author,
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

export default mongoose.model('Article', articleSchema)
