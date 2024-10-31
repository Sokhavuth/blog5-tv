//models/post.js

class Post{
    async count(req, query={}){
        return await req.prisma.post.count(query)
    }

    async createPost(req){
        const new_post = {
            title: req.body.title,
            content: req.body.content,
            categories: req.body.categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos,
            author: req.user.id,
        }
        
        await req.prisma.post.create({ data: new_post })
    }

    async getPosts(req, amount){
        if(amount === "all"){
            return await req.prisma.post.findMany({ 
                orderBy: [{ date: "desc" }, { id: "desc" }],
            })
        }
        
        return await req.prisma.post.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }],
        })
    }

    async searchPosts(req, amount){
        let query
        if(req.body.category){
            query = [
                { title: { contains: req.body.q, mode: 'insensitive' } },
                { categories: { contains: req.body.category } }
            ]
        }else{
            query = [
                { title: { contains: req.body.q, mode: 'insensitive' } }
            ]
        }
        
        return await req.prisma.post.findMany({ 
            where: { AND: query },
            take: amount,
            orderBy: [{ date: "desc" }],
        })
    }

    async getPostsByCategory(req, amount){
        return await req.prisma.post.findMany({ 
            where: { categories: { has: req.params.category } },
            take: amount, 
            orderBy: [{ date: "desc" }],
        })
    }

    async getPost(req){
        return await req.prisma.post.findUnique({ where: {id: req.params.id }})
    }

    async updatePost(req){
        let newvalue = {
            title: req.body.title,
            content: req.body.content,
            categories: req.body.categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos
        }
     
        await req.prisma.post.update({ where: {id: req.params.id }, data: newvalue })
    }

    async deletePost(req){
        await req.prisma.post.delete({ where: {id: req.params.id } })
    }

    async paginatePosts(req, amount){
        let page
        if(req.body.page){
            page = parseInt(req.body.page)
        }else if(req.query.page){
            page = parseInt(req.query.page)-1
        }
        
        const posts = await req.prisma.post.findMany({ 
            orderBy: [{ date: "desc" }],
            skip: amount * (page-1),
            take: amount,
        })

        return posts
    }

    async paginatePostsByCategory(req, amount){
        const posts = await req.prisma.post.findMany({ 
            where: { categories: { contains: req.params.category } },
            orderBy: [{ date: "desc" }],
            skip: amount * (parseInt(req.params.page)-1),
            take: amount,
        })

        return posts
    }

    async getLatestPosts(req, amount){    
        return await req.prisma.post.findMany({ 
            where: {NOT: {categories: { contains: "unavailable" }}},
            take: amount, 
            orderBy: [{ date: "desc" }],
        })
    }

    async getLatestPostByCategory(req, categories, amount){
        const posts = []
        for(let category of categories){
            posts.push(await req.prisma.post.findMany({
                where: {AND: [{ categories: { contains: category } }, {NOT: {categories: { contains: "unavailable" }}}]},
                orderBy: [{ date: "desc" }],
                take: amount,
            }))
        }
    
        return posts
    }

    async getRandomPosts(req, amount, post){
        let results
        if(post.categories.includes('news')){
            if(post.categories.includes('doc')){
                results = await req.prisma.post.aggregateRaw({
                    pipeline: [{ $match : { categories:{ $regex: "doc" }, _id: {$ne: {$oid: post.id}}}}, { $sample:{ size: amount }}]
                })
            }else{
                results = await req.prisma.post.aggregateRaw({
                    pipeline: [{ $match : { categories:{ $regex: "news" }, _id: {$ne: {$oid: post.id}}}}, { $sort: { date : -1 } }, { $limit: amount }]
                })
            }
        }else{
            results = await req.prisma.post.aggregateRaw({
                pipeline: [{ $match : {categories : {$not:{ $regex: "news" }}, _id: {$ne: {$oid: post.id}}} }, { $sample:{ size: amount }}]
            })
        }
       
        return results
    }

    async getRandomAll(req, amount){
        const results = await req.prisma.post.aggregateRaw({
            pipeline: [{ $match : { categories : { $regex: 'movie' } } }, { $sample:{ size: amount }}]
        })

        return results
    }
}

export default new Post()