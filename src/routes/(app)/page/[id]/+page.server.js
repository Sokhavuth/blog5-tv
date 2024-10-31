import pageDb from "$lib/db/page.js"
import postDb from "$lib/db/post.js"

export async function load({ locals, params }){
    locals.params = params

    const settings = await locals.settings(locals)
    const page = await pageDb.getPage(locals)
    const categories = ['Khmer']
    const postsByCategory = await postDb.getLatestPostByCategory(locals, categories, 1)
    const randomPosts = await postDb.getRandomPosts(locals, 3, postsByCategory[0][0])
    const thumb = page.thumb
    const title = page.title

    let pageURL
    if(page.id === '66b17b1e944f187d47506cda'){
        pageURL = 'contact'
    }else if(page.id === '66b17b48944f187d47506cdc'){
        pageURL = 'about'
    }
    
    return {page, randomPosts, postsByCategory, settings, thumb, title, pageURL}
}