<template >
    <div class="field has-addons">

      <div class="control">
        <button type="button" class="button" :class="{ 'is-info': is_hashed }" @click="toggle_hash()">
          <fa-icon icon="hashtag"/>
        </button>
      </div>

      <p class="control is-expanded">
        <input class="input" type="text" v-model="base_alias" @input="$emit('search', $event.target.value)" name="from" placeholder="Alias base" />
      </p>

      <p class="control">
        <a class="button has-background-white-ter" @click="change_hash()">
          {{ is_hashed ? '-' + hash : '' }}{{ isMobile ? '' : '@' + host }}
        </a>
      </p>

      <div class="control">
        <button
          @click="submit_alias()"
          class="button"
          :class="{ 'is-loading': aliasLoading }"
        >
          <fa-icon icon="plus"/>
        </button>
      </div>

    </div>
</template>

<script>
export default {
  props: {
    appKey: { type: String, required: true },
    appSecret: { type: String, required: true },
    consumerKey: { type: String, required: true },
    destination: { type: String, required: true },
    aliasLoading: Boolean,
  },
  inject: [
    'ovh',
  ],
  data() {
    return {
      is_hashed: true,
      base_alias: '',
      hash: this.random_hash(),
    }
  },
  computed: {
    host() {
      return this.destination.split('@')[1];
    },
    isMobile() {
      return !(this.$grid.desktop || this.$grid.widescreen || this.$grid.fullhd);
    }
  },
  methods: {
    toggle_hash() {
      this.is_hashed = !this.is_hashed;
    },
    change_hash() {
      this.hash = this.random_hash();
    },
    random_hash() {
      let length           = 7;
      let result           = '';
      let characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    },
    submit_alias() {
      //.value because it's an injected object
      this.ovh.requestPromised('POST', '/email/domain/sinux.sh/redirection', {
        from: this.base_alias + (this.is_hashed ? '-' + this.hash : '') + '@' + this.host,
        to: this.destination,
        localCopy: false,
      })
        .then(rep => {
          this.$emit('add-alias', rep);
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
}
</script>

<style scoped>

div.box {
  height: 100%;
  border-radius: 1em;
}

div.field p, div.field input {
  font-family: monospace;
}

</style>
