<template>
    <tr>
      <td>
        <h4 class="title is-5 has-text-dark" @click="show_to = !show_to"> {{ from_name() }}<span class="has-text-grey">@{{ from_domain() }}</span></h4>
        <h6 v-if="show_to" class="subtitle is-6 has-text-grey"> {{ to }}</h6>
      </td>
      <!-- <td>
        <fa-icon icon="clipboard" @click="copy()"></fa-icon>
      </td> -->
      <td>
        <fa-icon icon="trash" @click='remove_alias()'></fa-icon>
      </td>
    </tr>
</template>

<script>
export default {
  props: {
    from: String,
    to: String,
    id: String,
  },
  inject: [
    'ovh',
  ],
  data() {
    return {
      show_to: false,
    }
  },
  methods: {
    from_name() {
      return this.from.split('@')[0];
    },
    from_domain() {
      return this.from.split('@')[1];
    },
    remove_alias() {
      this.ovh.requestPromised('DELETE', '/email/domain/sinux.sh/redirection/' + this.id)
        .then(rep => {
          console.log(rep);
          this.$emit('deleted', this.id);
        })
        .catch(err => console.log(err));
    },
  }
}
</script>

<style scoped>

div.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card {
  border-radius: 1em;
}

.fbutton {
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
}

td > svg {
  cursor: pointer;
}

h4 {
  display: inline-block;
  cursor: pointer;
}

</style>
