<script lang="ts">
  export let itemsCount = 35
  export let frameWidth = 200
  export let gap = 10
  export let containerWidth = 100
</script>

<div class="controls">
  <div class="control-group">
    <label for="itemsCount">Items Count: {itemsCount}</label>
    <input
      id="itemsCount"
      type="range"
      min="3"
      max="100"
      bind:value={itemsCount}
    />
  </div>

  <div class="control-group">
    <label for="frameWidth">Frame Width: {frameWidth}px</label>
    <input
      id="frameWidth"
      type="range"
      min="50"
      max="300"
      bind:value={frameWidth}
    />
  </div>

  <div class="control-group">
    <label for="gap">Gap: {gap}px</label>
    <input
      id="gap"
      type="range"
      min="0"
      max="40"
      bind:value={gap}
    />
  </div>

  <div class="control-group">
    <label for="containerWidth">Container Width: {containerWidth}%</label>
    <input
      id="containerWidth"
      type="range"
      min="0"
      max="100"
      bind:value={containerWidth}
    />
  </div>
</div>
