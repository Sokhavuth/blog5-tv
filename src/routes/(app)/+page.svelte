<script>
    import Layout from "$lib/components/Layout.svelte"
    import CategoryPanel from '$lib/components/CategoryPanel.svelte'
    import Latest from '$lib/components/Latest.svelte'
    let { data } = $props()
</script>

<Layout {data}>
<section class="Index region">
    <CategoryPanel {data} />
    <Latest {data} />
</section>
</Layout>