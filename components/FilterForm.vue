<template>
  <form>
    <div class="formfield">
      <label for="nameFilter">Name</label>
      <input v-model="nameFilter" type="text" @keyup="changeNameFilter" />
    </div>
    <div class="formfield">
      <label for="typeFilter">Type</label>
      <select id="typeFilter" v-model="typeFilter" @change="changeTypeFilter($event)">
        <option value="">-- all --</option>
        <option v-for="pokemonType in pokemonTypes" :key="pokemonType" :value="pokemonType">
          {{ pokemonType }}
        </option>
      </select>
    </div>
    <div class="formfield">
      <label for="habitatFilter">Habitat</label>
      <select id="habitatFilter" v-model="habitatFilter" @change="changeHabitatFilter($event)">
        <option value="">-- all --</option>
        <option v-for="habitat in habitats" :key="habitat" :value="habitat">
          {{ habitat }}
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
    ...mapState(['pokemonTypes', 'habitats', 'habitatFilter', 'nameFilter', 'typeFilter'])
  },
  methods: {
    ...mapActions(['updateNameFilter', 'updateTypeFilter', 'updateHabitatFilter']),
    changeNameFilter(event: Event) {
      const value = (event.target as HTMLInputElement).value
      this.updateNameFilter(value)
    },
    changeTypeFilter(event: Event) {
      const value = (event.target as HTMLSelectElement).value
      this.updateTypeFilter(value)
    },
    changeHabitatFilter(event: Event) {
      const value = (event.target as HTMLSelectElement).value
      this.updateHabitatFilter(value)
    }
  }
})
</script>

<style>
  form {
    @apply flex items-center;
  }

  .formfield {
    @apply mr-4;
  }

  label {
    @apply mr-1;
  }

  input,
  select {
    @apply py-1 px-2 leading-none bg-purple-800 rounded text-base text-yellow-100;
  }
</style>