<template>
  <v-container>
        <v-snackbar color="#009B3C" v-model="showBar" :top="true">
      "Arrived!"
      <v-btn text dark @click="showBar = false">Close</v-btn>
    </v-snackbar>
    <v-card min-height="5em" elevation="2" outlined class="mx-auto">
      <v-form @submit="submit($event)">
        <v-list-item dense>
          <v-list-item-content>
            <div class="overline mb-3">New Meetup</div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item one-line>
          <v-list-item-content>
            <v-text-field
            ref='username'
              v-model="buyer"
              :rules="[(v) => !!v || 'Not a valid username']"
              label="User Name"
              required
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item one-line>
          <v-list-item-content>
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  :disabled="!is_registered_user"
                  v-bind="attrs"
                  v-on="on"
                  color='primary'
                  >Create!</v-btn
                >
              </template>
              <v-card>
                <v-list-item dense>
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="9" class="overline mb-3"
                        >Create New Meetup With:
                      </v-col>
                      <v-col>
                        <v-avatar color="primary" size="36">
                          {{ name_icon }}
                        </v-avatar></v-col
                      ></v-row
                    >
                    <p class="overline mb-3">
                      {{ names[buyer] }}
                    </p>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                      v-model="new_meetup_information.price"
                      type="number"
                      :rules="[
                        (v) => !!v || 'Not a valid price',
                        (v) =>
                          (v > 0 && v < 999999) ||
                          'Price must be between $0 and $999999',
                      ]"
                      label="Price"
                      placeholder="$"
                      required
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-menu
                      v-model="fromDateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          ref="date"
                          :rules="[(v) => !!v || 'The date is required']"
                          required="true"
                          label="Date"
                          readonly
                          placeholder="Meetup Date"
                          :value="fromDateDisp"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="en-in"
                        v-model="new_meetup_information.date"
                        no-title
                        @input="fromDateMenu = false"
                        :min="todaysDate"
                      ></v-date-picker>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>
                  <v-list-item>
                  <v-list-item-content>
