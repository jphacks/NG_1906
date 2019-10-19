<template>
  <v-dialog v-model="dialog" persistent max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn class="fixed_btn" v-on="on">
        新規作成
      </v-btn>
    </template>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          部屋の種類
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="step > 2" step="2">
          部屋の名前
        </v-stepper-step>

        <v-divider />
      <!--
        <v-stepper-step step="3">
          決定
        </v-stepper-step>
        -->
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container class="stepper-content">
            <v-row>
              <v-col v-for="room in room_category" :key="room.name" :col="12/room_category.length">
                <v-card
                  class="mx-auto"
                  @click="stepOne(room)"
                >
                  <v-card-title>
                    <v-row justify="center">
                      <v-icon size="80px">
                        {{ room.icon }}
                      </v-icon>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row justify="center">
                      <h2>{{ room.name }}</h2>
                    </v-row>
                    <br>
                  </v-card-text>
                <!-- <v-card-actions /> -->
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!--
          <v-btn
            color="primary"
            @click="el = 2"
          >
            Continue
          </v-btn>
          -->
          <v-btn text @click="dialog=false">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container class="stepper-content">
            <v-row justify="space-around" align="center">
              <v-col>
                <v-icon size="150px">
                  {{ selectRoom.icon }}
                </v-icon>
              </v-col>
              <v-col>
                <v-form>
                  <v-text-field
                    v-model="roomName"
                    outlined
                    label="ROOM NAME"
                  />
                </v-form>
              </v-col>
            </v-row>
          </v-container>
          <v-btn
            color="primary"
            @click="createRoom()"
          >
            ルーム作成
          </v-btn>

          <v-btn text @click="dialog=false">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          />

          <v-btn
            color="primary"
            @click="step = 1"
          >
            Continue
          </v-btn>

          <v-btn text @click="dialog=false">
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      roomName: '',
      step: 0,
      dialog: false,
      selectRoom: {
        name: '',
        icon: ''
      },
      room_category: [
        {
          name: 'チャット',
          icon: 'mdi-wechat'
        },
        {
          name: 'ファイル共有',
          icon: 'mdi-folder-multiple'
        },
        {
          name: '配信',
          icon: 'mdi-cast'
        }
      ]
    }
  },
  methods: {
    stepOne (room) {
      this.step = 2
      this.selectRoom = room
    }
  }
}
</script>

<style>
.stepper-content{
  height: 200px;
}
</style>
