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
    "message-card": messageCard,
  },
  mounted() {
    if (localStorage.isVirgin !== "false") {
      this.messageDialog = true;
    }
  },
  data() {
    return {
      messageDialog: false,
    };
  },
  methods: {
    closeMessage() {
      this.messageDialog = false;

      localStorage.isVirgin = false;
    },
  },
};
</script>
