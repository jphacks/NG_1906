<template>
  <v-dialog v-model="dialog" persistent max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn class="fixed_btn" v-on="on">
        新規作成
      </v-btn>
    </template>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          部屋の種類
        </v-stepper-step>

        <v-divider />

        <v-stepper-step :complete="e1 > 2" step="2">
          部屋の名前
        </v-stepper-step>

        <v-divider />

        <v-stepper-step step="3">
          決定
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col v-for="room in room_category" :key="room.name" :col="12/room_category.length">
              <v-card
                class="mx-auto"
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
          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>

          <v-btn text @click="dialog=false">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
          />

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
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
            @click="e1 = 1"
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
      e1: 0,
      dialog: false,
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
  }
}
</script>
