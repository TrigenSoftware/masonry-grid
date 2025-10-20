<script lang="ts">
  import Frame from '../src/Frame.svelte'

  let {
    width = 1,
    height = 1
  } = $props()
</script>

<Frame {width} {height}>
  <b>Hello Frame</b>
</Frame>
