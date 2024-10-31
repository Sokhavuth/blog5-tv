<script>
    import Menu from "./Menu.svelte"
    import Footer from "./Footer.svelte"
    const {data, children} = $props()
</script>

<link href="/styles/base-frontend.css" rel="stylesheet" />
<Menu {data} />
<img style='display:none;' src={data.thumb} alt='' />
{@render children(data)}
<Footer />
