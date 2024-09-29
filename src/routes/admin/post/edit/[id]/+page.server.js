import postDb from "$lib/db/post.js"
import { error } from '@sveltejs/kit'
import categoryDB from "$lib/db/category.js"
import { redirect } from '@sveltejs/kit'
import { setFlash } from 'sveltekit-flash-message/server'

export async function load({ params, locals, url }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    locals.params  = params
    const navPage = url.searchParams.get('p') || 1
    locals.body = {page:navPage}

    const count = await postDb.count(locals)
    const settings = await locals.settings(locals)
    const post = await postDb.getPost(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const items = await postDb.paginatePosts(locals, settings.dashboard) 
    const categories = await categoryDB.getAllItems(locals)

    return {user, count, settings, post, items, categories, info:"ការផ្សាយ", type:"post", pageNumber, navPage}
}

export const actions = {
    update: async ({ request, locals, cookies }) => {
        const data = await request.formData()

        const params = {}
        params.id = data.get('id')
        locals.params = params

        if(locals.user.role !== 'Admin'){
            if(data.get('author') !== locals.user.id){
                setFlash({ type: 'error', message: 'អ្នក​មិន​អាច​កែប្រែ​ការផ្សាយ​របស់អ្នក​ដទៃ​បាន​ឡើយ!' }, cookies)
                return
            }
        }

        const title = data.get('title')
        const content = data.get('content')
        const categories = data.get('categories')
        const thumb = data.get("thumb")
        const datetime = data.get("datetime")
        const videos = data.get("videos")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' &&
            typeof categories === 'string' && categories !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof datetime === 'string' && datetime !== '' &&
            typeof videos === 'string'
        )
        
	    if(validate){
            locals.body = {title, content, categories, thumb, datetime, videos}
            await postDb.updatePost(locals)
            setFlash({ type: 'success', message: 'ការ​កែប្រែ​​សំរេច​បាន​ដោយ​ជោគជ័យ' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
    }
}