import postDb from '$lib/db/post.js'

export async function load({ locals }) {
    const count = await postDb.count(locals)
    const settings = await locals.settings(locals)
    const latestPosts = await postDb.getPosts(locals, 20)
    const categories = ['doc', 'sport', 'movie', 'travel', 'game']
    const postsByCategory = await postDb.getLatestPostByCategory(locals, categories, 20)
    const pageNumber = Math.ceil(count/settings.frontend)
    const pageURL = '/'
    const title = 'ទំព័រដើម'
    return {latestPosts, count, settings, postsByCategory, pageNumber, pageURL, title}
}