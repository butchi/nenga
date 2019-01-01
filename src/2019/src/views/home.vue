<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center)
    v-flex(text-xs-center)
      i-oshishi-slot(ref="slot")

      v-dialog(v-model="messageDialog", max-width="400")
        message-card(:isDialog="true", @start="closeMessage")
</template>

<script>
import iOshishiSlot from "../components/i-oshishi-slot.vue";
import messageCard from "../components/message-card.vue";

export default {
  components: {
    "i-oshishi-slot": iOshishiSlot,
    "message-card": messageCard
  },
  data() {
    return {
      messageDialog: true
    };
  },
  methods: {
    closeMessage() {
      this.messageDialog = false;
    }
  }
};
</script>
