<template>
    <div class="container">
      <div class="columns is-centered">

        <div class="column is-5">
          <h3 class="title is-3">
            Aliux
            <span class="has-text-weight-light is-size-4">{{ emails.length }}</span>
            &nbsp;<fa-icon id="reload" icon="sync-alt" size="xs" @click="emails=[]; update_aliases(emails);"></fa-icon>
          </h3>
          <div class="box">
            <AliasControl
              :app-key="appKey"
              :app-secret="appSecret"
              :consumer-key="consumerKey"
              :destination="destination"
              :alias-loading="aliasLoading"
              @add-alias="addAlias"
            />

            <table class="table is-striped is-hoverable is-fullwidth">
              <tbody>
                <AliasCard
                  v-for='alias in sortedAlias'
                  :key='alias.id'
                  :id='alias.id'
                  :from='alias.from'
                  :to='alias.to'
                  @deleted="removeAlias"
                  />
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import AliasCard from '@/components/AliasCard.vue';
import AliasControl from '@/components/AliasControl.vue';

import { reactive } from 'vue';

export default {
  name: 'AliasManager',

  components: {
    AliasCard,
    AliasControl,
  },

  props: {
    appKey: String,
    appSecret: String,
    consumerKey: String,
    destination: String,
  },

  data() {
    return {
      emails: [],
      aliasLoading: true,
      ovh: require('ovh')({
        endpoint: 'ovh-eu',
        appKey: this.appKey,
        appSecret: this.appSecret,
        consumerKey: this.consumerKey,
        debug: false,
      }),
    }
  },

  mounted() {
    this.update_aliases(this.emails);
  },

  computed: {
    sortedAlias() {
      function compare(a, b) {
        if (a.from < b.from) {
          return -1;
        }
        if (a.from > b.from) {
          return 1;
        }
        return 0;
      }
      return [...this.emails].sort(compare);
    },
  },
  methods: {
    update_aliases(emails) {
      this.aliasLoading = true;

      this.ovh.requestPromised('GET', '/email/domain/sinux.sh/redirection')
        .then( ids => {

          let index = 0;
          ids.forEach( id => {
            this.ovh.requestPromised('GET', '/email/domain/sinux.sh/redirection/' + id)
              .then( alias => {
                index++;

                if(!this.aliasExist(alias.id)) {
                  emails.push(alias);
                }

                if(index === ids.length) {
                  this.aliasLoading = false; // We loaded everything
                }
              })
              .catch( err => {console.error("Error with alias number " + id + "\n" + err);})
          });

        })
        .catch( err => {
          console.log(err);
          this.aliasLoading = false;
        });
    },

    addAlias(event) {
      if (event.type === 'alias' && event.action === 'add') {
        this.update_aliases(this.emails);
      }
      console.log(event);
    },

    aliasExist(id) {
      return this.emails.some((alias) => alias.id === id);
    },

    removeAlias(id) {
      let index = this.emails.map(alias => alias.id).indexOf(id);
      if (index > -1) {
        this.emails.splice(index, 1);
      }
    },
  },
  provide() {
    return {
      ovh: reactive(this.ovh),
    }
  },
  watch: {
    // to update this.ovh
    appKey(newAppKey) { this.ovh.appKey = newAppKey; },
    appSecret(newAppSecret) { this.ovh.appSecret = newAppSecret },
    consumerKey(newConsumerKey) { this.ovh.consumerKey = newConsumerKey },
  },
}
</script>

<style scoped>
input.input {
  max-width: 20%;
  margin-right: 10px;
}
#reload {
  cursor: pointer;
}
</style>
