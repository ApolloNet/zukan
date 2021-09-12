<template>
  <form>
    <div class="flex">
      <label for="typeFilter" class="mr-2">Type</label>
      <select id="typeFilter" v-model="typeFilter" @change="updateFilter($event)">
        <option value="">-- all --</option>
        <option v-for="pokemonType in pokemonTypes" :key="pokemonType" :value="pokemonType">
          {{ pokemonType }}
        </option>
      </select>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'FilterForm',
  computed: {
    ...mapState(['pokemonTypes', 'typeFilter'])
  },
  methods: {
    ...mapActions(['updateTypeFilter']),
    updateFilter(event: Event) {
      const value = (event.target as HTMLSelectElement).value
      this.updateTypeFilter(value)
    }
  }
})
</script>
