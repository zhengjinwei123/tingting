import utils from "utils/utils.jsx";

class BlogService {
    constructor() {
        if (!BlogService.instance) {
            BlogService.instance = this;
        }
        return BlogService.instance
    }

    static getInstance() {
        if (!this.instance) {
            return this.instance = new BlogService();
        }
        return this.instance
    }

    addBlog(blog_name, blog_type, category_id, content) {
        return utils.request({
            url: '/api/blog/new',
            data: {
                blog_name: blog_name,
                blog_type: blog_type,
                category_id: category_id,
                content: content
            }
        })
    }

    addCategory(category) {
        return utils.request({
            url: '/api/blog/add-category',
            data: {
                category: category,
            }
        })
    }

    getUserBlogs() {
        return utils.request({
            url: '/api/blog/user-blogs',
        })
    }

    getCategories() {
        return utils.request({
            url: '/api/blog/user-categories',
        })
    }
}

export default BlogService.getInstance()
