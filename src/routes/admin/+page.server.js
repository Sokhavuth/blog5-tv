import { redirect } from '@sveltejs/kit'
import postDb from "$lib/db/post.js"

export async function load({ locals }) {
	const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const settings = await locals.settings(locals)
    const posts = await postDb.getPosts(locals, 14)

    return {user, posts, settings}
}