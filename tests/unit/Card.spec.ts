
import { shallowMount } from '@vue/test-utils'
import Card from '../../components/Card.vue'
import articuno from '../__mocks__/articuno.json'

describe('Card.vue', () => {
  test('renders pokemon name', () => {
    const wrapper = shallowMount(Card, {
      propsData: { pokemon: articuno }
    })
    expect(wrapper.findAll('[data-test="pokemon-name"]').at(0).text()).toBe(articuno.p.name)
  })
})