import postDb from '$lib/db/post.js'

export async function load({ locals }) {
    const count = await postDb.count(locals)
    const settings = await locals.settings(locals)
    const posts = await postDb.getPosts(locals, settings.frontend)
    const latestPosts = await postDb.getLatestPosts(locals, 20)
    const categories = ['Khmer', 'Thai', 'Chinese', 'Korean', 'world']
    const postsByCategory = await postDb.getLatestPostByCategory(locals, categories, 20)
    const pageURL = '/'
    const title = 'ទំព័រដើម'
    return {posts, count, settings, latestPosts, postsByCategory, pageURL, title}
}