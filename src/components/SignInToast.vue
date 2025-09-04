<template>
  <Transition name="slide-fade">
    <div
      v-if="show"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 
             p-4 bg-gray-800 border border-gray-600 rounded-lg 
             flex flex-col sm:flex-row sm:items-center gap-3 
             z-[9999] w-[90%] max-w-sm sm:max-w-md md:max-w-lg"
    >
      <p class="text-white text-sm sm:text-base flex-1 break-words">
        {{ message }}
      </p>
      <div class="flex gap-2 justify-end sm:justify-start flex-wrap">
        <v-btn
          size="small"
          variant="elevated"
          color="primary"
          @click="goToSignIn"
          class="!bg-blue-600 !text-white"
        >
          Sign In
        </v-btn>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          color="white"
          @click="$emit('close')"
        ></v-btn>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Transition } from 'vue';

// @ts-ignore
const signInUrl = import.meta.env.VITE_SIGN_IN_URL || 'https://example.com/signin';

interface Props {
  show: boolean;
  message?: string;
}

interface Emits {
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Please sign in to access this feature',
});

const emit = defineEmits<Emits>();

const goToSignIn = () => {
  window.open(signInUrl, '_blank');
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;
}
</style>