<v-row dense>

              <v-col>
                <v-select
                  ref="hour"
                  :rules="[v => !!v || 'Hour is required']"
                  label="Hour"
                  :items="['01', '02', '03', '04', '05', '06', '07', '08', '09','10','11','12']"
                  v-model="hour"
                  required="true"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  ref="minute"
                  :rules="[v => !!v || 'Minute is required']"
                  label="Minute"
                  :items="['00', '15', '30', '45']"
                  v-model="minute"
                  required="true"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  ref="ampm"
                  :rules="[v => !!v || 'AM/PM is required']"
                  label="AM/PM"
                  :items="['AM', 'PM']"
                  v-model="ampm"
                  required="true"
                ></v-select>
              </v-col>
            </v-row>
                  </v-list-item-content>
                  </v-list-item>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog = false">Cancel</v-btn>
                  <v-btn text :disabled="new_meetup_information.price == '' || new_meetup_information.date == '' || ampm == '' || minute == '' || hour == ''" @click="pick_location">Pick Location</v-btn>
                </v-card-actions>
                
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog2" persistent>
              <v-card>
                <v-list-item>
                <v-list-item-content>
                    <div class="overline mb-3"
                        >Pick Meetup Spot
                     </div>
                  </v-list-item-content>
                </v-list-item>
                                <v-list-item>
                  <v-list-item-content>
                    <v-row>
                      <v-col cols = '8'>
                    <v-text-field
                    ref='search_location'
                      v-model="search_location"
                      :rules="[
                        (v) => !!v || 'Not a valid Location']"
                      label="Location"
                      placeholder="Enter Address"
                      required
                    ></v-text-field>
                    </v-col>
                    <v-col cols='4'>
                      <v-btn @click='autolocate()' :disabled='search_location && search_location.length == 0'>Search!
                      </v-btn>
                    </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>

                                  <v-list-item-content>
                        <v-select
                        v-if='location_options.length != 0'
          :items="location_options"
          label="Matching Locations"
          v-model='new_meetup_information.location'
          solo
        ></v-select>
                          </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog2 = false">Cancel</v-btn>
                  <v-btn
                    text
                    @click="send_meetup"
                    :disabled="new_meetup_information.location == ''"
                    >Done</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-content>
        </v-list-item>
      </v-form>
    </v-card>

    <br />

    <v-card min-height="20em" elevation="2" outlined tile>
              <v-list-item dense>
          <v-list-item-content>
            <div class="overline mb-3">Meetups</div>
          </v-list-item-content>
        </v-list-item>
        <v-container v-if='showMeetings'>
        <v-card  class="scroll" raised>
            <div style="display: flex;" :style="{fontWeight:'bold'}"> Meetup with {{new_meetup_information.buyer}}
            </div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Price:</v-list-item-title>
        <v-list-item-subtitle>${{new_meetup_information.price}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Time:</v-list-item-title>
        <v-list-item-subtitle>{{new_meetup_information.time}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Location:</v-list-item-title>
        <v-list-item-subtitle>{{new_meetup_information.location}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-btn block :disabled='disableMeet' @click='meet' color='primary'>Meetup!</v-btn>
      </v-list-item-content>
    </v-list-item>
        </v-card>
        </v-container>
    </v-card>
    <br />
    <v-card v-if='disableMeet' elevation="2" outlined tile>
                    <v-list-item dense>
          <v-list-item-content>
            <div class="overline mb-3">Meetup Details:</div>
          </v-list-item-content>
        </v-list-item>
        <v-card  raised>
<v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Distance:</v-list-item-title>
        <v-list-item-subtitle>{{distance}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        <v-list-item two-line>
      <v-list-item-content>
        <v-row>
          <v-col>
            <v-btn color='red' block :disabled='!showMeetup&& !close'>Emergency</v-btn>
          </v-col>
          <v-col>
            <v-btn color='green' block :disabled='!showMeetup && !close'>Completed</v-btn>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
        </v-card>

    </v-card>
  </v-container>
</template>

<script>
import Radar from "radar-sdk-js";

import GET_USERNAMES from "../services/get_usernames.service";
import GET_NAMES from "../services/get_names.service";
import POST_NEW_MEETING from "../services/post_new_meeting.service"

Radar.initialize("prj_test_pk_fb42d9965e5d72e299adfe6e5b2d040b03f43b6c");

export default {
  mounted() {
    this.get_usernames();
    this.get_names();
    const app = this;
    Radar.getLocation(function (err, result) {
      if (!err) {
        app.location.latitude = result.location.latitude;
        app.location.longitude = result.location.longitude;
        // do something with result.location, result.events, result.user
      }
    });
  },
  data() {
    return {
      showBar: false,
      close: false,
      distance: '',
      showMeetup: true,
      showMeetings:false,
      disableMeet: false,
      buyer: "",
      ampm: "",
      minute: "",
      hour: "",
      location_options: [],
      coordinates: [],
      search_location: "",
      location: { latitude: 0, longitude: 0 },
      user_data: { username: "" },
      valid_users: [],
      names: {},
      dialog: false,
      dialog2: false,
      new_meetup_information: {
        location: "",
        latitude: 0,
        longitude: 0,
        time: "",
        date: "",
        buyer: "",
        seller: "CtrlAltDefeat",
        price: "",
      },
      fromDateMenu: false,
    };
  },
  methods: {
    meet(){
      const app = this
      this.disableMeet = true
      Radar.getDistance({
  origin: {
    latitude: app.location.latitude,
    longitude: app.location.longitude
  },
  destination: {
    latitude: app.new_meetup_information.latitude,
    longitude: app.new_meetup_information.longitude
  },
  modes: [
    'foot',
    'car'
  ],
  units: 'imperial'
}, function(err, result) {
  if (!err) {
    console.log(result)
    app.distance = result.routes.geodesic.distance.text
    setTimeout(()=>{
      app.distance = ".01 miles"
      app.close = true
      app.showBar = true
      
    },10000)
    // do something with result.routes
  }
});
    },
    autolocate() {
      const app = this;
      Radar.autocomplete(
        {
          query: app.search_location,
          near: {
            latitude: app.location.latitude,
            longitude: app.location.longitude,
          },
          limit: 5,
        },
        function (err, result) {
          if (!err) {
            const addresses = result.addresses;
            app.location_options = []
            app.coordinates = []
            for (let address of addresses) {
              const formattedAddress = address.formattedAddress;
              let obj = {};
              obj[formattedAddress] = {
                latitude: address.latitude,
                longitude: address.longitude,
              };
              app.location_options.push(formattedAddress);
              app.coordinates.push(obj);
            }
            console.log(result);
          }
        }
      );
      this.$refs.search_location.reset()
      },
    pick_location() {
      this.dialog = false;
      this.dialog2 = true;
    },
    get_usernames() {
      const app = this;
      GET_USERNAMES((usernames) => {
        app.valid_users = usernames;
      });
    },
    get_names() {
      const app = this;
      GET_NAMES((names) => {
        app.names = names;
      });
    },
    submit(event) {
      event.preventDefault();
      if (this.is_registered_user) {
        this.dialog = true;
      }
    },
    send_meetup(){
      this.dialog2 = false
      const app = this
       const index = this.location_options.indexOf(this.new_meetup_information.location)
       this.new_meetup_information.latitude = this.coordinates[index][this.new_meetup_information.location].latitude
       this.new_meetup_information.longitude = this.coordinates[index][this.new_meetup_information.location].longitude
       this.new_meetup_information.time = this.hour + ":" + this.minute + " " + this.ampm
       this.new_meetup_information.buyer = this.buyer
       POST_NEW_MEETING(this.new_meetup_information)
       this.$refs.username.reset()
       setTimeout(()=>app.showMeetings = true, 7000)
    }
  },
  computed: {
    is_registered_user() {
      return this.valid_users.includes(this.buyer);
    },
    name_icon() {
      if (
        this.names[this.buyer] &&
        this.names[this.buyer][0] &&
        this.names[this.buyer].split(" ")[1][0]
      )
        return (
          this.names[this.buyer][0] +
          this.names[this.buyer].split(" ")[1][0]
        );
      else return "";
    },
    todaysDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    },
    fromDateDisp() {
      return this.new_meetup_information.date;
      // format/do something with date
    },
  },
};
</script>
