import { error } from '@sveltejs/kit'
import postDb from "$lib/db/post.js"
import categoryDB from "$lib/db/category.js"
import { setFlash } from 'sveltekit-flash-message/server'
import { redirect } from 'sveltekit-flash-message/server'

export async function load({ locals }) {
	const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const count = await postDb.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const items = await postDb.getPosts(locals, settings.dashboard)
    const categories = await categoryDB.getAllItems(locals)

    return {user, count, settings, items, categories, info:"ការផ្សាយ", type:"post", pageNumber }
}

export const actions = {
	create: async ({ request, locals, cookies }) => {
		const data = await request.formData()
        
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
            await postDb.createPost(locals)
            setFlash({ type: 'success', message: 'ការផ្សាយ​មួយ​ត្រូវ​បាន​បង្កើត​ឡើង!' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
	}
}