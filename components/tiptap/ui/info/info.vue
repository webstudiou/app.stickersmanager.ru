<script setup lang="ts">
withDefaults(defineProps<EditorInfoProps>(), {
  characters: 0,
  words: 0,
})
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center justify-end grow text-right gap-1.5 mt-1.5 text-xs text-muted">
      <div>
        {{ words }} {{ words === 1 ? 'word' : 'words' }}
      </div>
      <div>
        {{ characters }} {{ characters === 1 ? 'character' : 'characters' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type EditorInfoProps = {
  characters?: number
  words?: number
}
</script>
