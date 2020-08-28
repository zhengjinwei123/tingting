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

    getUserBlogsPageNate(last_id, cur_page) {
        return utils.request({
            url: '/api/blog/user-blogs-pagenate',
            data: {
                last_id: last_id,
                cur_page: cur_page
            }
        })
    }

    getCategories() {
        return utils.request({
            url: '/api/blog/user-categories',
        })
    }

    publishBlog(id, status) {
        return utils.request({
            url: '/api/blog/publish',
            data: {
                id: id,
                status: status
            }
        })
    }

    getBlog(id) {
        return utils.request({
            type: 'post',
            url: '/pub/blog/' + id,
        })
    }

    updateBlog(id, name, category_id, content) {
        return utils.request({
            type: 'post',
            url: '/api/blog/update',
            data: {
                id: id,
                blog_name: name,
                category_id: category_id,
                content: content,
            }
        })
    }

    deleteBlog(id) {
        return utils.request({
            url: '/api/blog/delete',
            data: {
                id: id,
            }
        })
    }
}

export default BlogService.getInstance()
