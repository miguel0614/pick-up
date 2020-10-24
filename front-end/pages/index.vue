<template>
  <v-container>
    <v-card min-height="5em" elevation="2" outlined class="mx-auto">
      <v-form>
        <v-list-item dense>
          <v-list-item-content>
            <div class="overline mb-3">
              New Meetup
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item one-line>
          <v-list-item-content>
            <v-text-field
              v-model="new_meet_user"
              :rules="[
                (v) => (v == !!v && v.length > 0) || 'User Name is Required',
              ]"
              label="User Name"
              required
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item one-line>
          <v-list-item-content>
            <v-btn outlined>Create!</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-form>
    </v-card>

    <br />

    <v-card min-height="20em" elevation="2" outlined tile>
      <v-card-title>Pending Meetups</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      new_meet_user: "",
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.customlistitem {
  padding: 0;
}
</style>
