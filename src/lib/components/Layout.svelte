<script>
    import Header from '$lib/components/Header.svelte'
    import Menu from "$lib/components/Menu.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import Ad from "$lib/components/Ad.svelte"
    const {data, children} = $props()
</script>

<Header {data} />
<Menu {data} />
<Ad />
<img style='display:none;' src={data.thumb} alt='' />
{@render children(data)}
<Footer />
