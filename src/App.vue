<template>
  <HeroContainer>
    <div class="columns is-centered is-multiline">
      <div class="column is-2">
        <input v-model.lazy="appKey" class="input is-rounded" type="text" placeholder="API key">
      </div>
      <div class="column is-2">
        <input v-model.lazy="appSecret" class="input is-rounded" type="text" placeholder="API secret">
      </div>
      <div class="column is-2">
        <input v-model.lazy="consumerKey" class="input is-rounded" type="text" placeholder="Consumer key">
      </div>
      <div class="column is-2">
        <input v-model.lazy="destination" class="input is-rounded" type="text" placeholder="Destination email">
      </div>
    </div>

    <AliasManager
      v-if='appKey && appSecret && consumerKey && destination'
      :app-key="appKey"
      :app-secret="appSecret"
      :consumer-key="consumerKey"
      :destination="destination" />

  </HeroContainer>
</template>

<script>
import HeroContainer from '@/components/HeroContainer.vue';
import AliasManager from '@/components/AliasManager.vue';

export default {
  components: {
    HeroContainer,
    AliasManager,
  },
  data() {
    return {
      appKey: "",
      appSecret: "",
      consumerKey: "",
      destination: "",
    }
  },
  watch: {
    appKey(newAppKey) { localStorage.appKey = newAppKey },
    appSecret(newAppSecret) { localStorage.appSecret = newAppSecret },
    consumerKey(newConsumerKey) { localStorage.consumerKey = newConsumerKey },
    destination(newDestination) { localStorage.destination = newDestination },
  },
  mounted() {
    if (localStorage.appKey) { this.appKey = localStorage.appKey }
    if (localStorage.appSecret) { this.appSecret = localStorage.appSecret }
    if (localStorage.consumerKey) { this.consumerKey = localStorage.consumerKey }
    if (localStorage.destination) { this.destination = localStorage.destination}
  },
};
</script>
