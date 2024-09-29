<script>
    let {data} = $props()
	let items = $state(data.items)
	import {activePage} from "$lib/stores/page.js"
	import { getFlash } from 'sveltekit-flash-message'
    import { page } from '$app/stores'
    const flash = getFlash(page)
	let value = $state(undefined)
	$effect(() => { $activePage = value })
	let navPage = data?.navPage || 1
	
	async function paginate(e){
		const response = await fetch(`/admin/${data.type}/paginate/${e.target.value}`)
		items = await response.json()
	}
</script>

<footer>
	{#if $flash}
        {@const bg = $flash.type == 'success' ? 'var(--background)' : '#FF4136'}
        <div style:background-color={bg} class="flash">{$flash.message}</div>
    {/if}
    <div class="info">{data?.info}​ទាំងអស់​មានចំនួនៈ {data?.count}</div>
    <div class="items">
        {#each items as item}
        <div class="item">
            <a class="thumb" href="/{data.type}/{item.id}">
                <img src={item.thumb} alt='' />
                {#if item.videos?.length}
                <img class="play" src="/images/play.png" alt='' />
                {/if}
            </a>
            <div class="title">
                <a href="/{data.type}/{item.id}">{item.title}</a>
                <div>{new Date(item.date).toLocaleDateString('it-IT')}</div>
            </div>
            <div class="edit">
				<a href="/admin/{data.type}/delete/{item.id}">
					<img src="/images/delete.png" alt=''/>
				</a>
                <a style="padding-right:5px;" href={`/admin/${data.type}/edit/${item.id}?p=${value}`}>
					<img src="/images/edit.png" alt='' />
				</a>
            </div> 
        </div>
        {/each}
    </div>
	<div class="pagination">
		<span>​​​​​​​​​​​​​​​​​​​​​ទំព័រ </span>
			<select bind:value onchange={paginate}> 
				{#each [...Array(data.pageNumber).keys()] as page}
					{#if page+1 == parseInt(navPage)}
					<option selected>{page+1}</option>
					{:else}
					<option>{page+1}</option>
					{/if}
				{/each}
			</select> 
            
        <span>នៃ {data?.pageNumber}</span>
	</div>
</footer>

<style>
    footer{
		margin-top: 0;
	}
	footer .info{
		background-color: var(--background);
		text-align: center;
		margin-top: 10px;
		padding: 5px;
		color: white;
	}
	footer .items{
		display: grid;
		grid-template-columns: calc(50% - 5px ) calc(50% - 5px );
		grid-gap: 10px;
		margin-top: 10px;
	}
	footer .items .item{
		background-color: var(--background);
		display: grid;
		grid-template-columns: 130px auto;
		grid-gap: 10px;
		align-items: center;
		padding-right: 10px;
	}
	footer .items .item:hover{
		grid-template-columns: 130px auto 75px;
	}
	footer .items .item .thumb{
		position: relative;
		padding-top: 56.25%;
		overflow: hidden;
	}
	footer .items .item .thumb img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		float: left;
	}
	footer .items .item .thumb .play{
		width: 25%;
		top: 50%;
    	left: 50%;
		min-height: auto;
		transform: translate(-50%,-50%);
	}
	footer .items .item .title{
		white-space: nowrap;
        overflow: hidden;
    	text-overflow: ellipsis;
		color: lightgrey;
	}
	footer .items .item .title a{
		color: white;
	}
	footer .items .item .edit{
    	text-align: right;
		display: none;
	}
	footer .items .item .edit a{
    	float: right;
	}
	footer .items .item .edit img{
		width: 30px;
	}
	footer .items .item .edit img:hover{
		cursor: pointer;
		opacity: .7;
	}
	footer .items .item:hover .edit{
    	display: block;
		grid-template-columns: auto auto;
	}
	footer .pagination{
		text-align: center;
		margin-top: 20px;
	}
	footer .flash{
        text-align: center;
        color: white;
        padding: 5px;
		margin-top: 10px;
    }

    @media only screen and (max-width: 600px){
        footer .items{
            grid-template-columns: 100%;
        }
        footer .items .item .edit img{
		    width: 35px;
	    }
    }
</style>