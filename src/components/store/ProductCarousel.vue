<template>
  <v-sheet class="mx-auto" max-width="auto">
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-group-item v-for="n in 15" :key="n">
        <v-card :class="['ma-5']" width="260">
          <div class="container pr-0 pl-0">
            <v-col cols="100%" md="20">
              <v-card class="mx-auto" max-width="260">
                <img
                  class="align-end text-white"
                  height="346"
                  src="../../assets/cL1Pr6BcPN1gtXLBeVMdGv8U.jpg"
                  cover
                />
                <v-card-title class="pb-0">Product name</v-card-title>
                <v-card-subtitle class="py-2">Brand name</v-card-subtitle>
                <v-card-text class="pt-0">
                  <div>
                    <span>$50</span>
                    <span class="mx-8">$40</span>
                    <span class="mx-1">20% off</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({}),
};
</script>
